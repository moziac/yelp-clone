module.exports = {
  getAllRestaurants: {
    text: "SELECT * FROM restaurants;"
  },
  getRestaurantById: {
    text: "SELECT * FROM restaurants WHERE id = $1"
  },
  newRestaurant: {
    text: (`
        INSERT INTO restaurants 
        (name, location, price_range)
        values($1,$2,$3)
        RETURNING id,name,location,price_range
  `)
  },
  updateRestaurantById: {
    text: (`
UPDATE restaurants SET
(name, location, price_range) =
($1, $2, $3)
WHERE id = $4
RETURNING *;
`)
  },

  deleteRestaurantById: {
    text: (`
DELETE FROM restaurants
WHERE
id = $1;
`)
  }
}
