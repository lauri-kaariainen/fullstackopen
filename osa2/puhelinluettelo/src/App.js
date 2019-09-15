import React, { useState, useEffect } from "react";
import personsService from './services/persons'

const Notification = ({ message, color }) => {
  if (!message) {
    return null
  }

  return (
    <div className={"notification " + color}>
      {message}
    </div>
  )
}
const ErrorNotification = ({ message }) =>
  <Notification message={message} color={"red"} />

const SuccessNotification = ({ message }) =>
  <Notification message={message} color={"green"} />


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
    <button onClick={() => handleDelete(person)}> delete</button>
  </div >



const Persons = ({ persons, filterString, setPersons, setSuccessMessage }) => {
  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`))
      personsService
        .deletePerson(person.id)
        .then(
          personsService
            .getAll()
            .then(setPersons))
        .then(() => {
          setSuccessMessage(`Deleted ${person.name}`);
          setTimeout(() => setSuccessMessage(""), 5000);
        })
  }
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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    personsService.getAll()
      .then(setPersons)

  },
    []);

  const replaceNumber = (person, newNumber) =>
    personsService
      .changeNumber(person, newNumber)
      .then(res => {
        setSuccessMessage(`Changed ${newName}'s number to ${newNumber}`);
        setTimeout(() => setSuccessMessage(""), 5000);
        return res;
      })



  const submitName = event => {
    event.preventDefault();
    const foundPerson = persons.find(person => person.name === newName);
    if (foundPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        return replaceNumber(foundPerson, newNumber)
          .then(data => setPersons(persons.map(person => person.id === foundPerson.id ? data : person)))
          .catch(error => {
            setErrorMessage(`Information of ${foundPerson.name} has already been removed from server`)
            setTimeout(() => setErrorMessage(""), 5000)
            setPersons(persons.filter(person => person.id !== foundPerson.id))
          })
    }
    else if (newName.length && newNumber.length) {
      personsService
        .submitPerson({ name: newName, number: newNumber })
        .then(person => setPersons(persons.concat(person)));
      setNewName("") || setNewNumber("");
      setSuccessMessage(`Added ${newName}`);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
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
      <Persons
        persons={persons}
        filterString={filterString}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage} />
    </div>
  );
};

export default App;
