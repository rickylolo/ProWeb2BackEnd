const express = require('express')
const router = express.Router()
const product = require('../controllers/product')

router.get('/product', product.list)
router.get('/product:id', product.get)
router.post('/product', product.create)
router.put('/product:id', product.update)
router.delete('/product:id', product.destroy)

module.exports = router
