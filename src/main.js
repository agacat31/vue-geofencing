import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VSocket from 'vue-socket.io';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'GOOGLE_MAPS_KEY',
    libraries: 'geometry', // This is required if you use the Autocomplete
  },
});

Vue.use(
  new VSocket({
    debug: true,
    connection: 'http://localhost:4001',
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
