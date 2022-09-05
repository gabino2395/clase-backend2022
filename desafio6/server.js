const express = require('express')
const app = express()
const { Router } = express
const Contenedor = require('./contenedor')

const contenedor = new Contenedor('./productos.txt')
const carrito = new Contenedor('./carrito.txt')

//rutas

const routerProducts = Router()
const routerCart = Router()

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











app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'))

app.use('/api/productos', routerProducts)


app.use('/api/carrito', routerCart)
//api de productos


routerProducts.get('/', async (req, res) => {
    res.sendFile('index.html', { root: __dirname })

// 

})
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params
    const { title } = req.params
    const prodByID = await contenedor.getByiD(parseInt(id))
    const prodByTitle = await contenedor.getByiD(parseInt(title))

    console.log(prodByID)
    console.log(prodByTitle)
    res.json({
        ok: true,
        mensaje: 'seleccionaste ' + 
        prodByID,
        id
    })
})



routerProducts.put('/:id', async (req, res) => {
    const { id } = req.params
    const objProducto = req.body
    console.log(objProducto)

    const productoActualizado = await contenedor.updateById({ id: parseInt(id), ...objProducto })
    console.log(productoActualizado)
    res.json({
        ok: true,

        mensaje: productoActualizado
    })
})



routerProducts.post('/', async (req, res) => {
    const objProducto = req.body
    await contenedor.save(objProducto)
    res.json({
        ok: true,
        mensaje: 'producto guardado',
        objProducto
    })
})

routerProducts.delete('/:id', async (req, res) => {
    const { id } = req.params
    const prodByID = await contenedor.getByiD(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'eliminaste ',
        prodByID,
        id
    })
})
routerProducts.use("*", (req, res) => {
    res.json({
        error: -2,
        description: `Ruta: ${req.url} Método: ${req.method} no implementada`,
    })
})
routerCart.get('/', async (req, res) => {
    res.sendFile('public/carrito.html', { root: __dirname })



})

routerCart.get('/:id/productos', async (req, res) => {
    const productos = await carrito.getAll()
    res.send(productos)


})


routerCart.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const prodByID = await carrito.getByiD(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'seleccionaste ' + prodByID.title,
        prodByID,
        id
    })
})

routerCart.post('/', async (req, res) => {
    const objProducto = req.body
    await carrito.save(objProducto)
    res.json({
        ok: true,
        mensaje: 'producto guardado',
        objProducto
    })
})

routerCart.delete('/:id', async (req, res) => {
    const { id } = req.params
    const prodByID = await carrito.deleteAll(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'eliminaste ',
        prodByID,
        id
    })
})

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id } = req.params
    const prodByID = await carrito.deleteById(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'eliminaste ',
        prodByID,
        id
    })
})
routerCart.use("*", (req, res) => {
    res.json({
        error: -2,
        description: `Ruta: ${req.url} Método: ${req.method} no implementada`,
    })
})

const port = 8080
app.listen(port, () => console.log(`Example app listening on port ${port}!`))