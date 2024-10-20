const mongoose = require("mongoose")
const dbconnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/')
        console.log("Conexion correcta")
    } catch (error) {
        console.error('Error en la conexion', error);
        process.exit(1);
    }
};

module.exports = dbconnect;