
const express = require('express')

const MovieCtrl = require('../controllers/movie-ctrl')

const router = express.Router()

router.get('/getbisection',MovieCtrl.getbisection)
router.get('/getfalposition',MovieCtrl.getfalposition)
router.get('/getnewton',MovieCtrl.getnewton)
router.get('/getsecant',MovieCtrl.getsecant)
router.get('/getonepoint',MovieCtrl.getonepoint)
router.get('/getwardh',MovieCtrl.getwardh)
router.get('/gettrap',MovieCtrl.gettrap)

module.exports = router