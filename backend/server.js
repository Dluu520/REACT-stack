const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')

//connect to database
const connectDB = require('./config/db')
connectDB()



const app = express()

//middleware 
//to use body data
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)
app.listen(port, () => console.log(`server is running on ${port}`))

