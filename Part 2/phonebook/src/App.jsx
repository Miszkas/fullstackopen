import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import service from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    service.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handlePersonAdd = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      service
        .replaceNumber(
          persons.find((person) => person.name === newName),
          newNumber,
        )
        .then((returnedPerson) => {
          if (returnedPerson) {
            setPersons(
              persons.map((person) =>
                person.name === newName ? returnedPerson : person,
              ),
            );
            setNewName("");
            setNewNumber("");
          }
        });
      return;
    }

    service
      .addNewPerson({ name: newName, number: newNumber })
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
  };

  const handlePersonDelete = (person) => {
    service.deletePerson(person).then((id) => {
      if (id) {
        setPersons(persons.filter((p) => p.id !== id));
      }
    });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilter} />
      <h2>Add a new person</h2>
      <PersonsForm
        handlePersonAdd={handlePersonAdd}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={handlePersonDelete}
      />
    </div>
  );
};

export default App;
