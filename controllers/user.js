//Traigo mi modelo de usuario
const Users = require('../models/User')
const Carts = require('../models/Cart')
const Lists = require('../models/List')
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
        res.status(403).send('No hay usuarios con esas credenciales') // Si es nulo significa que no trajo nada y por lo tanto se equivoco el usuario
      } else {
        const isMatch = await bcrypt.compare(user.password, isUser.password) // Aqui uso una funcion del bcrypt para comparar contraseña debido a que esta ya esta encriptada en la base de datos
        if (isMatch) {
          const signed = signToken(isUser._id) // Si finalmente hace match significa que el usuario ingreso satisfactoriamente
          res.status(200).json({ JSONWToken: signed, userId: isUser._id })
        } else {
          res.status(403).send('No hay usuarios con esas credenciales')
        }
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  //Obtener datos del usuario
  get: async (req, res) => {
    try {
      const { id } = req.params
      const user = await Users.findOne({ _id: id })
        .populate('reviews')
        .populate('lists')
        .populate('products')
        .populate({
          path: 'cart',
          populate: {
            path: 'list',
            populate: {
              path: 'products.product',
            },
          },
        })

      // Eliminar propiedades sensibles del usuario
      user.password = undefined
      user.salt = undefined

      res.status(200).send(user)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  list: async (req, res) => {
    try {
      const users = await Users.find()
        .populate('reviews')
        .populate('lists')
        .populate('products')
        .populate({
          path: 'cart',
          populate: {
            path: 'list',
            populate: {
              path: 'products.product',
            },
          },
        })

      res.status(200).send(users)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  addProductToCart: async (req, res) => {
    const { userId, productId, quantity } = req.body

    try {
      // Buscar el usuario por su ID
      const user = await Users.findById(userId)

      if (!user) {
        return res.status(404).send('Usuario no encontrado')
      }

      const cart = await Carts.findById(user.cart)

      if (!cart.list) {
        // Crear una nueva lista
        const newList = new Lists({
          name: 'Carrito de compras',
          products: [],
          user: user._id,
        })

        // Guardar la nueva lista
        await newList.save()

        // Asignar la nueva lista al carrito existente del usuario
        cart.list = newList._id
        await cart.save()
      }

      // Obtener la lista del carrito del usuario
      const list = await Lists.findById(cart.list)

      // Verificar si el producto ya está en la lista
      const existingProduct = list.products.find((product) =>
        product.product.equals(productId)
      )

      if (existingProduct) {
        // El producto ya está en la lista, aumentar la cantidad
        existingProduct.quantity += quantity || 1
      } else {
        // El producto no está en la lista, crear un nuevo objeto de producto
        const newProduct = {
          product: productId,
          quantity: quantity || 1,
        }

        // Agregar el nuevo producto a la lista del carrito
        list.products.push(newProduct)
      }

      // Guardar los cambios en la lista del carrito
      await list.save()

      res.status(200).send('Producto agregado al carrito exitosamente')
    } catch (err) {
      res.status(500).send(err.message)
    }
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
      const cart = new Carts({ user: user.id }) // Creo el carrito de mi usuario
      await cart.save() // Guardo mi carrito

      // Actualizar el ID del carrito en el usuario
      await Users.findOneAndUpdate({ _id: user._id }, { cart: cart._id })

      res.status(201).send(signed) // Envio la JSON Web Token
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })

    if (!user) {
      return res.status(404).send('Usuario no encontrado')
    }

    // Actualiza los campos del usuario con los valores del body
    Object.assign(user, req.body)

    if (req.body.password) {
      const newSalt = await bcrypt.genSalt()
      const newHashedPassword = await bcrypt.hash(req.body.password, newSalt)

      // Actualiza la contraseña y el salt en la base de datos
      user.password = newHashedPassword
      user.salt = newSalt
    }

    await user.save() // Guarda los cambios en el usuario actualizado

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
