const express = require('express')
const app = express()
const { Server: ServerHttp } = require('http')
const { Server: ServerIo } = require('socket.io')
const ProductMethod = require('./Product.Method')
const httpServer = new ServerHttp(app)
const io = new ServerIo(httpServer)
const productsUsers = new ProductMethod('./products.txt')
const messageUsers = new ProductMethod('./messages.txt')
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})
io.on('connection', async (socket) => {
    const comentarios = await messageUsers.getAll()

    // const mensajeUsuario = {
    //     mensaje: 'todo ok',
    //     usuarios
    // }
    const productos= await productsUsers.getAll()
    const mensajeProducto = {
        mensaje: 'ok',
        productos
    }
    socket.emit('mensaje-productos', mensajeProducto)
    // socket.emit('mensaje-productos', listaProductos)


    // socket.emit('mensaje-usuario', mensajeUsuario)
    socket.emit('mensaje-usuario', comentarios)

    /* 
    socket.on('producto-nuevo', (producto, cb) => {
        productos.push(producto)
        const mensaje = {
            mensaje: 'productos insertado',
            productos
        }
        const id = new Date().getTime()
        io.sockets.emit('mensaje-productos', mensaje)
        cb(id)
    })
    
    */    
    socket.on('user-nuevo', (usuario, callback) => {
   
        usuarios.push(usuario)
        const mensaje = {
            mensaje: 'usuario archivado',
            usuarios
        }
   
        io.sockets.emit('mensaje-usuario', mensaje)
    })
     
})
const port = 3500
httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`))