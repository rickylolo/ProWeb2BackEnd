const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const reviewRoutes = require('./routes/review')
const productRoutes = require('./routes/product')
const listRoutes = require('./routes/list')
const categoryRoutes = require('./routes/category')
const app = express()
const port = 3000

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', reviewRoutes)
app.use('/api', productRoutes)
app.use('/api', listRoutes)
app.use('/api', categoryRoutes)

mongoose.connect(
  'mongodb+srv://user:SPt2EjQXKV3iSNxS@proweb2.djh2qpr.mongodb.net/?retryWrites=true&w=majority'
)

app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe')
})

app.listen(port, () => {
  console.log('Arrancando al aplicación')
})
