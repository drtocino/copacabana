const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(express.json());
app.set('trust proxy', 1) 
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET","HEAD","DELETE","PUT"] ,
    credentials: true,
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//buses 

app.post("/RegistrarBus", (req, res) => {
    const idTipoBus = req.body.tipoBus;
    const placa = req.body.placa;
    console.log(req.body.placa)
    db.query(
      "INSERT INTO bus ( idTipoBus,placa) VALUES (?,?)",
      [idTipoBus, placa],
      (err, result) => {
        if (err) {
         // console.log(err);
        } else {
          console.log("values inserted");
          res.send("Values inserted");
        }
      }
    );
  });

app.get("/listaBus", (req, res) => {
    db.query("SELECT b.idBus as idBus,tb.nombre as nombre ,b.placa as placa,b.idTipoBus as idTipoBus  FROM tipoBus tb INNER JOIN bus b ON tb.idTipoBus = b.idTipoBus;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/DatosBus/:idBus", (req, res) => {
    const idBus = req.params.idBus;
    console.log(req.params.idBus)
    db.query("SELECT *  FROM bus WHERE idBus = ?;",idBus,(err,result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/UpdateBus", (req, res) => {
    console.log (req.body)
    const idBus = req.body.idBus;
    const idTipoBus = req.body.idTipoBus;
    const placa = req.body.placa;

    db.query(
      "UPDATE bus SET placa = ? , idTipoBus = ? where idBus = ?",
      [placa, idTipoBus,idBus],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  

  app.delete("/delete/:idBus", (req, res) => {
    console.log(req.params);
    const idBus = req.params.idBus;
  
    db.query("DELETE FROM bus WHERE idBus = ?", idBus, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.use(
    session({
        key: "userId",
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            expires: 1000000,
        },
    })
);

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "copacabana"
});

app.get('/login',(req,res) => {
    console.log(req.session)
    if(req.session.usuario){
        console.log("Logeado")
        res.send({loggedIn: true,user: req.session.usuario});
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
                    req.session.usuario = result[0].usuario;
                    console.log(req.session);
                    req.session.save();
                    res.send(result);
                    //var ses = req.session;
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
        req.session.save();
    })
})


  
app.listen(3001,() => {
    console.log('Servidor activo en puerto 3001');
})
