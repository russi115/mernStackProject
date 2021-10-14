const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    company: String,
    ticker: String,
    stockPrice: String,
    timeElapsed: String,
})

module.exports = mongoose.model('Product', ProductSchema )
