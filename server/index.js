const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3308,
    user: "root",
    password: "P@ssw0rd",
    database: "copacabana"
});

app.get('/',(req,res) => {

    const listaLugares = "SELECT * FROM bus;";

    db.query(listaLugares, (error,result) => {
        res.send(result);
    });
})

app.listen(3001,() => {
    console.log('Servidor activo en puerto 3001');
})