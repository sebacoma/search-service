// routes/search.js
const express = require('express');
const router = express.Router();
const Product = require('../models/');

// Ruta de búsqueda
router.get('/', async (req, res) => {
  const { query } = req.query;

  try {
    // Buscar productos cuyo nombre o descripción contenga el término de búsqueda
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
