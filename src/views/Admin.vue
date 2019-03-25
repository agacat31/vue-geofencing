<template>
  <section>
    <Header/>
    <div class="main">
      <h3>Admin</h3>
      <GmapMap :center="center" :zoom="zoom" map-type-id="terrain" style="width: 600px; height: 400px" ref="mapRef">
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
        <GmapPolygon :paths="polygon"/>
      </GmapMap>
      <h4>Location Alerts</h4>
      <div class="alert" v-if="showAlert">
        <p>This user has left the ranch</p>
      </div>

      <div class="location alert" v-if="showLocationUpdate">
        <p>{{message}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "@/components/Header";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "Admin",
  components: {
    Header
  },
  data() {
    return {
      message: "",
      theRanchPolygon: {},
      showAlert: false,
      showLocationUpdate: false,
      zoom: 16,
      center: {
        lat: 6.435838,
        lng: 3.451384
      },
      polygon: [
        { lat: 6.436914, lng: 3.451432 },
        { lat: 6.436019, lng: 3.450917 },
        { lat: 6.436584, lng: 3.450917 },
        { lat: 6.435006, lng: 3.450928 },
        { lat: 6.434953, lng: 3.451808 },
        { lat: 6.435251, lng: 3.451765 },
        { lat: 6.435262, lng: 3.451969 },
        { lat: 6.435518, lng: 3.451958 }
      ]
    };
  },
  sockets: {
    connect() {},
    ping(position) {
      console.log(position)
      this.center = {
        ...position
      };
      const latLng = new this.google.maps.LatLng(position);
      this.showLocationUpdate = true;
      this.message = "The user's location has changed";
      if (
        !this.google.maps.geometry.poly.containsLocation(
          latLng,
          this.theRanchPolygon
        )
      ) {
        this.showAlert = true;
      } else {
        this.message = "The user is currently in the ranch";
      }
    }
  },
  computed: {
    google: gmapApi
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.theRanchPolygon = new this.google.maps.Polygon({
        paths: this.polygon
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  h3 {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  .alert {
    background: #f14343;
    color: white;
    padding: 15px;
    border-radius: 5px;
    p {
      margin: 0;
    }
  }

  .location {
    background: green;
    margin-top: 20px;
  }
}
</style>
