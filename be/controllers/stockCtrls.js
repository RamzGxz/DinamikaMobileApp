const stockModels = require('../models/stockModels')

const getIndonesianDate = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    const day = days[date.getDay()]
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const dayOfMonth = date.getDate()
    const sec = date.getSeconds()
    const min = date.getMinutes()
    const hour = date.getHours()

    return `${day}, ${dayOfMonth} ${month} ${year} ${hour}:${min}:${sec}`
}

const date = new Date()

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
            tanggal: getIndonesianDate(date)
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
