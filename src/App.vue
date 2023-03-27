<template>
    <Navbar />
    <div id="main-content">
      <router-view />
    </div>
  </template>
  

<script>
    import Navbar from './components/Navbar.vue';

    export default {
        components: {
            Navbar
        }
    }
</script>

<style>
#main-content {
  margin-top: 64px; /* Height of the top bar */
  margin-left: 300px; /* Width of the side nav */
  padding: 16px; /* Optional padding */
}
</style>