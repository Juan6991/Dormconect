const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/categoriesController");

// Ruta para obtener las categorías
router.get("/", getCategories);

module.exports = router;
