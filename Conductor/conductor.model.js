const mongoose = require('mongoose');

const ConductorSchema = new mongoose.Schema({
    cedula: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    licencia: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Conductor', ConductorSchema);
