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
    coords: [-33.829593384086664, 151.20772732653086],
    info: "Founding school connection."
  },
  {
    name: "North Sydney Girls High School",
    coords: [-33.83026989406617, 151.20329914259014],
    info: "Represented within NSTA."
  },
  {
    name: "Sydney Girls High School",
    coords: [-33.893699132210294, 151.2205958015759],
    info: "Represented within NSTA."
  },
  {
    name: "Sydney Technical High School",
    coords: [-33.96253203850645, 151.114550343767],
    info: "Represented within NSTA."
  },
  {
    name: "Epping Boys High School",
    coords: [-33.77015785892064, 151.09887606858683],
    info: "Represented within NSTA."
  },
  {
    name: "Homebush Boys High School",
    coords: [-33.866179369695004, 151.07722935059797],
    info: "Represented within NSTA."
  },
  {
    name: "James Ruse Agricultural High School",
    coords: [-33.781958447740145, 151.04216933741895],
    info: "Represented within NSTA."
  },
  {
    name: "Marcellin College Randwick",
    coords: [-33.91343013834256, 151.24112342559482],
    info: "Represented within NSTA."
  },
  {
    name: "Ryde Secondary College",
    coords: [-33.81354667882517, 151.11903875224294],
    info: "Represented within NSTA."
  },
  {
    name: "Mater Maria Catholic College",
    coords: [-33.683773372380095, 151.28449773966062],
    info: "Represented within NSTA."
  },
  {
    name: "Hurlstone Agricultural High School",
    coords: [-33.97006170029876, 150.89132099802706],
    info: "Represented within NSTA."
  },
  {
    name: "Cecil Hills High School",
    coords: [-33.97006170029876, 150.89132099802706],
    info: "Represented within NSTA."
  },
  {
    name: "William Carey Christian School",
    coords: [-33.94795747386239, 150.85098353714002],
    info: "Represented within NSTA."
  },
];

const perthSchools = [
  {
    name: "Perth Modern School",
    coords: [-31.9450098753986, 115.83844634056906],
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
