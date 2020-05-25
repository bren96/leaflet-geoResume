document.getElementById("resume").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

function job_click(){
  document.getElementById('mapid').scrollIntoView();
};

var resume_map = L.map('mapid').setView([51.505, -0.09], 13);

var mapbox_tolken = 'pk.eyJ1IjoiYnJlbjk2IiwiYSI6ImNqc2pkNGRvdTA0bm80OW9hOTIxNzB6NG0ifQ.tDovHyl1gFWQ96O3pok0Qg';

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapbox_tolken
}).addTo(resume_map);

function generate_popup(feature, layer){
  var title = "<h1>" + feature.properties.position + "</h1>";
  var sub_title = "<h2>" + feature.properties.employer + "</h2>";
  var body = "<p>" + feature.properties.responsibilities + "</p>";
  layer.bindPopup(title + sub_title + body)
}

var points = L.geoJSON(resumeData,{
  onEachFeature: generate_popup
}).addTo(resume_map);

function job_click(a){
  var b = points.getLayers();
  var lat = b[a].feature.geometry.coordinates[1];
  var long = b[a].feature.geometry.coordinates[0];
  resume_map.setView([lat,long],17);
  b[a].openPopup();
  document.getElementById("mapid").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
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
