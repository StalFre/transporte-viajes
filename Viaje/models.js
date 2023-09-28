var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ViajesSchema = schema({
    _id_vehiculo: String,
    _id_chofer: String,
    origen: String,
    destino: String,
    fecha_salida: String,
    tipo: String,
    semana: Number,
    viaticos: Number,
    guias: [],
});

module.exports = mongoose.model('viajes', ViajesSchema);