// definindo o strict mode
'use strict'

// Definindo imports
const express = require('express')
const cors = require('cors')
const config = require('./config')
const usersRoutes = require('./routes/users-routes')
const booksRoutes = require('./routes/books-routes')
const hiresRoutes = require('./routes/hire-routes')

// Inicializando o Express
const app = express()

// Definindo a utilização de JSON no corpo da requisição
// (Body Parser)
app.use(express.json())

// Definindo a utilização do CORS
// (frontend)
app.use(cors())

// utilizando as rotas
app.use('/api/users', usersRoutes.routes)
app.use('/api/hires', hiresRoutes.routes)
app.use('/api/books', booksRoutes.routes)

// Definindo a porta onde o servidor estará ouvindo
app.listen(config.port, () =>
  console.log('API está rodando em http://localhost:' + config.port)
)
