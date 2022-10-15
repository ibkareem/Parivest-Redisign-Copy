require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./db/dbConnector')
const users = require('./routes/usersRoutes')

const app = express()

connectDB();

const port = process.env.PORT || 3000

app.use(express.json())

app.use(cors())

app.use('/api/v1/users', users)

app.listen(port, ()=>{
    console.log('server up')
})