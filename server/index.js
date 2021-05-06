const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('Hola mund');
})

app.listen(3001,() => {
    console.log('Servidor activo en puerto 3001');
})