const express = require('express');
const router = express.Router();
const Articulos = require('../models/artmodels.js');


//obtener lista
router.get('/articulos', async (req, res) => {
    try {
        const articulos = await Articulos.find();
        res.status(200).send(articulos);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener los productos',error})
    }
});

//ID del producto
router.get('/articulos/:id', async (req, res) => {
    try {
        const articulo = await Articulos.findByid(req.params.id);
        if (!articulo) {
            return res.status(404).send({mensaje: "producto no encontrado"})
        } 
        res.status(200).send(articulo);
    }catch(error){
        res.status(500).send({mensaje: "error al obtener el producto", error})
    }
});

//nuevo producto
router.post('/articulos', async (req, res) => {
    const body = req.body;
    try {
        const nuevoArt = await Articulos.create(body);
        res.status(201).send(nuevoArt);
    } catch (error) {
        res.status(400).send(error);
    }
    
});

//actualizar producto
router.put("/articulos/:id", async (req, res) => {
    try {
        const artactualizado = await Articulos.findByidAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!artactualizado){
            res.return(404).send({mensaje: "producto no encontrado"})
        }
        res.status(200).send(artactualizado)
    } catch (error) {
        res.status(400).send({mensaje: "error al actualizar el producto", error})
    };
});

//eliminar producto

router.delete("/articulos/:id", async (req, res) => {
    try {
        const artEliminado = await Articulos.findByidAndUpdate(req.params.id);
        if (artEliminado) {
            return res.status(404).send({mensaje: "Producto no encontrado"});
        }
    } catch (error) {
        res.status(500).send({mensaje: "Error al eliminar producto"});
    }   
});




//-------------- ENDPOINTS

//filtrar por categoria

router.get('/articulos/stock/:categoria', async (req, res) => {
    const {categoria} = req.query
    
    try {

    const articulos = await Articulos.find({ categoria });
        if (articulos.length === 0){
            return res.status(404).send({mensaje: "no se encuentran por los filtros seleccionados"})
        }
        res.status(200).send(articulos);

    } catch (error) {
        res.status(500).send({mensaje: "error al obtener lista", error});
        
    };
});

// Obtener productos con bajo stock
router.get("/articulos/bajo-stock/:cantidad", async (req, res) => {
    const cantidadMinima = parseInt(req.params.cantidad);
  
    try {
      const articulos = await Articulos.find({
        cantidad: { $lt: cantidadMinima },
      });
      if (articulos.length === 0) {
        return res.status(404).send({message: `No se encuentran stock de los siguientes productos: ${cantidadMinima}`,
        });
      }
      res.status(200).send(productos);
    } catch (error) {
      res.status(500).send({
        mensaje: "Error al obtener los productos con bajo stock",
        error,
      });
    }
  });
  
  // Actualizar datos
  
  router.put('/actualizar-stock', async (req, res) => {
    const { articulos } = req.body;
  
    if (!Array.isArray(articulos) || !articulos.length) {
      return res.status(400).json({ error: 'Debe enviar un array de productos.' });
    }
  
    try {
  
      const operaciones = Articulos.map(({ id, cantidad }) => ({
        updateOne: { filter: { _id: id }, update: { cantidad } },
      }));
  
      const { modifiedCount } = await Articulos.bulkWrite(operaciones);
  
      res.status(200).json({ message: `Stock actualizado para ${modifiedCount} productos.` });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar productos', detalle: error.message });
    }
  });

module.exports = router;

