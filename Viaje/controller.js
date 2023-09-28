const Viaje = require("./models");

async function create(req, res) {
    const {
        _id_vehiculo,
        _id_chofer,
        origen,
        destino,
        fecha_salida,
        tipo,
        semana,
        viaticos,
        guias
    } = req.body;

    if (_id_vehiculo && _id_chofer && origen && destino && fecha_salida && tipo) {
        try {
            const viaje = new Viaje({
                _id_vehiculo,
                _id_chofer,
                origen,
                destino,
                fecha_salida,
                tipo,
                semana,
                viaticos,
                guias
            });
            const stored = await viaje.save();
            return res.status(200).send(stored);
        } catch (err) {
            return res.status(500).send({ message: "Error de servidor", error: err });
        }
    }
    res.status(400).send({ message: "Verifique los campos enviados" });
}

async function list(req, res) {
    try {
        const viajes = await Viaje.find({});
        return res.status(200).send(viajes);
    } catch (err) {
        return res.status(500).send({ message: "Error de servidor", error: err });
    }
}

async function deleteEntity(req, res) {
    const id = req.params.id;
    try {
        const viaje = await Viaje.findByIdAndDelete(id);
        if (viaje) {
            res.status(200).json({ message: "Eliminado correctamente" });
        } else {
            res.status(400).json({ message: "No existe el viaje" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}

async function update(req, res) {
    const id = req.params.id;
    const update = req.body;
    try {
        const viaje = await Viaje.findByIdAndUpdate(id, update, { new: true });
        if (viaje) {
            res.status(200).json(viaje);
        } else {
            res.status(400).json({ message: "No existe el viaje" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}

async function get(req, res) {
    const id = req.query.nombre;
    try {
        const viaje = await Viaje.find({ _id: id });
        if (viaje.length > 0) {
            return res.status(200).json(viaje);
        } else {
            return res.status(404).json({ message: "No se encontró ningún viaje" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
}

module.exports = {
    create,
    list,
    deleteEntity,
    update,
    get,
};