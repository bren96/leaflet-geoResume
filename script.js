function job_click(){
  document.getElementById('mapid').scrollIntoView();
};

var resume_map = L.map('mapid').setView([0,0],8);

var mapbox_token = 'pk.eyJ1IjoiYnJlbjk2IiwiYSI6ImNqc2pkNGRvdTA0bm80OW9hOTIxNzB6NG0ifQ.tDovHyl1gFWQ96O3pok0Qg';
var mapbox_style = 'https://api.mapbox.com/styles/v1/bren96/{id}/tiles/256/{z}/{x}/{y}@2x?access_token={access_token}'

L.tileLayer(mapbox_style, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'ckaofh5j60z7f1iqpba652b1r',
  tileSize: 512,
  zoomOffset: -1,
  access_token: mapbox_token
}).addTo(resume_map);

// create scroll button control
function scroll_to_resume(){
  document.getElementById('resume').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
};
var scroll_up = L.control({position:'topright'});
scroll_up.onAdd = function () {
    var div = L.DomUtil.create('div','scroll_up');
    div.innerHTML = "<i onclick='scroll_to_resume()' class='mdi mdi-arrow-up'></i>";
    div.addEventListener('click',document.getElementById("resume").scrollIntoView({behavior: "smooth", block: "center", inline: "center"}))
    return div;
};
scroll_up.addTo(resume_map);


//create popups
function generate_popup(feature, layer){
  var title = "<h1>" + feature.properties.position + "</h1>";
  var sub_title = "<h2>" + feature.properties.employer + "</h2>";
  var period = "<h3>" + feature.properties.period + "</h3>";
  var body = "<p>" + feature.properties.responsibilities + "</p>";
  layer.bindPopup(title + sub_title + period + body);
}

// add job points
var points = L.geoJSON(resumeData,{
  onEachFeature: generate_popup,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:var(--primary-color)' class='marker-pin'></div><i class='mdi mdi-compass'></i>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      })
    })
  },
}).addTo(resume_map);
resume_map.fitBounds(points.getBounds());

// on click a button in the resume section
function job_click(a){
  resume_map.closePopup();
  var b = points.getLayers();
  var lat = b[a].feature.geometry.coordinates[1] + 0.02;
  var long = b[a].feature.geometry.coordinates[0];
  var lat_long = [lat,long];
  var current_lat_long = resume_map.getCenter();
  var dist_diff = Math.abs(long - current_lat_long.lng);
  if ( dist_diff <= 0.1) {
    resume_map.flyTo(lat_long, 13, {
      animate: true,
      duration: 0.5,
    });
    setTimeout(function() {b[a].openPopup()}, 500);
  } else {
    resume_map.flyTo(lat_long, 13, {
      animate:true,
      duration: 3,
    });
    setTimeout(function() {b[a].openPopup()}, 3000);
  }
  // resume_map.setView(lat_long,14);
  document.getElementById("mapid").scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
};

// For each item in resumeData, create button in sidebar
button_area = document.getElementById("button_div");
for (var a in resumeData){
  var new_button = document.createElement("BUTTON")
  new_button.type = "button";
  new_button.className = "job-button";
  new_button.setAttribute("onclick", "job_click(" + a + ")")
  new_button.innerHTML = resumeData[a].properties.position;
  button_area.appendChild(new_button);
};

document.getElementById("resume").scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
