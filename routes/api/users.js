const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route POST api/users
// @Register new user
// @access Public
router.post('/', (req, res) => {

  res.status(200).send('Success')
})


module.exports = router;
