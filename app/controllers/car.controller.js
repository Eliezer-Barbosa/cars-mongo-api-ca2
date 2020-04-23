const db = require("../models");
const Car = db.cars;

// Create and Save a new car
exports.create = (req, res) => {
  // Validate request if the user try to add a car with fields empty
  if (!req.body.name || !req.body.price) {
    res.status(400).send({ message: "Car name and price has to be filled!" });
    return;
  }

  // Create a car object
  const car = new Car({
    name: req.body.name,
    make: req.body.make,
    year: req.body.year,
    color: req.body.color,
    price: req.body.price,
    available: req.body.available ? req.body.available : false
  });

  // Save car in the database
  car
    .save(car)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the car."
      });
    });
};

// Retrieve all cars from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Car.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      });
};

// Find a specific car with based on an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Car.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found car with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving car with id: " + id });
      });
};

// Update a car by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update car with id=${id}. This car was not found!`
            });
          } else res.send({ message: "car was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating car with id: " + id
          });
        });
};

// Delete a car with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Car.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete car with id=${id}. This car was not found!`
          });
        } else {
          res.send({
            message: "car was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete car with id: " + id
        });
      });
};

// Delete all cars from the database.
exports.deleteAll = (req, res) => {
    Car.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} cars were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cars."
      });
    });
};

// Find all available cars
exports.findAllAvailable = (req, res) => {
    Car.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
};