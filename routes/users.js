const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/', async (req, res) => {
  try {
    const usersFound = await User.find().select('_id username')

    res.send(usersFound)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

module.exports = router