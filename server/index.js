const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
//const bcrypt = require('bcrypt');

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3308,
    user: "root",
    password: "P@ssw0rd",
    database: "copacabana"
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/login/:usuario&:clave',(req,res) => {
    const usuario = req.params.usuario;
    const clave = req.params.clave;
    const login = "SELECT * FROM usuario WHERE usuario = ? AND password = ?;";

    db.query(login, [usuario,clave], (error,result) => {
        if(error){
            console.log("Ocurrio un ERROR"+error)
        }else{
            console.log("RESULTADOS:"+result)
            if(result === ""){
                console.log("no existe")
                res.send("no existe");
            }else{
                res.send(result);
            }
        }
    });
})

app.listen(3001,() => {
    console.log('Servidor activo en puerto 3001');
})