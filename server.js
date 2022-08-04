const express = require('express')
const app = express()
const { Router } = express
const Contenedor = require('./contenedor')

const contenedor = new Contenedor('./productos.txt')




const routerProducts = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


// routerProducts.get('/', async (req, res) => {
//     const productos = await contenedor.getAll()
//     res.send(productos)

// })
routerProducts.get('/', async (req, res) => {
    const productos = await contenedor.getAll()
    res.send(productos)
    // res.sendFile(__dirname+'/public/index.html')


})
routerProducts.get('/:id', async (req, res) => {
    const { id  } = req.params
    const prodByID=  await contenedor.getByiD(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'seleccionaste ' + prodByID,
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



routerProducts.post('/',  async(req, res) => {
    const objProducto = req.body
     await contenedor.save(objProducto)
    res.json({
        ok: true,
        mensaje: 'producto guardado',
        objProducto
    })
})

routerProducts.delete('/:id', async(req, res) => {
    const { id  } = req.params
    const prodByID=  await contenedor.getByiD(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'eliminaste ' + prodByID,
        prodByID,
        id
    })
})


app.use('/api/productos', routerProducts)


const port = 8080
app.listen(port, () => console.log(`Example app listening on port ${port}!`))