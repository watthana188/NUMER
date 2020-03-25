const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newton = new Schema(
    {
        fx: { type:String, required: true },
        x: { type:Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('newtons', newton)