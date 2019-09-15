import React, { useState, useEffect } from "react";
import personsService from './services/persons'

const Filter = ({ setFilterString }) => {
  return (
    <div>
      filter shown with
      <input onChange={event => setFilterString(event.target.value)} />
    </div>
  );
};

const SinglePerson = ({ person, handleDelete }) =>
  < div > {person.name + " - " + person.number}
    <button onClick={() => handleDelete(person.id)}> delete</button>
  </div >



const Persons = ({ persons, filterString, setPersons }) => {
  const handleDelete = id =>
    personsService
      .deletePerson(id)
      .then(
        personsService
          .getAll()
          .then(setPersons))
  return (
    <div>
      {persons
        .filter(
          person =>
            !filterString.length ||
            person.name.toLowerCase().includes(filterString.toLowerCase())
        )
        .map(person =>
          <SinglePerson key={person.id} person={person} handleDelete={handleDelete} />)
      }
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
    personsService.getAll()
      .then(setPersons)

  },
    []);


  const submitName = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else if (newName.length && newNumber.length) {
      personsService
        .submitPerson({ name: newName, number: newNumber })
        .then(person => setPersons(persons.concat(person)))

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
      <Persons persons={persons} filterString={filterString} setPersons={setPersons} />
    </div>
  );
};

export default App;
