import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL)

export const testDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('DB connection is ok')
  } catch (error) {
    console.log('DB connection failed')
  }
}

export default sequelize
