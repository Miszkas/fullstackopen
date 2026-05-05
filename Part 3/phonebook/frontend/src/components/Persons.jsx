const Persons = ({ persons, filter, deletePerson }) => {
  const filtered = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });
  return (
    <>
      {filtered.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
          {"  "}
          <button onClick={() => deletePerson(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
