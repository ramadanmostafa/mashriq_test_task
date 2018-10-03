/**
 * Created by pc on 7/12/2017.
 */


var FirebaseOperations = function (token, user_id) {
    const config = {
        apiKey: "AIzaSyBPo_6MnqQPUYRL9-Bcr43SttT8AMi6zHU",
        authDomain: "shaifak-business.firebaseapp.com",
        databaseURL: "https://shaifak-business.firebaseio.com",
        projectId: "shaifak-business",
        storageBucket: "shaifak-business.appspot.com",
        messagingSenderId: "819833577979"
    };
    firebase.initializeApp(config);

    //authenticate
    firebase
        .auth()
        .signInWithCustomToken(token)
        .catch(function(error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        }
    );

    this.driver_ref = firebase.database().ref('users/' + user_id + '/drivers/');
};

FirebaseOperations.prototype.listen_for_all_drivers = function () {
     this.driver_ref
        .on(
            'value',
            function(snapshot) {
                DataParser.parse_drivers_data(snapshot, false);
            }
        );
};

FirebaseOperations.prototype.get_drivers_locations = function () {
    return this.driver_ref.once('value').then(function(snapshot) {
        DataParser.parse_drivers_data(snapshot, true);
    });
};

FirebaseOperations.prototype.update_status = function (user_id, driver_id, status) {
    var ref = firebase.database().ref('users/' + user_id + '/drivers/' + driver_id + '/');
    ref.update(
        {
            "status": status
        }
    );
};

FirebaseOperations.prototype.write_locations = function (lat, long, user_id, driver_id) {
    var ref = firebase.database().ref('users/' + user_id + '/drivers/' + driver_id + '/last_location/');
    ref.update({
        lat: lat,
        long: long,
        time : Math.floor(Date.now())
      });
};
