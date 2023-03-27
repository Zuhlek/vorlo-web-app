<template>
    <div>
      <h1>Templates</h1>
      <p>Word files only!</p>
      <br>
      <FileUpload/>
    </div>
  </template>
  
  <script>
    import FileUpload from '@/components/FileUpload.vue';

    export default {
      name: "templates-view",
      components: {
        FileUpload
      }
    };
  </script>
  