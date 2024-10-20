const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const artiRoutes = require('./routes/articulos');

app.use(express.json());
app.use(artiRoutes);


dbconnect().then(() => {
    app.listen(3000, () => {
        console.log("el servidor esta corriendo en el puerto 3000")
    });

}).catch(err => {
    console.log('No se pudo iniciar al servidor por un error en la DB')

});

