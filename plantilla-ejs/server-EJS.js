const express = require('express')
const app = express()
const { Router } = express
const routerProducts = Router()
const ProductMethod = require('../ProductMethod')

// const ProductMethod= require('../ProductMethod')
const productMethod = new ProductMethod('./products.txt')

//middlewares de la app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//configuracion de motor con ejs

app.set('view engine', 'ejs')
app.set('views', './views')


routerProducts.get('/', (req, res) => {
    res.render('pages/form.ejs', {
        titulo: "Subir productos Adidas",
        nav: "creador"
    })
})

routerProducts.post('/creador', async (req, res) => {
    const producto = await productMethod.save(req.body);
    const creado = producto != -1
    console.log(producto)
    res.render('pages/creado.ejs', {
        hayProducto: creado,
        titulo: 'Creacion de producto'
    })
})

routerProducts.get('/productos', async (req, res) => {
    const producto = await productMethod.getAll();
    const listExist = producto.length > 0;
    res.render('pages/index.ejs', {
        titulo: "Adidas 2022",
        listaProductos: producto,
        listExist,
        nav: "productos"
    })
})






app.use('/', routerProducts)

const port = 8080

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
