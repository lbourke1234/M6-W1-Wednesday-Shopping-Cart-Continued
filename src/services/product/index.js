import express from 'express'
import models from '../../db/models/index.js'

const { Product, Review } = models
const productRouter = express.Router()

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Review
    })
    res.send(products)
  } catch (error) {
    console.log(error)
    next(err)
  }
})

productRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      res.status(404).send('not found')
    } else {
      res.send(product)
    }
  } catch (error) {
    console.log(error)
    next(err)
  }
})

productRouter.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.send(newProduct)
  } catch (error) {
    console.log(error)
    next(err)
  }
})
productRouter.post('/:productId/reviews', async (req, res, next) => {
  try {
    const newProduct = await Review.create({
      ...req.body,
      productId: req.params.productId
    })
    res.send(newProduct)
  } catch (error) {
    console.log(error)
    next(err)
  }
})
productRouter.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    if (!product) {
      res.status(404).send('not found')
    } else {
      res.send(product)
    }
  } catch (error) {
    console.log(error)
    next(err)
  }
})

productRouter.delete('/:id', async (req, res, next) => {
  try {
    const rows = Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send({ rows })
  } catch (error) {
    console.log(error)
    next(err)
  }
})

export default productRouter
