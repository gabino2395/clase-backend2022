

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
     console.log(listaProductos)
})


app.get('/productoRandom',  async (req, res) => {
    const listaProductos=await contenedor.getAll()
    const productoRandom = listaProductos[Math.floor(Math.random() * listaProductos.length)]
    res.send(productoRandom)
    console.log(productoRandom)
})





const port = 8080


const server = app.listen(port, () => {
    console.log(`listening on :${server.address().port}`)
    console.log(`listening on :${server.address().port}`)

})
server.on('error', (e) => { console.log(e) })
