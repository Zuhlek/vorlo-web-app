<template>
  <div class="pa-6">
    <h1>Create a new template</h1>
    <br>
    <TemplateUploadForm />
  </div>
</template>
  
<script>
import TemplateUploadForm from '@/components/TemplateUploadForm.vue';

export default {
  name: "templates-creation-view",
  components: {
    TemplateUploadForm
  }
};
</script>
  