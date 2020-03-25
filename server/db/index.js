const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://watthana:0970568738@cluster0-pcwcn.mongodb.net/Numer', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db