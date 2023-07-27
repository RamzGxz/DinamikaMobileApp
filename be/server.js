const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const stockRoutes = require('./routes/stockRoutes')
const app = express()
app.use(express.json())
app.use(cors())

// connect to database
mongoose.connect('mongodb+srv://ramzi:ramzi@cluster0.adzm1i9.mongodb.net/dynamic', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected!')
}).catch(err => {
    console.log(err)
})

// using routes
app.use(stockRoutes)

app.listen(3000, () => {
    console.log('app listed on http://localhost:3000/')
})
