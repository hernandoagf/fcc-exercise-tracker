const express = require('express')
const moment = require('moment')
const router = express.Router()

const User = require('../models/User')
const Exercise = require('../models/Exercise')

router.get('/', async (req, res) => {
  if (!req.query.userId) return res.status(400).json({ msg: 'You must specify a User Id' })
  
  try {
    const user = await User.findById(req.query.userId)

    if (!user) return res.status(404).json({ msg: 'User was not found' })

    const exercises = await Exercise.find({ user: req.query.userId }).select('description duration date -_id')
    
    const exerciseLog = exercises.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: moment(exercise.date).format('ddd MMM DD YYYY')
    }))
    
    res.json({
      _id: user._id,
      username: user.username,
      count: exerciseLog.length,
      log: exerciseLog
    })
    
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

module.exports = router