// assets/js/map.js
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, что Leaflet загружен
  if (typeof L === 'undefined') {
    console.error('Leaflet library is not loaded');
    return;
  }

  // Инициализируем карту
  var map = L.map('map').setView([55.7558, 37.6176], 4);

  // Добавляем слой карты
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Стили для выделенных стран
  var highlightColor = {
    color: "#107403",
    weight: 2,
    fillOpacity: 0.6,
    fillColor: "#107403"
  };

  var highlightCountries = ["Russia", "Belarus", "Lithuania", "Poland", "Spain", "Italy", "Hungary", "Serbia"];

  // Добавляем данные стран
  fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          if (highlightCountries.includes(feature.properties.name)) {
            layer.setStyle(highlightColor);
            layer.bindPopup(feature.properties.name);
          }
        }
      }).addTo(map);
    })
    .catch(error => {
      console.error('Error loading map data:', error);
      // Добавляем маркеры как альтернативу
      var marker = L.marker([55.7558, 37.6176]).addTo(map);
      marker.bindPopup("Россия - основной рынок").openPopup();
    });
});
