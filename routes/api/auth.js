const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route POST api/auth
// @Login user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Check for existing model
  User.findOne({ email: email })
    .then((user) => {
      if (!user)
        return res.status(400).json({ message: 'User does not exists' });

      // Compare passwords and user.password(hashed)
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ message: 'Invalid password ' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;

              res.status(200).json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// @route GET api/auth/user
// @Get user data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
