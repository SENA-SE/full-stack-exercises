// const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }
// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)
// app.use(requestLogger)

// app.use(morgan('tiny'))

app.use(cors())

morgan.token('post', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));

app.use(express.json())
app.use(express.static('dist'))

let persons = [

    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    // console.log(note)
    // response.json(note)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 10001)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body);
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    // if (persons.some(p => p.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = {
        name: body.name,
        number: body.number || "",
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    const id = Number(request.params.id)
    console.log(body);
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    if (persons.find(p => p.id === id)) {
        const person = {
            name: body.name,
            number: body.number,
            id: id,
        }

        persons = persons.map(p => p.name === person.name ? person : p)
        response.json(person)

    } else {
        return response.status(400).json({
            error: `${body.name} has already been removed from phonebook`
        })
    }

})


const PORT = process.env.PORT || 3001
console.log(process.env.PORT)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})