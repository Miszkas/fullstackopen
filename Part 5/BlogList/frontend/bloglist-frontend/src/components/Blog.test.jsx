import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders title and author, not url or likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testblog.com",
    likes: 5,
    user: { id: "user123" },
  };

  render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      handleDelete={() => {}}
      user={{ id: "user123" }}
    />,
  );

  expect(screen.getByText("Test Blog", { exact: false })).toBeVisible();
  expect(screen.getByText("Test Author", { exact: false })).toBeVisible();
  expect(
    screen.queryByText("http://testblog.com", { exact: false }),
  ).toBeNull();
  expect(screen.queryByText("Likes:", { exact: false })).toBeNull();
});

test("url and likes are shown after clicking the view button", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testblog.com",
    likes: 5,
    user: { id: "user123" },
  };

  render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      handleDelete={() => {}}
      user={{ id: "user123" }}
    />,
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  expect(
    screen.getByText("http://testblog.com", { exact: false }),
  ).toBeVisible();
  expect(screen.getByText("Likes: 5", { exact: false })).toBeVisible();
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testblog.com",
    likes: 5,
    user: { id: "user123" },
  };

  const mockHandleLike = vi.fn();

  render(
    <Blog
      blog={blog}
      handleLike={mockHandleLike}
      handleDelete={() => {}}
      user={{ id: "user123" }}
    />,
  );

  const user = userEvent.setup();
  const viewBtn = screen.getByText("view");
  await user.click(viewBtn);

  const likeBtn = screen.getByText("like");
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(mockHandleLike).toHaveBeenCalledTimes(2);
});
