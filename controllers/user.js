const User = {
  get: (req, res) => {
    res.status(200).send('Solo un Usuario')
  },
  list: (req, res) => {
    res.status(200).send('Todos mis Usuarios')
  },
  create: (req, res) => {
    res.status(201).send('Creando User')
  },
  update: (req, res) => {
    res.status(204).send('Actualizando User')
  },
  destroy: (req, res) => {
    res.status(204).send('Eliminando User')
  },
}

module.exports = User
