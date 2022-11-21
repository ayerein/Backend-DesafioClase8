let productosApi = require("../components/productos")

module.exports = app => {
    productosApi(app)
    app.get("/", (req, res, next) => {
        res.send("ok")
    })
}