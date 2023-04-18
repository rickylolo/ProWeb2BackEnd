//Traigo mi modelo de usuario
const Users = require('../models/User')
//Modulo para encriptar la contraseña
const bcrypt = require('bcrypt')
//Modulo para generar JSON Web Tokens
const jwt = require('jsonwebtoken')

const signToken = (_id) => jwt.sign({ _id }, 'hola') // Funcion que me genera un JSON Web Token con un id y un string 'secreto'

const User = {
  //------------------------ AQUI TENGO TODAS MIS ACCIONES -----------------------
  login: async (req, res) => {
    const user = new Users(req.body) // Pido el body al request (basicamente el body es el JSON que envian)
    try {
      const isUser = await Users.findOne({ email: user.email }) // Busco primeramente si hay un usuario con el mismo correo
      if (!isUser) {
        res.status(403).send('Email o contraseña inválida') // Si es nulo significa que no trajo nada y por lo tanto se equivoco el usuario
      } else {
        const isMatch = await bcrypt.compare(user.password, isUser.password) // Aqui uso una funcion del bcrypt para comparar contraseña debido a que esta ya esta encriptada en la base de datos
        if (isMatch) {
          const signed = signToken(isUser._id) // Si finalmente hace match significa que el usuario ingreso satisfactoriamente
          res.status(200).send(signed) // Y regresamos el JSON Web Token
        } else {
          res.status(403).send('Email o contraseña inválida')
        }
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  //Obtener datos del usuario
  get: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id }) //Obtener datos con un id
    res.status(200).send(user)
  },

  list: async (req, res) => {
    const users = await Users.find() //Encontrar todos los usuarios
    res.status(200).send(users)
  },

  create: async (req, res) => {
    const user = new Users(req.body)
    try {
      const isUser = await Users.findOne({ email: user.email })
      if (isUser) {
        return res.status(403).send('Usuario ya existente') // Validación para no repetir usuario en base de datos
      }
      const salt = await bcrypt.genSalt() // Le genero un SALT al usuario
      user.password = await bcrypt.hash(user.password, salt) // Le encripto la contraseña con el SALT generado
      user.salt = salt // Le guardo su SALT
      const signed = signToken(user.id) //Mi JSON WebToken

      await user.save() // Guardo al usuario
      res.status(201).send(signed) // Envio la JSON Web Token
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id }) //Obtengo mi usuario con el id
    Object.assign(user, req.body) // Le asigno los valores del body a ese usuario
    await user.save() // Lo guardo (se actualizan los datos)
    res.sendStatus(204)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id }) // Encuetro por id
    if (user) {
      // Si existe
      await user.remove() // Se elimina
    }
    res.sendStatus(204)
  },
}

module.exports = User
