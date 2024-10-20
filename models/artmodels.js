const mongoose = require('mongoose');


const artSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String },
        precio: { type: Number, required: true },
        cantidad: { type: Number, required: true },
        categoria: { type: String },
        fechaIngreso: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Articulos", artSchema);
