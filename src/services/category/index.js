import express from 'express'
import models from '../../db/models/index.js'
import createError from 'http-errors'

const { Category } = models

const categoryRouter = express.Router()

categoryRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.send(categories)
  } catch (error) {
    next(error)
  }
})

categoryRouter.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id)
    if (category) {
      res.send(category)
    } else {
      createError(404, 'not found')
    }
  } catch (error) {
    next(error)
  }
})

categoryRouter.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body)
    res.send(newCategory)
  } catch (error) {
    next(error)
  }
})

categoryRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })
    if (updatedCategory) res.send(updatedCategory)
    else createError(404, 'not found')
  } catch (error) {
    next(error)
  }
})

categoryRouter.delete('/:id', async (req, res, next) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send()
  } catch (error) {
    next(error)
  }
})

export default categoryRouter
