<template>
  <div class="map">
    <div class="gmap" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "GMap",
  data() {
    return {
      lat: 40,
      lng: -74
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 7,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      db.collection("users")
        .get()
        .then(users => {
          users.docs.forEach(doc => {
            let data = doc.data();
            if (data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map: map
              });
              marker.addListener("click", () => {
                console.log(doc.id);
              });
            }
          });
        });
    }
  },
  mounted() {
    // get current user
    let user = firebase.auth().currentUser;

    // get user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;

          // find user record and update geolocation
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: this.lat,
                      lng: this.lng
                    }
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      this.renderMap();
    }
  }
};
</script>

<style>
.gmap {
  width: 100%;
  height: 100%;
  background: gray;
  position: absolute;
  margin: 0 auto;
  left: 0px;
  top: 0px;
  z-index: -1;
}
</style>

