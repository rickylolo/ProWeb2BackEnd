// Mis modulos de terceros
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Guardo mis rutas
const cartRoutes = require('./routes/cart')
const categoryRoutes = require('./routes/category')
const listRoutes = require('./routes/list')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/user')

// Creo mi aplicación express
const app = express()
app.use(cors())

//Especifico el puerto a utilizar
const port = process.env.PORT || 3001

// Especifico que express use JSON para el body
app.use(express.json())

// Agrego mis rutas para crear los endpoints de las entidades
app.use('/api', cartRoutes)
app.use('/api', categoryRoutes)
app.use('/api', listRoutes)
app.use('/api', productRoutes)
app.use('/api', reviewRoutes)
app.use('/api', userRoutes)

mongoose.set('strictQuery', false)
//Mi conexión mongoose
mongoose.connect(
  'mongodb+srv://user:SPt2EjQXKV3iSNxS@proweb2.djh2qpr.mongodb.net/?retryWrites=true&w=majority'
)

// Cualquier otra ruta que no este definida arroja un status 404 page not found
app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe')
})

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto: ', port)
})
