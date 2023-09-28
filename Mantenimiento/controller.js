const Mantenimiento = require("./models");

async function create(req, res) {
    const entity = new Mantenimiento();

    var { fecha, fecha_proximo, kilometraje, costo, tipo, repuestos, _id_vehiculo } = req.body;

    if (fecha && fecha_proximo && kilometraje && costo && tipo && repuestos && _id_vehiculo) {
        entity.fecha = fecha;
        entity.fecha_proximo = fecha_proximo;
        entity.kilometraje = kilometraje;
        entity.costo = costo;
        entity.tipo = tipo;
        entity.repuestos = repuestos;
        entity._id_vehiculo = _id_vehiculo;

        try {
            const stored = await entity.save();
            if (stored) return res.status(200).send(stored);
            return res.status(500).send("Error de guardado");
        } catch (err) {
            return res.status(500).send({ message: "Error de servidor", error: err });
        }
    }
    res.status(400).send({ message: "Verifique los campos enviados" });
}

async function list(req, res) {
    try {
        const objects = await Mantenimiento.find({});
        return res.status(200).send(objects);
    } catch (err) {
        return res.status(500).send({ message: "Error de servidor", error: err });
    }
}

async function deleteEntity(req, res) {
    var id = req.params.id;
    try {
        const entity = await Mantenimiento.findByIdAndDelete(id);
        if (entity) {
            res.status(200).json({ message: "Eliminado correctamente" });
        } else {
            res.status(400).json({ message: "No existe la entidad" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}

async function update(req, res) {
    var id = req.params.id;
    var update = req.body;
    try {
        const entity = await Mantenimiento.findByIdAndUpdate(id, update, {
            new: true,
        });
        if (entity) {
            res.status(200).json({ entity: entity });
        } else {
            res.status(400).json({ message: "No existe la entidad" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}

async function get(req, res) {
    const id = req.query.nombre;

    try {
        const entity = await Mantenimiento.find({
            _id: id,
        });

        if (entity.length > 0) {
            return res.status(200).json(entity);
        } else {
            return res
                .status(404)
                .json({ message: "No se encontró ningúna entidad" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error en el servidor", error: error });
    }
}

module.exports = {
    create,
    list,
    deleteEntity,
    update,
    get,
};