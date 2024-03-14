const frcData = 'https://es02.firstinspires.org/teams/_search?size=10000&from=0&source_content_type=application/json&source={%22query%22:{%22bool%22:{%22must%22:[{%22bool%22:{%22should%22:[{%22match%22:{%22team_type%22:%22FRC%22}}]}},{%22bool%22:{%22should%22:[{%22match%22:{%22fk_program_seasons%22:%22323%22}},{%22match%22:{%22fk_program_seasons%22:%22321%22}},{%22match%22:{%22fk_program_seasons%22:%22325%22}},{%22match%22:{%22fk_program_seasons%22:%22319%22}}]}},{%22match%22:{%22team_stateprov%22:%22ON%22}}]}},%22sort%22:%22team_nickname.raw%22}';

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyCEiwkrgPVXzWgpocua1AALsDM6TuccIn0",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
});

// Initialize and add the map
let map;

async function initMap() {
    console.log("ran")
  // Request needed libraries.
  //@ts-ignore
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: {lat:43.783157150228675, lng: -79.35170223018939},
    mapId: "DEMO_MAP_ID",
    mapTypeId: 'roadmap',
    clickableIcons: false,

  });
  navigator.geolocation.getCurrentPosition((p)=>{
    const pos = {
      lat: p.coords.latitude,
      lng: p.coords.longitude,
    }
    map.setCenter(pos);
  });
  const infoWindow = new InfoWindow();
  fetch(frcData, {method:'GET'})
  .then((r) => r.json())
  .then((j)=>{
      const arr = j['hits']['hits'].map((v)=>{
          const info = v['_source'];
          const dict = {
              name: info['team_nickname'],
              coords: {lat: info['location'][0]['lat'], lng:info['location'][0]['lon']},
              site: info['team_web_url'],
              number: info['team_number_yearly'],
              postalCode: info['team_postalcode'],
              rookYear: info['team_rookieyear'],
              city:info['team_city'],
          }
          return dict;
      })
      for(const team of arr){
        console.log(team);
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: team['coords'],
            title:team['name'],
          });
        marker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;
    
        infoWindow.close();
        infoWindow.setContent(`<h1 class="map-title">${team['number']} - ${team['name']}</h1><h2 class="map-info">${team['city']}, ${team['postalCode']}</h2>`);
        infoWindow.open(marker.map, marker);
        });
      }
  });

}

window.onload = initMap;