const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/', async (req, res) => {
  const { username } = req.body

  try {
    const userExists = await User.findOne({ username })
    
    if (userExists) return res.status(400).json({ msg: 'User already exists' })

    const userAdded = await User.create(req.body)

    return res.status(201).json({
      _id: userAdded._id,
      username: userAdded.username
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

module.exports = router