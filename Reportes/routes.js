var express = require('express');
var controller = require('./controller');

var api = express.Router();

api.get('/viajes/:placa', controller.viajesPorPlaca);
api.get('/mantenimientos/:placa', controller.mantenimientosPorPlaca);

module.exports = api;