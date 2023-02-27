const express = require('express')
const mongoose = require('mongoose')
const user = require('./controllers/user')
const app = express()
const port = 3000

app.use(express.json())
mongoose.connect(
  'mongodb+srv://user:SPt2EjQXKV3iSNxS@proweb2.djh2qpr.mongodb.net/?retryWrites=true&w=majority'
)

app.get('/', user.list)
app.post('/', user.create)
app.get('/:id', user.get)
app.put('/:id', user.update)
app.delete('/:id', user.destroy)

app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe')
})

app.listen(port, () => {
  console.log('Arrancando al aplicación')
})
