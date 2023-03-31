<template>
  <div class="pa-6">
    <h1>Create a new template</h1>
    <br>
    <FileUpload />
    <v-divider class="my-12"></v-divider>
    <TemplateList />
  </div>
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
  