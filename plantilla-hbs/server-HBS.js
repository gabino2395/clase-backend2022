


const express = require('express')
const app = express()
const { Router } = express
const ProductMethod = require('../ProductMethod')
const productMethod = new ProductMethod('./products.txt')
const routerProducts = Router()
const handlebars = require('express-handlebars')





//middlewares de app
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))




//configuracion de hbs    
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
)


app.set('views', './views')//especifica el directorio de vistas
app.set('view engine', 'hbs')//registra el motor de plantillas


// app.get('/', async (req, res) => {
//     res.render(
//         'main',{

//         }
//     )
//     const productos = await productMethod.getAll()
//     res.send(productos)


// })

app.get('/', async (req, res) => {
    res.render('partials/form.hbs', {
        titulo: "Adidas 2022",
        producto: false
    })
})
routerProducts.get('/productos', async (req, res) => {
    const producto = await productMethod.getAll()
    const listExist = producto.length > 0

    res.render(
        'main', {
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
    res.render('layouts/creadorConfirmar.hbs', {
        hayProducto: creado,
        titulo: 'creacion del producto'
    })
})




app.use('/', routerProducts)


const port = 8081
app.listen(port, () => console.log(`Example app listening on port ${port}!`))