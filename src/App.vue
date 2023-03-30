<template>

  <v-card>
    <v-layout>
      <AppBar />
      <NavBar />
    </v-layout>
  </v-card>
  <div id="main-content" :style="{ marginLeft: mainContentMarginLeft }">
    <router-view />
  </div>
</template>
  

<script>
import NavBar from './components/NavBar.vue';
import AppBar from './components/AppBar.vue';

export default {
  data() {
    return {
      drawer: true,
    }
  },
  components: {
    AppBar,
    NavBar
  },
  computed: {
    mainContentMarginLeft() {
      return this.drawer ? '300px' : '72px';
    },
  },
}
</script>

<style>
#main-content {
  margin-top: 64px;
  /* Height of the top bar */
}</style>