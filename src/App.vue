<template>
  <v-app>
    <NavBar v-if="this.$route.meta.layout !== 'empty'" />
    <AppBar v-if="this.$route.meta.layout !== 'empty'" />
    <v-main>
      <router-view />        
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/shared/NavBar.vue';
import AppBar from './components/shared/AppBar.vue';



export default {
  components: {
    AppBar,
    NavBar,
  }
}
</script>