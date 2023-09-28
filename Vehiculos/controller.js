const Vehiculo = require("./models");

async function create(req, res) {
    const entity = new Vehiculo();

    var { placa, carga, marca, modelo } = req.body;

    if (placa && carga && marca && modelo) {
        entity.placa = placa;
        entity.carga = carga;
        entity.marca = marca;
        entity.modelo = modelo;


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
        const objects = await Vehiculo.find({});
        return res.status(200).send(objects);
    } catch (err) {
        return res.status(500).send({ message: "Error de servidor", error: err });
    }
}

async function deleteEntity(req, res) {
    var id = req.params.id;
    try {
        const entity = await Vehiculo.findByIdAndDelete(id);
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
        const entity = await Vehiculo.findByIdAndUpdate(id, update, {
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
        const entity = await Vehiculo.find({
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