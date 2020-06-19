/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const jwtKey = require('../config/constants').jwt_key

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, jwtKey, (error, decodeToken) => {
      if (error) {
        res.status(401).json({ message: 'INVALID TOKEN' })
      }
      else {
        req.decodeToken
        next()
      }
    })
  }
  else {
    res.status(401).json({ you: 'YOU SHALL NOT PASS!' });
  }
};
