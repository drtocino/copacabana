//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res)=>{
    const nombre = req.body.nombre;
    const nombreTerminal = req.body.nombreTerminal;
    conexion.query('INSERT INTO lugar SET ?',{nombre:nombre, nombreTerminal:nombreTerminal}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/');         
        }
});
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const idLugar = req.body.idLugar;
    const nombre = req.body.nombre;
    const nombreTerminal = req.body.nombreTerminal;
    conexion.query('UPDATE lugar SET ? WHERE idLugar = ?',[{nombre:nombre, nombreTerminal:nombreTerminal}, idLugar], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
});
};