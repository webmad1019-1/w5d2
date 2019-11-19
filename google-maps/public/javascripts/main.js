// front end
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

let ironhackBCNData = {
  name: "Ironhack BCN",
  students: 222,
  bootcamps: 5
};

let uluru = { lat: -25.363, lng: 131.044 };

function startMap() {
  const theMap = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: uluru
  });

  interactWithTheMap(theMap);
  // infoWindowDisplay(theMap);
  // addMarkerWhereYouHaveClicked(theMap);
  // markersWithEvents(theMap);
  // showAirports(theMap);
  // displayMarkersRow(theMap);
}

function interactWithTheMap(theMap) {
  let asideDOMEl = document.querySelector("aside");
  let zurdo = false;

  asideDOMEl.innerHTML = `<p>Zurdo ${zurdo}</p><input type='range' min=1 max=15 id='zoom-level' placeholder='zoom level' /><button id="move-left">Move left</button><button id="move-right">Move right</button>`;
  asideDOMEl.style.left = 0;

  document.querySelector("#move-left").onclick = function() {
    theMap.panBy(500 * (zurdo ? -1 : 1), 0);
  };

  document.querySelector("#move-right").onclick = function() {
    theMap.panBy(-500 * (zurdo ? -1 : 1), 0);
  };

  document.querySelector("#zoom-level").onchange = function() {
    theMap.setZoom(+this.value);
  };
}

function infoWindowDisplay(theMap) {
  var contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<img height='100' src='https://australianaviation.com.au/wp-content/uploads/2019/07/Uluru_from_the_air_1170.jpg'><p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: theMap,
    title: "Uluru (Ayers Rock)"
  });

  marker.addListener("click", function() {
    infowindow.open(map, marker);
  });
}

function addMarkerWhereYouHaveClicked(theMap) {
  theMap.addListener("click", function(e) {
    let marker = new google.maps.Marker({
      position: e.latLng,
      // position: {
      //   lat: e.latLng.lat(),
      //   lng: e.latLng.lng()
      // },
      map: theMap,
      draggable: true,
      icon: "images/doge.png",
      title: "Marker where you have clicked"
    });
  });
}

function markersWithEvents(theMap) {
  function showBootcampData() {
    const asideDOMEl = document.querySelector("aside");

    asideDOMEl.innerHTML = `
      <button id='close-button'>X</button>
      <h1>Place</h1>
      <p>${ironhackBCNData.name}</p>
      <p>Students: ${ironhackBCNData.students}</p>
      <p>Total bootcamps: ${ironhackBCNData.bootcamps}</p>
    `;

    asideDOMEl.style.left = 0;

    document.querySelector("#close-button").onclick = function() {
      document.querySelector("aside").style.left = "-30vw";
    };
  }

  let marker = new google.maps.Marker({
    position: {
      lat: 41.3977381,
      lng: 2.190471916
    },
    map: theMap,
    title: "Marker with events"
  });

  marker.addListener("click", showBootcampData);
}

function displayMarkersRow(theMap) {
  Array(360)
    .fill()
    .forEach((_, idx) => {
      new google.maps.Marker({
        position: {
          lat: 41.3977381 + Math.cos((idx * 2 * Math.PI) / 180),
          lng: 2.190471916 + idx / 20
        },
        map: theMap,
        title: "Testing a line of markers, marker #" + idx,
        draggable: true
      });
    });
}

function showAirports(theMap) {
  axios.get("http://localhost:3000/airportsData").then(allAirports => {
    allAirports.data.forEach(airport => {
      setTimeout(() => {
        new google.maps.Marker({
          position: { lat: airport.lat, lng: airport.lng },
          map: theMap,
          title: airport.name,
          animation: google.maps.Animation.DROP,
          draggable: true
        });
      }, randomFloat(0.25, 1.25) * 1000);
    });
  });
}

startMap();
