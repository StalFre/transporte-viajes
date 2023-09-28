var mongoose = require('mongoose');
var schema = mongoose.Schema;

var VehiculoSchema = schema({
    placa: String,
    carga: Number,
    marca: String,
    modelo: String,
});

module.exports = mongoose.model('vehiculos', VehiculoSchema);