const sydneyMap = L.map("sydney-map", {
  zoomControl: true,
  scrollWheelZoom: false
}).setView([-33.86, 151.16], 10);

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
    coords: [-33.8206, 151.2046],
    info: "Represented school. Founding school connection."
  },
  {
    name: "North Sydney Girls High School",
    coords: [-33.8310, 151.2077],
    info: "Represented school."
  },
  {
    name: "Sydney Girls High School",
    coords: [-33.8952, 151.2237],
    info: "Represented school."
  },
  {
    name: "Sydney Technical High School",
    coords: [-33.9721, 151.1219],
    info: "Represented school."
  },
  {
    name: "Epping Boys High School",
    coords: [-33.7728, 151.0765],
    info: "Represented school."
  },
  {
    name: "Homebush Boys High School",
    coords: [-33.8684, 151.0879],
    info: "Represented school."
  },
  {
    name: "James Ruse Agricultural High School",
    coords: [-33.7793, 151.0411],
    info: "Represented school."
  },
  {
    name: "Marcellin College Randwick",
    coords: [-33.9142, 151.2414],
    info: "Represented school."
  },
  {
    name: "Ryde Secondary College",
    coords: [-33.8105, 151.1069],
    info: "Represented school."
  },
  {
    name: "Mater Maria Catholic College",
    coords: [-33.6816, 151.3039],
    info: "Represented school."
  }
];

const perthSchools = [
  {
    name: "Perth Modern School",
    coords: [-31.9481, 115.8232],
    info: "Represented school in Western Australia."
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

sydneySchools.forEach(school => addSchoolMarker(sydneyMap, school));
perthSchools.forEach(school => addSchoolMarker(perthMap, school));
