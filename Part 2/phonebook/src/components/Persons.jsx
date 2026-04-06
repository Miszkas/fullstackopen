const Persons = ({ persons, filter }) => {
  const filtered = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });
  return (
    <>
      {filtered.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
