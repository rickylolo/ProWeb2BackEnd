const express = require('express')
const router = express.Router()
const cart = require('../controllers/cart')

router.get('/cart', cart.list)
router.get('/cart/:id', cart.get)
router.put('/cart/:id', cart.update)
router.delete('/cart/:id', cart.destroy)

module.exports = router
