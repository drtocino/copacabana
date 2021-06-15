const mysql = require('mysql');
const conexion = mysql.createConnection({
    host     : 'localhost',
    host     : 3308,
    user     : 'root',
    password : 'P@ssw0rd',
    database : 'copacabana'  
});
conexion.connect((error)=>{
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('¡Conectado a la Base de Datos!');
  });
module.exports = conexion;