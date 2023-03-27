const express = require('express')
const router = express.Router()
const listproducts = require('../controllers/listproducts')

router.get('/listproducts', listproducts.list)
router.get('/listproducts:id', listproducts.get)
router.post('/listproducts', listproducts.create)
router.put('/listproducts:id', listproducts.update)
router.delete('/listproducts:id', listproducts.destroy)

module.exports = router
