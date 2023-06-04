// Mis modulos de terceros
const express = require('express')
const mongoose = require('mongoose')

// Guardo mis rutas
const userRoutes = require('./routes/user')
const reviewRoutes = require('./routes/review')
const productRoutes = require('./routes/product')
const listRoutes = require('./routes/list')
const categoryRoutes = require('./routes/category')

// Creo mi aplicación express
const app = express()

//Especifico el puerto a utilizar
const port = process.env.PORT || 3000

// Especifico que express use JSON para el body
app.use(express.json())

// Agrego mis rutas para crear los endpoints de las entidades
app.use('/api', userRoutes)
app.use('/api', reviewRoutes)
app.use('/api', productRoutes)
app.use('/api', listRoutes)
app.use('/api', categoryRoutes)

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
