/**
 * Created by pc on 7/12/2017.
 */
function init_map() {
    console.log("INIT MAP");
    var map = L.map('leafletMap').setView([31, 31], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // create a fullscreen button and add it to the map
    L.control.fullscreen({
      position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
      title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
      titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
      content: null, // change the content of the button, can be HTML, default null
      forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
      forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
      fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    }).addTo(map);

    // events are fired when entering or exiting fullscreen.
    map.on('enterFullscreen', function(){
      console.log('entered fullscreen');
      document.getElementById("leafletMap").style.zIndex = 9999;
    });

    map.on('exitFullscreen', function(){
      console.log('exited fullscreen');
      document.getElementById("leafletMap").style.zIndex = 1;
    });
    return map;
}

function update_marker(driver_id, driver_lat, driver_long, driver_time, markers_group) {
    var driver_index = $.inArray(driver_id, drivers_ids);
    if (driver_index >= 0) {
        //console.log("ACCEPTED", driver_id);

        if (driver_id in markers) {
            markers[driver_id].moveTo([driver_lat, driver_long], 300);
            //markers[driver_id].setLatLng([driver_lat, driver_long]).update().bindPopup(driver_time.toString());
        } else {
            var vehicleIcon = new L.Icon(
                {
                    iconUrl: drivers_data[driver_index].vehicle_icon,
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                }
            );
            var marker_tmp = L.Marker.movingMarker(
                [
                    [
                        driver_lat,
                        driver_long
                    ], [
                        driver_lat,
                        driver_long
                    ]
                ],
                [0],
                {
                    title: "carname",
                    draggable: false,
                    riseOnHover: true,
                    icon: vehicleIcon
                }
            ).bindPopup(
                //driver_time.toString()
                "<strong>Driver Name</strong>:" + drivers_data[driver_index].driver_name + "<br>" + "<strong>Vehicle Name</strong>:" + drivers_data[driver_index].vehicle_name
            );


            marker_tmp.on("dblclick", function () {
                map.panTo(new L.LatLng(driver_lat, driver_long));
                console.log ("doubleclick");
                // TODO go to another page to track this driver only
            });

            markers[driver_id] = marker_tmp;
            markers[driver_id].addTo(map);
            var group = new L.featureGroup(markers_group);
            map.fitBounds(group.getBounds());
        }
        markers_group.push(markers[driver_id]);
    } //else {
        //console.log("REJECTED", driver_id);
    //}
}