const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({ path: './config/.env' })

const connectDB = require('./config/db')

connectDB()

const newUser = require('./routes/newUser')
const users = require('./routes/users')
const addExercise = require('./routes/addExercise')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.use('/api/exercise/new-user', newUser)
app.use('/api/exercise/users', users)
app.use('/api/exercise/add', addExercise)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
