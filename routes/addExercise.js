const express = require('express')
const moment = require('moment')
const router = express.Router()

const User = require('../models/User')
const Exercise = require('../models/Exercise')

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user })
    const newExercise = await Exercise.create(req.body)

    res.status(201).json({
      _id: user._id,
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: moment(newExercise.date + 1).format('dddd MMMM DD YYYY')
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

module.exports = router