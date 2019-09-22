const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const apiPath = "/api/persons";

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/info', (req, res) =>
  res.send(
    `<div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date().toString()}</div>`
  ))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get(apiPath, (req, res) => {
  res.json(persons)
})

app.get(apiPath + '/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  return person ? response.json(person) :
    response.status(404).end();
})

app.delete(apiPath + '/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
  // const maxId = persons.length > 0
  //   ? Math.max(...persons.map(n => n.id))
  //   : 0
  // return maxId + 1
}

app.post(apiPath, (request, response) => {
  const body = request.body

  if (!body.name || body.number === undefined)
    return response
      .status(400)
      .json({ error: 'content missing' })
  if (persons.find(person => person.name === body.name))
    return response
      .status(400)
      .json({ error: 'name must be unique' })

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})



const PORT = 9877
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})