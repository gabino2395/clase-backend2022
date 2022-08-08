const express = require('express')
const app = express()
const { Router } = express
const routerProducts = Router()
const ProductMethod = require('../ProductMethod')
const productMethod = new ProductMethod('./products.txt')

//middlewares de app
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


//cofiguracion de motor con pug
app.set('view engine', 'pug')
app.set('views', './views')



routerProducts.get('/', async (req, res) => {
    res.render('partials/form.pug', {
        titulo: "Adidas 2022",
        producto: false
    })
})
routerProducts.get('/productos', async (req, res) => {
    const producto = await productMethod.getAll()
    const listExist = producto.length > 0

    res.render(
        'index', {
        titulo: 'open sports',
        list: producto,
        listExist,
        producto: true

    }
    )



})


routerProducts.post('/creador', async (req, res) => {
    const producto = await productMethod.save(req.body);
    const creado = producto != -1
    res.render('pages/creadorConfirmar.pug', {
        hayProducto: creado,
        titulo: 'creacion del producto'
    })
})












app.use('/', routerProducts)

const port = 8080
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))