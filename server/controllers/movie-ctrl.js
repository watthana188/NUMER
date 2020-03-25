const bisec = require('../models/ิbisectionmodel')
const fal = require('../models/falpositionmodel')
const newton = require('../models/newtonmodel')
const secant = require('../models/secantmodel')
const ward = require('../models/forwardhmodel')
const one = require('../models/onepointmodel')
const trap = require('../models/trapmodel')



getbisection = async (req, res) => {
    await  bisec.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `index not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
getfalposition = async (req, res) => {
    await  fal.find({}, (err,falpositions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!falpositions.length) {
            return res
                .status(404)
                .json({ success: false, error: `index not found` })
        }
        return res.status(200).json({ success: true, data: falpositions })
    }).catch(err => console.log(err))
}
getnewton= async (req, res) => {
    await  newton.find({}, (err, newtons) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!newtons.length) {
            return res
                .status(404)
                .json({ success: false, error: `index not found` })
        }
        return res.status(200).json({ success: true, data: newtons })
    }).catch(err => console.log(err))
}
getsecant= async (req, res) => {
    await  secant.find({}, (err, secants) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!secants.length) {
            return res
                .status(404)
                .json({ success: false, error: `index not found` })
        }
        return res.status(200).json({ success: true, data: secants })
    }).catch(err => console.log(err))
}
getwardh= async (req, res) => {
    await  ward.find({}, (err, wardhs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!wardhs.length) {
            return res
                .status(404)
                .json({ success: false, error: `index not found` })
        }
        return res.status(200).json({ success: true, data:wardhs })
    }).catch(err => console.log(err))
}
getonepoint= async (req, res) => {
    await  one.find({}, (err, onepoints) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!onepoints.length) {
            return res
                .status(404)
                .json({ success: false, error: `index not found` })
        }
        return res.status(200).json({ success: true, data:onepoints})
    }).catch(err => console.log(err))
}
gettrap= async (req, res) => {
    await  trap.find({}, (err, traps) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!traps.length) {
            return res
                .status(404)
                .json({ success: false, error: `index not found` })
        }
        return res.status(200).json({ success: true, data:traps})
    }).catch(err => console.log(err))
}





module.exports = {
    getbisection,
    getfalposition,
    getnewton,
    getsecant,
    getwardh,
    getonepoint,
    gettrap
   
}