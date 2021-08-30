const express = require('express')
const app = express()

//morganin määrittely
const morgan = require('morgan')
morgan.token('sisalto', function getData(req) {
    return JSON.stringify(req.body)
})
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :sisalto')

//middlewareja
app.use(express.json())
app.use(morganLogger)
app.use(express.static('build'))
//mahdollistaa cross-origin resourse sharingin, piti asentaa eka komennolla 'npm install cors'.
//HEROKUn kanssa muista: 'heroku git push main' ei välttämättä toimi,
//branchin nimi 'main' voi olla eri, esim. master.
const cors = require('cors')

app.use(cors())


//kuunneltavan portin asettaminen
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log('hello world')

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "Testi Testinen",
        number: "000-654321"
    }
]

//henkilön lisääminen
app.post('/api/persons', (req, res) => {
    const rand = Math.floor(Math.random() * 10000)

    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: 'nimi puuttuu'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'numero puuttuu'
        })
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'nimi on jo luettelossa'
        })
    }
    const person =
        {
            id: rand,
            name: body.name,
            number: body.number
        }

    persons = persons.concat(person)

    res.json(person)

})


//henkilön poistaminen
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})


//yksittäisen henkilön hakeminen
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    //truthy/falsy-juttu
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})


//infosivu
app.get('/info', (req, res) => {
    const date = Date()
    const teksti = `Phonebook has ${persons.length} persons<br><br>${date}`
    res.send(teksti)
})


//kaikki henkilöt
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//juuripolun käsittely
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
  })


