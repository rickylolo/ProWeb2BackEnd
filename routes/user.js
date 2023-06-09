const express = require('express')
const router = express.Router()

//Traigo mi controlador de usuario para usar las funciones
const user = require('../controllers/user')

//Traigo mi middleware de authentification
const Authentification = require('../middlewares/auth')

//Le asigno al router las acciones y su función a realizar
router.get('/user', user.list)
router.get('/user/:id', Authentification(), user.get)

router.post('/user/login', user.login)
router.post('/user', user.create)
router.put('/user/:id', user.update) // Authentification()
router.delete('/user/:id', user.destroy) // Authentification()
router.post('/user/addCart', user.addProductToCart) // Authentification()

module.exports = router
