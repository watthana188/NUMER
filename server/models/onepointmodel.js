const mongoose = require('mongoose')
const Schema = mongoose.Schema

const onepoint = new Schema(
    {
        fx: { type:String, required: true },
        x0: { type:Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('onepoints', onepoint)