const express = require('express')
const restaurantRouter = express.Router()
const db = require('../db/index')
const { newRestaurant, getAllRestaurants, getRestaurantById, updateRestaurantById, deleteRestaurantById } = require('../db/queries/restaurantQueries')

restaurantRouter.get('/', async (req, res) => {
  try {
    const data = await db.query(getAllRestaurants)
    if (!data) throw new Error({ message: "Could not fetch data." })
    res.status(200).send({
      status: "success",
      data: {
        restaurants: data.rows
      }
    })

  } catch (error) {
    res.status(500).send({
      status: 'error',
      data: {
        message: error.message
      }
    })
  }
})

restaurantRouter.get('/:id', async (req, res) => {
  try {
    const data = await db.query(getRestaurantById, [req.params.id])
    if (!data.rows[0]) throw new Error("No Restaurant with that ID.")
    res.status(200).send({
      message: "success",
      data: data.rows[0]
    })
  } catch (error) {
    res.status(400).send({
      status: 'error',
      data: {
        message: error.message
      }
    })
  }
})

restaurantRouter.post('/', async (req, res) => {
  const { name, location, price_range } = req.body
  try {
    const data = await db.query(newRestaurant, [name, location, price_range])
    if (!data.rows[0]) throw new Error("Data not stored please try again.")
    res.status(202).send({
      status: "success",
      data: {
        restaurant: data.rows[0]
      }
    })

  } catch (error) {
    res.status(400).send({
      status: "error",
      data: {
        message: error
      }
    })
  }
})

restaurantRouter.patch('/:id', async (req, res) => {
  const { name, location, price_range } = req.body
  try {
    const data = await db.query(updateRestaurantById, [name, location, price_range, req.params.id])
    if (!data.rows[0]) throw new Error("No Restaurant with that ID.")
    res.status(202).send({
      status: "success",
      data: {
        restaurant: data.rows
      }
    })
  } catch (error) {
    res.status(400).send({
      status: "error",
      data: {
        message: error
      }
    })
  }
})

restaurantRouter.delete('/:id', async (req, res) => {
  try {
    const data = await db.query(deleteRestaurantById, [req.params.id])
    res.status(204).send({
      status: "success"
    })
  } catch (error) {

  }
})


module.exports = restaurantRouter
