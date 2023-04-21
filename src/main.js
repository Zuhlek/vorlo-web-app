import { createApp } from 'vue';
import App from './App.vue'
import router from './router'; // Import the router
import store from './store'; // Import the Vuex store


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app')
