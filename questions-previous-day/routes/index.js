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

module.exports = router;
