const express = require('express')
const router = express.Router()

//Product model
const Product = require('../models/products')

//Get all products
router.get('/', async(req, res)=>{
    const products = await Product.find()
    res.json(products);
});

//Get id
router.get('/:id', async(req, res) =>{
    const task = await Product.findById(req.params.id)
    res.json(task)
})

//Post
router.post('/', async(req, res) =>{
    console.log('req : ', req.body)
    const {company,ticker,stockPrice,timeElapsed} = req.body;
    const product = new Product({company,ticker,stockPrice,timeElapsed})
    await product.save()
    res.json({status: 'product saved'})
})

//Update
router.put('/:id', async(req, res) =>{
    const {company,ticker,stockPrice,timeElapsed} = req.body;
    const newproduct = {company,ticker,stockPrice,timeElapsed}
    await Product.findByIdAndUpdate(req.params.id, newproduct)
    res.json({status: 'product updated'})
})

//Remove
router.delete('/:id', async(req, res) =>{
    await Product.findByIdAndRemove(req.params.id)
    res.json({status: 'product removed'})
})

module.exports = router;