const mongoose = require('mongoose')
const Schema = mongoose.Schema

const secant = new Schema(
    {
        fx: { type:String, required: true },
        xold: { type:Number, required: true },
        xnew: { type:Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('secants', secant)