const express = require('express');
const router = express.Router();
const conductorController = require('./conductor.controller');

router.post('/', conductorController.createConductor);
router.get('/', conductorController.getAllConductores);
router.get('/:cedula', conductorController.getConductorByCedula);
router.put('/:cedula', conductorController.updateConductor);
router.delete('/:cedula', conductorController.deleteConductor);


module.exports = router;
