const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3308,
    user: "root",
    password: "P@ssw0rd",
    database: "copacabana"
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: 'userId',
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1800,
    }
}));

app.get('/login',(req,res) => {
    console.log(req.session)
    if(req.session.user){
        console.log("Logeado")
        res.send({loggedIn: true,user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

app.post('/login',(req,res) => {
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    const login = "SELECT * FROM usuario WHERE usuario = ?";
    db.query(login,usuario,(error,result) => {
        if(error){
            console.log("Ocurrio un error -> "+error)
        }
        if (result.length > 0){
            if(result[0].password.length < 16){
                if (result[0].password === clave){
                    req.session.user = result;
                    res.send(result);
                    console.log(req.session);
                }else{
                    res.send({message: "Combinacion incorrecta"})
                    console.log("Combinacion incorrecta")
                }
            }else{
                bcrypt.compare(clave, result[0].password,(er,re) => {
                    if(re){
                        res.send(result);
                        console.log(result);
                    }else{
                        res.send({message: "Combinacion de contra incorrecta"});
                        console.log('Combinacion de contra incorrecta'+re)
                    }
                })
            }
        }else{
            console.log("No existe el usuario")
            res.send({message:"No existe el usuario"})
        }
    })
})

app.listen(3001,() => {
    console.log('Servidor activo en puerto 3001');
})