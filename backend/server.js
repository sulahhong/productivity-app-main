const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleWare/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/api/todos', require('./routes/todoRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Sever started on port ${port}`)) 