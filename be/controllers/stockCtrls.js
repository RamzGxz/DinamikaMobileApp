const stockModels = require('../models/stockModels')

module.exports = {
    getStock: async (req, res) => {
        try {
            const data = await stockModels.find()
            res.send(data)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    },
    postStock: async (req, res) => {
        const data = new stockModels({
            namaBarang: req.body.namaBarang,
            hargaBarang: req.body.hargaBarang,
            jumlahBarang: req.body.jumlahBarang,
            tanggal: new Date()
        })
        try {
            const dataToSave = await data.save()
            res.json({
                message: 'data has been inserted!',
                data: dataToSave
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    },
    deleteStock: async (req, res) =>{
        try {
            const resp = await stockModels.deleteOne({_id: req.params._id})
            if(resp.deletedCount === 1) {
                res.json({
                    message: 'data has been deleted!'
                })
            } else {
                res.json({
                    message: 'ID not found!!'
                })
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    },
    putStock: async (req, res) =>{
        try {
            const resp = await stockModels.updateOne({_id: req.params._id}, {
                $set:{
                    namaBarang: req.body.namaBarang,
                    hargaBarang: req.body.hargaBarang,
                    jumlahBarang: req.body.jumlahBarang,
                    tanggal: req.body.tanggal
                }
            })

            if(resp.matchedCount === 1) {
                res.json({
                    message: 'data has been updated',
                })
            } else {
                res.json({
                    message: 'ID not found!'
                })
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}
