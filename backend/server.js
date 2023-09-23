const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleWare/errorMiddleware')
const connectDB = require('./config/db')
const cors = require("cors");
const port = process.env.PORT || 5000

connectDB()
   
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/api/workspace', require('./routes/todoRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/project', require('./routes/labelRoutes')) 
app.use('/api/workspace', require('./routes/workspaceRoutes')) 
app.use('/api/workspace', require('./routes/projectRoutes')) 

app.use(errorHandler)

app.listen(port, () => console.log(`Sever started on port ${port}`)) 