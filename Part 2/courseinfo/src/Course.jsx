const Header = ({ courseName }) => <h1>{courseName}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>
        <strong>
          total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
          exercises
        </strong>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
