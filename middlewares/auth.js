// Mi middleware es una funcion la cual regresa un middleware
function Authentification() {
  const express = require('express')
  // Traigo mi modelo de usuario por si necesito usar sus acciones
  const User = require('../models/User')

  // Con expressJwt puedo validar mis JSON Web Tokens
  const expressJwt = require('express-jwt')

  // ----------------------------------Middlewares-----------------

  // Creo mi validador con mi secreto y el algoritmo que se utiliza
  const validateJwt = expressJwt({
    secret: 'hola',
    algorithms: ['HS256'],
  })

  // Ejemplo de middleware
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

  const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser) // Aqui junto mi validador y mi ejemplo de middleware
  return isAuthenticated // Regreso mi middleware completo
}

module.exports = Authentification
