import React, { useState, useEffect } from "react";
import axios from 'axios';

const Filter = ({ setFilterString }) => {
  return (
    <div>
      filter shown with
      <input onChange={event => setFilterString(event.target.value)} />
    </div>
  );
};

const Persons = ({ persons, filterString }) => {
  return (
    <div>
      {persons
        .filter(
          person =>
            !filterString.length ||
            person.name.toLowerCase().includes(filterString.toLowerCase())
        )
        .map(person => (
          <div key={person.name}>{person.name + " - " + person.number}</div>
        ))}
    </div>
  );
};
const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  setNewName,
  setNewNumber
}) => {
  const handleNameChange = event => setNewName(event.target.value);

  const handleNumberChange = event => setNewNumber(event.target.value);

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [persons, setPersons] = useState([]);
  console.log("persons:", persons)
  useEffect(() => {
    axios
      .get('./backend/persons')
      .then(res => setPersons(res.data))
  },
    []);


  const submitName = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else if (newName.length && newNumber.length) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("") || setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterString={setFilterString} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={submitName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString} />
    </div>
  );
};

export default App;
