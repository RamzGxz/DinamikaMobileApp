const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    namaBarang: {
        required: true,
        type: String
    },
    hargaBarang: {
        required: true,
        type: Number
    },
    jumlahBarang: {
        required: true,
        type: Number
    },
    tanggal: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('stock', stockSchema, 'stock')