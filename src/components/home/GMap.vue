<template>
  <div class="map">
    <div class="gmap" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase";

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
        streetVieControl: false
      });
    }
  },
  mounted() {
    this.renderMap();
    console.log(firebase.auth().currentUser);
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

