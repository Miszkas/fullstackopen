import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const addNewPerson = (newObj) => {
  const req = axios.post(baseUrl, newObj);
  return req.then((res) => res.data);
};

const deletePerson = (person) => {
  return window.confirm(`Delete ${person.name}?`)
    ? axios.delete(`${baseUrl}/${person.id}`).then(() => person.id)
    : Promise.resolve();
};

const replaceNumber = (person, newNumber) => {
  return window.confirm(
    `${person.name} is already added to phonebook, replace the old number with a new one?`,
  )
    ? axios
        .put(`${baseUrl}/${person.id}`, { ...person, number: newNumber })
        .then((res) => res.data)
    : Promise.resolve();
};

export default { getAll, addNewPerson, deletePerson, replaceNumber };
