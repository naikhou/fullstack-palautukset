require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

//morganin määrittely
const morgan = require('morgan')
morgan.token('sisalto', function getData(req) {
    return JSON.stringify(req.body)
})
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :sisalto')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

//middlewareja
app.use(express.static('build'))
//mahdollistaa cross-origin resourse sharingin, piti asentaa eka komennolla 'npm install cors'.
app.use(cors())
app.use(express.json())
app.use(morganLogger)

//HEROKUn kanssa muista: 'heroku git push main' ei välttämättä toimi,
//branchin nimi 'main' voi olla eri, esim. master.

//kuunneltavan portin asettaminen
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log('hello world')

//henkilön lisääminen
app.post('/api/persons', (req, res, next) => {
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
    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch((error) => next(error))
})

//henkilön poistaminen
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

//yksittäisen henkilön hakeminen
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
      if(person){
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//infosivu
app.get('/info', (req, res, next) => {
    const date = Date()
    Person.count({}, (err, count) => {
        if(err){
            next(err)
        }
        const teksti = `Phonebook has ${count} persons<br><br>${date}`
        res.send(teksti)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

//kaikki henkilöt
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

//juuripolun käsittely
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
  })

app.use(errorHandler)


