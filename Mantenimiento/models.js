var mongoose = require('mongoose');
var schema = mongoose.Schema;

var MantenimientoSchema = schema({
    fecha: String,
    _id_vehiculo: String,
    fecha_proximo: String,
    kilometraje: Number,
    costo: Number,
    tipo: String,
    repuestos: [],
});

module.exports = mongoose.model('mantenimiento', MantenimientoSchema);