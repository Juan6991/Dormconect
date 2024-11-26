const categories = require("../data/categories.json");

// Controlador para obtener categorías
const getCategories = (req, res) => {
  res.json(categories);
};

module.exports = { getCategories };
