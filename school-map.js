const sydneyMap = L.map("sydney-map", {
  zoomControl: true,
  scrollWheelZoom: false
}).setView([-33.86, 151.15], 10);

const perthMap = L.map("perth-map", {
  zoomControl: false,
  attributionControl: false,
  scrollWheelZoom: false,
  dragging: false
}).setView([-31.948, 115.823], 12);

const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

L.tileLayer(darkTiles, {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains: "abcd",
  maxZoom: 20
}).addTo(sydneyMap);

L.tileLayer(darkTiles, {
  subdomains: "abcd",
  maxZoom: 20
}).addTo(perthMap);

const goldIcon = L.divIcon({
  className: "school-marker",
  html: "<span></span>",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10]
});

const sydneySchools = [
  {
    name: "North Sydney Boys High School",
    coords: [-33.82433, 151.20450],
    info: "Founding school connection."
  },
  {
    name: "North Sydney Girls High School",
    coords: [-33.82225, 151.20065],
    info: "Represented within NSTA."
  },
  {
    name: "Sydney Girls High School",
    coords: [-33.89285, 151.22305],
    info: "Represented within NSTA."
  },
  {
    name: "Sydney Technical High School",
    coords: [-33.96470, 151.11890],
    info: "Represented within NSTA."
  },
  {
    name: "Epping Boys High School",
    coords: [-33.75820, 151.08410],
    info: "Represented within NSTA."
  },
  {
    name: "Homebush Boys High School",
    coords: [-33.86710, 151.08620],
    info: "Represented within NSTA."
  },
  {
    name: "James Ruse Agricultural High School",
    coords: [-33.77860, 151.04430],
    info: "Represented within NSTA."
  },
  {
    name: "Marcellin College Randwick",
    coords: [-33.91400, 151.24200],
    info: "Represented within NSTA."
  },
  {
    name: "Ryde Secondary College",
    coords: [-33.81120, 151.11160],
    info: "Represented within NSTA."
  },
  {
    name: "Mater Maria Catholic College",
    coords: [-33.68430, 151.30410],
    info: "Represented within NSTA."
  }
];

const perthSchools = [
  {
    name: "Perth Modern School",
    coords: [-31.94650, 115.83920],
    info: "Represented within NSTA. Western Australia."
  }
];

function addSchoolMarker(map, school) {
  const marker = L.marker(school.coords, { icon: goldIcon }).addTo(map);

  marker.bindPopup(`
    <strong>${school.name}</strong><br>
    <span>${school.info}</span>
  `);

  marker.on("mouseover", function () {
    this.openPopup();
  });

  marker.on("mouseout", function () {
    this.closePopup();
  });

  marker.on("click", function () {
    this.openPopup();
  });
}

const bounds = L.latLngBounds();

sydneySchools.forEach(school => {
  addSchoolMarker(sydneyMap, school);
  bounds.extend(school.coords);
});

perthSchools.forEach(school => {
  addSchoolMarker(perthMap, school);
});

sydneyMap.fitBounds(bounds, {
  padding: [40, 40]
});
