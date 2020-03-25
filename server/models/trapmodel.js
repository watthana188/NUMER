const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trap = new Schema(
    {
        fx: { type:String, required: true },
        a: { type:Number, required: true },
        b: { type:Number, required: true },
        n: { type:Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('traps', trap)