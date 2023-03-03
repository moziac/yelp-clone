require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const restaurantRouter = require('./router/router.js')

const PORT = process.env.PORT || 8081

app.use('/api/v1/restaurants', restaurantRouter)

app.listen(PORT, () => console.log(`Im Alive on port: ${PORT}`))
