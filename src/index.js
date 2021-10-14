const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

const { mongoose } = require('./database')

//Settings
app.set('port', process.env.PORT);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/products', require('./routes/products.routes'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'), ()=>{
    console.log( `server on port ${app.get('port')}`)
})