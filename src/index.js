const express = require('express')
const routes = require('./routes')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8080;


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes)

const server = app.listen(PORT, () => console.log(`Sever on port: ${PORT}`))

server.on('error', (err) => {
  console.log('ERROR', err)
})
