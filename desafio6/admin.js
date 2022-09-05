const express = require('express');
const app = express();
const port = 3000;

// Middlewa que verifica si el usuario es un administrador.
function isAdmin(req, res, next) {
    if (req.body.isAdmin) {
        next();
    } else {
        res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
    }
}

// Permite recibir parámetros en formato JSON.
app.use(express.json());

// Se agrega el middleware en la aplicación.
app.use(isAdmin);

// Ruta a la cual solo deben ingresar usuarios administradores.
app.get('/dashboard', (req, res) => {
    res.send('You are an admin');
});


app.listen(port, () => {
    console.log(`Server listeting on port ${port}`)})