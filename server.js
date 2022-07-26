

const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.txt')
const express = require('express')
const app = express()
app.get('/', (req, res) => {
    res.end('hola gabino')
})

app.get('/productos',  async (req, res) => {
    const listaProductos = await contenedor.getAll()
    res.send(listaProductos)
})

app.get('/productoRandom', (req, res) => {
    res.end('hola maestro')
})





const port = 8082

const server = app.listen(port, () => {
    console.log(`listening on :${server.address().port}`)
})
server.on('error', (e) => { console.log(e) })
