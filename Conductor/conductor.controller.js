const Conductor = require('./conductor.model');

exports.createConductor = async (req, res) => {
    try {
        const conductor = new Conductor(req.body);
        await conductor.save();
        res.status(201).send(conductor);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllConductores = async (req, res) => {
    try {
        const conductores = await Conductor.find();
        res.send(conductores);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getConductorByCedula = async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const conductor = await Conductor.findOne({ cedula });
        if (!conductor) {
            return res.status(404).send({ message: 'Conductor no encontrado' });
        }
        res.send(conductor);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateConductor = async (req, res) => {
    try {
        const conductor = await Conductor.findOneAndUpdate(
            { cedula: req.params.cedula },
            req.body,
            { new: true, runValidators: true }
        );
        if (!conductor) {
            return res.status(404).send({ message: 'Conductor no encontrado' });
        }
        res.send(conductor);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteConductor = async (req, res) => {
    try {
        const conductor = await Conductor.findOneAndDelete({ cedula: req.params.cedula });
        if (!conductor) {
            return res.status(404).send({ message: 'Conductor no encontrado' });
        }
        res.send(conductor);
    } catch (error) {
        res.status(500).send(error);
    }
};
