const fs = require('fs')


class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }

    async save(obj) {
        try {
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchivoParse = JSON.parse(dataArchivo)
            if (dataArchivoParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchivoParse, { ...obj, id: dataArchivoParse.length + 1 }], null, 2))

            } else {

                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: dataArchivoParse.length + 1 }], null, 2))
            }
            return dataArchivoParse.length + 1
            // console.log(`el archivo tiene el id:${dataArchivoParse.length + 1}`)

        } catch (err) {
            console.log(err)
        }
    }
    // traer producto por id
    async getByiD(id) {
        try {
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchivoParse = JSON.parse(dataArchivo)
            let producto = dataArchivoParse.find(prodcuto => prodcuto.id === id)
            if (producto) {
                console.log(producto)
            } else {
                console.log('no se encontro el producto')
            }

        } catch (err) {
            console.log(err)
        }
    }


    async getAll() {
        try {
            // let dataArchivo = await fs.promises.writeFile(this.ruta, 'utf-8')
            let dataArchivo = await fs.promises.readFile (this.ruta, 'utf-8')

            //   let dataArchivoParse = JSON.parse(dataArchivo)
             let dataArchivoParse = JSON.parse(JSON.stringify(dataArchivo))
           return dataArchivoParse.length ? dataArchivoParse : console.log('no hay producto')


        } catch (err) {
            console.log(err)
        }
    }

    async deleteById(id) {
        try {
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchivoParse = JSON.parse(dataArchivo)
            let producto = dataArchivoParse.find(producto => producto.id === id)
            if (producto) {
                let dataArchivoParseFiltered = dataArchivoParse.filter(producto => producto.id !== producto.id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchivoParseFiltered, null, 2), 'utf-8')

                console.log('producto eliminado')
            } else {
                console.log('no se encontro el producto')
            }
        } catch (err) {
            console.log(err)
        }

    }

    async deleteAll() {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
    }

}
module.exports = Contenedor
