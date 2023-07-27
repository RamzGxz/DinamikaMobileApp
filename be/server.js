const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected!')
}).catch(err => {
    console.log(err)
})

app.get('/anda', (req, res) => {
    res.send('wahai')
})



app.listen(3000, () => {
    console.log('app listed on http://localhost:3000/')
})
