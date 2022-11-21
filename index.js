const express = require('express')
const app = express()
const PORT = 3001
let serverRoutes = require("./routes")

app.use(express.static('html'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

serverRoutes(app)

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))