import React, { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

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
