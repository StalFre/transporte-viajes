const express = require("express");
const cors = require("cors");
const mantenimientoRoutes = require("./Mantenimiento/routes");
const vehiculoRoutes = require("./Vehiculos/routes");
const viajeRoutes = require("./Viaje/routes");
const reportesRoutes = require("./Reportes/routes");
const authMiddleware = require('./Auth/auth.middleware');
const authRoutes = require('./auth/auth.route');
const conductorRoutes = require('./Conductor/conductor.route');

const mongoose = require("mongoose");
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use("/mantenimiento", authMiddleware.verifyToken, mantenimientoRoutes);
app.use("/vehiculo", authMiddleware.verifyToken, vehiculoRoutes);
app.use("/viaje", authMiddleware.verifyToken, viajeRoutes);
app.use("/reportes", authMiddleware.verifyToken, reportesRoutes);
app.use('/conductores', authMiddleware.verifyToken, conductorRoutes);

var port = 3800;

mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://127.0.0.1:27017/Transportes", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Conexion exitosa...!");

        app.listen(port, () => {
            console.log("Servidor corriendo en el localhost:3800");
        });
    })
    .catch((err) => console.log(err));