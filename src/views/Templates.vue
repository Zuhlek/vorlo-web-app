<template>

      <h1>Templates</h1>
      <p>Word files only!</p>
      <br>
      <FileUpload/>
      <TemplateList/>

  </template>
  
  <script>
    import FileUpload from '@/components/FileUpload.vue';
    import TemplateList from '@/components/TemplateList.vue';

    export default {
      name: "templates-view",
      components: {
        FileUpload,
        TemplateList
      }
    };
  </script>
  