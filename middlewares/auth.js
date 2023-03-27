function Authentification() {
  const express = require('express')
  const User = require('../models/User')
  const expressJwt = require('express-jwt')

  const validateJwt = expressJwt({
    secret: 'hola',
    algorithms: ['HS256'],
  })

  // Middlewares
  const findAndAssignUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id)
      if (!user) {
        return res.status(401).end()
      }
      req.user = user
      next()
    } catch (e) {
      next(e)
    }
  }

  const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser)
  return isAuthenticated
}

module.exports = Authentification
