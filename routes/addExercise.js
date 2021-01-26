const express = require('express')
const moment = require('moment')
const router = express.Router()

const User = require('../models/User')
const Exercise = require('../models/Exercise')

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })

    if (!user) return res.status(404).json({ msg: 'User does not exist' })
    const newExercise = await Exercise.create({
      ...req.body,
      user: req.body.userId,
      duration: +req.body.duration,
      date: req.body.date === '' ? Date.now() : req.body.date
    })

    res.status(201).json({
      _id: user._id,
      username: user.username,
      date: moment(newExercise.date).format('ddd MMM DD YYYY'),
      duration: newExercise.duration,
      description: newExercise.description
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

module.exports = router