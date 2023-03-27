const express = require('express')
const router = express.Router()
const productcategory = require('../controllers/productcategory')

router.get('/productcategory', productcategory.list)
router.get('/productcategory:id', productcategory.get)
router.post('/productcategory', productcategory.create)
router.put('/productcategory:id', productcategory.update)
router.delete('/productcategory:id', productcategory.destroy)

module.exports = router
