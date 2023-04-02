<template>
    <div class="pa-6">
      <h1>Manage existing templates</h1>
      <br>
      <TemplateList />
    </div>
  </template>
    
  <script>
  import TemplateList from '@/components/TemplateList.vue';
  
  export default {
    name: "templates-management-view",
    components: {
      TemplateList
    }
  };
  </script>
    