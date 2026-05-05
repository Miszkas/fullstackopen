import { useState, useEffect } from "react";
import "./index.css";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import service from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showNotification, setShowNotification] = useState({
    message: null,
    type: null,
  });

  const notify = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification({ message: null, type: null }), 3000);
  };

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
            notify("Number updated successfully!", "success");
          }
        })
        .catch(() => {
          notify(
            `Failed to update number for ${newName}. It may have been removed from the server.`,
            "error",
          );
          setPersons(persons.filter((p) => p.name !== newName));
        });
      return;
    }

    service
      .addNewPerson({ name: newName, number: newNumber })
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        notify(`Added ${returnedPerson.name}`, "success");
      })
      .catch(() => {
        notify(`Failed to add ${newName}. Please try again.`, "error");
      });
  };

  const handlePersonDelete = (person) => {
    service
      .deletePerson(person)
      .then((id) => {
        if (id) {
          setPersons(persons.filter((p) => p.id !== id));
          notify(`Deleted ${person.name}`, "success");
        }
      })
      .catch(() => {
        notify(
          `Failed to delete ${person.name}. It may have already been removed from the server.`,
          "error",
        );
        setPersons(persons.filter((p) => p.id !== person.id));
      });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={showNotification.message}
        type={showNotification.type}
      />
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
