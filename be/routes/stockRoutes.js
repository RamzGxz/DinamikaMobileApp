const express = require('express')
const stockCtrls = require('../controllers/stockCtrls')
const stockRoutes = express.Router()

stockRoutes.get('/getStock', stockCtrls.getStock)
stockRoutes.post('/postStock', stockCtrls.postStock)
stockRoutes.put('/putStock/:_id', stockCtrls.putStock)
stockRoutes.delete('/deleteStock/:_id', stockCtrls.deleteStock)

module.exports = stockRoutes