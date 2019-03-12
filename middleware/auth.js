const config = require('config');
const jwt = require('jsonwebtoken');


/*
* X-Auth-Token version
* */
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res.status(401).json({ message: 'No auth token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, config.get('jwtSecret'));
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: 'Auth failed'
//     });
//   }
// };

module.exports = auth;
