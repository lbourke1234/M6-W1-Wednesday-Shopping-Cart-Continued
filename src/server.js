import express from 'express'
import cors from 'cors'
import sequelize from './db/index.js'
import { testDB } from './db/index.js'
import productRouter from './services/product/index.js'
import reviewRouter from './services/reviews/index.js'
import usersRouter from './services/users/index.js'
import categoryRouter from './services/category/index.js'

const server = express()
server.use(express.json())
server.use(cors())
server.use('/products', productRouter)
server.use('/reviews', reviewRouter)
server.use('/users', usersRouter)
server.use('/category', categoryRouter)
const { PORT } = process.env

const initialize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log(`Server is listening on port ${PORT}`)
      await testDB()
      await sequelize.sync()
    })

    server.on('ERROR: ', (error) => {
      console.log('Server not running due to error: ' + error)
    })
  } catch (error) {
    console.log('Initialize error:', error)
    process.exit(1)
  }
}

initialize()
