const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '193.203.175.73', // Cambia al hostname proporcionado
  user: 'u570384874_designcreation', // Usuario creado
  password: 'Eldelas2cabezasdetoro*', // Contraseña creada
  database: 'u570384874_hospedaje'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});
