let {Router} = require("express")
let router = new Router()

/* const Container = require("../../context/context")
const Productos = new Container('./productos.txt') */

let Contenedor = require ('./context.js')

const productos = new Contenedor('productos.txt')


/* let agregarId = (req, res, next) => {
    req.body.id = prods.length +1    
    next()
} */


module.exports = app => {
    

    /* Traer todos los productos. */
    app.use("/api", router)
    router.get("/productos", async(req, res, next) => {
        let mostrarProductos = await productos.getAll()
        res.json(mostrarProductos)
    })


    /* Buscar producto por id. */
    app.use("/api", router)
    router.get("/productos/:id", async(req, res, next) => {
        let id = Number(req.params.id)
        let productoId = await productos.getById(id)
        res.json(productoId)
    })


    /* Agregar un nuevo producto. */
    app.use("/api", router)
    router.post("/productos", async(req, res, next) => {
        let productoNuevo = req.body

        if (productoNuevo) {
            await productos.save(productoNuevo)
            res.json({
                newProduct: productoNuevo
            })
        }
    })


    /* Actualizar un producto. */
    app.use("/api", router)
    router.put("/productos", async(req, res, next) => {
        let productoNuevo = await req.body
        await productos.updateById(productoNuevo)
        res.send('Producto Actualizado') 

        /* if (productoNuevo.id ) {
            await productos.save(productoNuevo)
            res.json({
                newProduct: productoNuevo
            })
        } */
    })


    /* Eliminar un producto por su id. */
    app.use("/api", router)
    router.delete("/productos/:id", async(req, res, next) => {
        let mostrarProductos = await productos.getAll()
        let id = Number(req.params.id)
        if (id <= mostrarProductos.length && id > 0){
            await productos.deleteById(id)
            res.send(`Se elimino correctamente el producto de id: ${id}`)
        } else {
            res.send('Por favor ingresa un Id válido.')
        }
    })

}