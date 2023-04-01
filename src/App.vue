<template>
  <v-app id="inspire">
    <NavBar />
    <AppBar />
    <v-main>
      <router-view />        
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AppBar from './components/AppBar.vue';

export default {
  components: {
    AppBar,
    NavBar
  }
}
</script>