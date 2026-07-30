import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("calls createBlog with correct details when form is submitted", async () => {
  const user = userEvent.setup();
  const newBlog = vi.fn();

  render(<BlogForm createBlog={newBlog} />);

  const titleInput = screen.getByLabelText(/title:/i);
  const authorInput = screen.getByLabelText(/author:/i);
  const urlInput = screen.getByLabelText(/url:/i);
  const createButton = screen.getByText("create");

  await user.type(titleInput, "Test Blog Title");
  await user.type(authorInput, "Test Author");
  await user.type(urlInput, "http://testblog.com");
  await user.click(createButton);

  expect(newBlog).toHaveBeenCalledTimes(1);
  expect(newBlog).toHaveBeenCalledWith({
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://testblog.com",
  });
});
