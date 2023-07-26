const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    namaBarang: {
        required: true,
        type: String
    },
    
})