const express = require("express");
const router = express.Router();
const fs = require("fs");

// this serves the map :)
router.get("/", (req, res, next) => {
  res.render("index");
});

// this serves the airports json
router.get("/airportsData", (req, res) => {
  fs.readFile("../node_modules/airports/airports.json", "utf8", (err, airportsData) => {
    let output = JSON.parse(airportsData);

    output = output
      .filter(airport => airport.hasOwnProperty("lat"))
      .filter(airport => airport.type === "airport")
      .filter(airport => airport.size === "large")
      .map(airport => {
        return {
          lat: +airport.lat,
          lng: +airport.lon,
          name: airport.name
        };
      });

    output.splice(0, output.length - 100);

    res.json(output);
  });
});

module.exports = router;
