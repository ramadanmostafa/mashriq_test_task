/**
 * Created by pc on 7/12/2017.
 */

var DataParser = function () {

};

DataParser.parse_drivers_data = function (snapshot, fitBounds) {
    var markers_group = [];
    // alert("OK?");
    snapshot.forEach(
        function(childSnapshot) {
            var driver_id = childSnapshot.key;
            var current_location = childSnapshot.val();
            var driver_lat = current_location.last_location.lat;
            var driver_long = current_location.last_location.long;
            var driver_time = current_location.last_location.time;

            update_marker(driver_id, driver_lat, driver_long, driver_time, markers_group);
            // if(driver_id in markers){
            //     markers[driver_id].setLatLng([driver_lat, driver_long]).update().bindPopup(driver_time.toString());
            // } else {
            //     markers[driver_id] = L.marker([driver_lat, driver_long], {title: "carname", draggable: false, riseOnHover:true, icon:greenIcon}).bindPopup(driver_time.toString());
            //     markers[driver_id].addTo(map);
            // }
            // markers_group.push(markers[driver_id]);

        }
    );

    if(fitBounds) {
        var group = new L.featureGroup(markers_group);
        map.fitBounds(group.getBounds());
    }
};