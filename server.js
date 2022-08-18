const express = require('express')
const app = express()
const { Server: ServerHttp } = require('http')
const { Server: ServerIo } = require('socket.io')


const httpServer = new ServerHttp(app)
const io = new ServerIo(httpServer)


const ProductMethod = require('./Product.Method')
const productsUsers = new ProductMethod('./products.txt')
const messageUsers = new ProductMethod('./messages.txt')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})


io.on('connection', async (socket) => {
    const productos = await productsUsers.getAll()

    socket.emit('mensaje-productos', { productos })

    socket.on('producto-nuevo', (producto, cb) => {
        productos.push(producto)
        productsUsers.save(producto)
        const mensaje = {
            mensaje: 'productos insertado',
            productos
        }
        const id = new Date().getTime()
        io.sockets.emit('mensaje-productos', mensaje)
        cb(id)
    })




    const usuarios = await messageUsers.getAll()
    socket.emit('mensaje-usuario', { usuarios })

    socket.on('user-nuevo', (usuario, cb) => {

        usuarios.push(usuario)
        messageUsers.save(usuario)
        const mensaje = {
            mensaje: 'usuario archivado',
            usuarios
        }
        const id = new Date().getTime()

        io.sockets.emit('mensaje-usuario', mensaje)
        cb(id)

    })







})
const port = 3600
httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`))