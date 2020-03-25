const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forwardh= new Schema(
    {
        fx: { type:String, required: true },
        d: { type:Number, required: true },
        x: { type:Number, required: true },
        h: { type:Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('forwardhs', forwardh)