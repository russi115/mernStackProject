const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.URI

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })

 .then( db => {
    console.log('DB is connected to', url);
})

.catch( err => {
    console.log(err)
})

module.exports = mongoose
