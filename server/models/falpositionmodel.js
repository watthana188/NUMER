const mongoose = require('mongoose')
const Schema = mongoose.Schema

const falposition= new Schema(
    {
        fx: { type:String, required: true },
        xl: { type:Number, required: true },
        xr: { type:Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('falpositions', falposition)