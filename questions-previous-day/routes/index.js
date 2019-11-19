const express = require("express");
const router = express.Router();

const Airports = require("../models/Airports");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/naranjo", (req, res, next) => {
  let UKAirport;

  Airports.find({ name: "London Heathrow" })
    .then(UKAirportPayload => {
      UKAirport = UKAirportPayload;
      return Airports.find().limit(1);
    })
    .then(airportPayload => {
      res.render("naranjo", {
        molon: "Fran, te sales",
        islands: ["Lanzarote", "Tenerife", "La Gomera..."],
        airport: airportPayload,
        UKAirport: UKAirport
      });
    });
});

router.get("/createNewAirport", (req, res, next) => {
  Airports.create({
    name: "London Heathrow",
    country: "UK",
    location: "London",
    creation: 1996
  }).then(airportAdded => {
    res.json(airportAdded);
  });
});

router.post("/createNewAirportViaPostman", (req, res) => {
  Airports.create({
    name: req.body.name,
    country: req.body.country,
    location: req.body.location,
    creation: req.body.creation
  }).then(airportAdded => res.json(airportAdded));
});

router.delete("/airport/:airportID", (req, res) => {
  Airports.findByIdAndDelete(req.params.airportID).then(airportDeleted =>
    res.json({
      deleted: true,
      timestamp: new Date(),
      airportDeleted
    })
  );
});

module.exports = router;
