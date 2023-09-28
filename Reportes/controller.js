const Viaje = require('../Viaje/models');
const Mantenimiento = require('../Mantenimiento/models');
const Vehiculo = require('../Vehiculos/models');

async function viajesPorPlaca(req, res) {
    const placa = req.params.placa;

    try {
        const vehiculo = await Vehiculo.findOne({ placa: placa });
        if (!vehiculo) {
            return res.status(404).send({ message: 'Vehículo no encontrado' });
        }

        const viajes = await Viaje.find({ _id_vehiculo: vehiculo._id });
        return res.status(200).send(viajes);
    } catch (err) {
        return res.status(500).send({ message: 'Error de servidor', error: err });
    }
}

async function mantenimientosPorPlaca(req, res) {
    const placa = req.params.placa;

    try {
        const vehiculo = await Vehiculo.findOne({ placa: placa });
        if (!vehiculo) {
            return res.status(404).send({ message: 'Vehículo no encontrado' });
        }

        const mantenimientos = await Mantenimiento.find({ _id_vehiculo: vehiculo._id });
        return res.status(200).send(mantenimientos);
    } catch (err) {
        return res.status(500).send({ message: 'Error de servidor', error: err });
    }
}

module.exports = {
    viajesPorPlaca,
    mantenimientosPorPlaca
};