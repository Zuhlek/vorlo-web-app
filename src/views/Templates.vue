<template>
  <div class="pa-6">
    <h1>Create a new template</h1>
    <br>
    <TemplateUploadForm />
    <v-divider class="my-12"></v-divider>
    <TemplateList />
  </div>
</template>
  
<script>
import TemplateUploadForm from '@/components/TemplateUploadForm.vue';
import TemplateList from '@/components/TemplateList.vue';

export default {
  name: "templates-view",
  components: {
    TemplateUploadForm,
    TemplateList
  }
};
</script>
  