let fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    async save(obj){
        let traerProductos = await this.getAll() 
        try {
            if (traerProductos.length === 0) {
                const productos = []
                obj.id = 1
                productos.push(obj)
                console.log(`Producto agregado! Id del producto: ${obj.id}`)
                return await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2))
            } else {
                let agregarProductos = JSON.parse(traerProductos)
                obj.id = agregarProductos.length + 1
                agregarProductos.push(obj)
                console.log(`Producto agregado! Id del producto: ${obj.id}`)
                return await fs.promises.writeFile(this.archivo, JSON.stringify(agregarProductos, null, 2))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        let traerProductos = await this.getAll()
        try {
            let producto = traerProductos.find(obj => obj.id === id)
            if (producto) {
                return producto
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            let productosTodos = await fs.promises.readFile(this.archivo, 'utf-8')
            return productosTodos
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        let traerProductos = await this.getAll()
        try {
            let nuevoArray = JSON.parse(traerProductos).filter(obj => obj.id != id)
            return await fs.promises.writeFile(this.archivo, JSON.stringify(nuevoArray, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(obj){
        let traerProductos = await this.getAll()
        let productos = JSON.parse(traerProductos)
        console.log(productos)
        let index = productos.map(producto => producto.id).indexOf(Number(obj.id))
        if (index >= 0){
            try {
                let nuevoArray = await this.deleteById(index +1)
                let nuevoAgregar = await JSON.parse(nuevoArray).push(obj)
                console.log(nuevoArray)
                console.log(`Producto actualizado! Id del producto: ${obj.id}`)
                return await fs.promises.writeFile(this.archivo, JSON.stringify(nuevoAgregar, null, 2))   
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = Contenedor