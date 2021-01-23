const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/', async (req, res) => {
  if (!req.query.userId) return res.status(400).json({ msg: 'You must specify a User Id' })
  
  try {
    const user = await User.findById(req.query.userId)

    if (!user) return res.status(404).json({ msg: 'User was not found' })

    // Continue here
    res.send('Hello')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

module.exports = router