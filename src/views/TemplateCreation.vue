<template>
  <div class="pa-6">
    <h1>Create a new template</h1>
    <br>
    <TemplateCreationForm />
  </div>
</template>
  
<script>
import TemplateCreationForm from '@/components/TemplateCreationForm.vue';

export default {
  name: "templates-creation-view",
  components: {
    TemplateCreationForm
  }
};
</script>
  