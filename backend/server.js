const express = require("express");
const cors = require("cors");
const categoriesRoutes = require("./routes/categories");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Para permitir peticiones desde el frontend
app.use(express.json()); // Para procesar JSON

// Rutas
app.use("/api/categories", categoriesRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
