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

function job_click(a){
  console.log(a)
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
