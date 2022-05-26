import express from 'express'
import models from '../../db/models/index.js'

const { User } = models

const usersRouter = express.Router()

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

usersRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })
    res.send(updatedUser)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

usersRouter.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default usersRouter
