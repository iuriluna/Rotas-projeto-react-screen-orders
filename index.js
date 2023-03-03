const express = require('express')
const uuid = require('uuid')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(cors())


const port = process.env.PORT || 3001

const orders = []



app.get('/orders', (request, response) => {
    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, name } = request.body

    const newOrder = { id: uuid.v4(), order, name }

    orders.push(newOrder)

    return response.status(201).json(newOrder)
})

app.put('/orders/:id', (request, response) => {
    const { id } = request.params
    const { name, order } = request.body

    const updateOrder = { id, name, order }

    const index = orders.findIndex(order => order.id === id)


    if (index < 0) {
        return response.status(404).json({message: "order not found"})
    }

    orders[index] = updateOrder

    return response.json(updateOrder)
})

app.delete('/orders/:id', (request, response) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({message: "order not found"})
    }

    orders.splice(index, 1)

    return response.status(204).json(orders)
})

app.listen(port)