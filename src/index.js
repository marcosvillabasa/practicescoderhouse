const express = require('express')
const routes = require('./routes') 
const path = require('path')
const { engine } = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 8080

app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.resolve(__dirname, './views/layouts'),
  partialsDir: path.resolve(__dirname, './views/partials'),
  defaultLayout: path.resolve(__dirname, './views/layouts/index.hbs')
}));
app.set('views', './views');
app.set('view engine', 'hbs');

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)
app.get('/', (req, res) => {
  res.render('index', {});
});

const server = app.listen(PORT, () => console.log(`Sever on port: ${PORT}`))

server.on('error', (err) => {
  console.log('ERROR', err)
})

