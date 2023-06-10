<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" title="Successfully created new document"
        @click:close="closeWholeDialog"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to create new document" @click:close="closeWholeDialog"></v-alert>

    <v-sheet v-if="showForm" rounded color="green-lighten-5">
        <v-form v-model="valid" class="pa-6" ref="createDocumentForm">
            <v-text-field label="Document name" variant="underlined" :rules="valueRequired" v-model="documentName" />
            <v-text-field label="Document description" variant="underlined" :rules="valueRequired" v-model="documentDescription" /> 
            <v-combobox density="compact" variant="underlined" :items="this.templates" item-title="name" item-value="id"
                label="Select a template" v-model="selectedItem" :return-object="true" />
            <v-container class="d-flex justify-center">
                <v-btn type="submit" variant="tonal" @click.prevent="submit" :disabled="!valid">Upload</v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'document-create-form',
    emits: ['close-dialog'],
    data() {
        return {
            valueRequired: [
                value => !!value || 'Input is required',
            ],
            fileRequired: [
                file => !!file[0] || 'File is required' //currently only one template at a time, so [0] is ok
            ],
            valid: false, // initial value of form validation
            showForm: true,
            documentName: null,
            documentDescription: null,
            errorAlert: false,
            successAlert: false,
            selectedItem: [],

        }
    },
    computed: {
        ...mapGetters(['templates', 'selectedProject']),
    },
    mounted(){
        this.getTemplates();
    },
    methods: {
        ...mapActions(['getTemplates', 'createDocument']),

        async submit() {
            if (this.$refs.createDocumentForm.validate()) { // check form validity before submitting
                try{
                    await this.createDocument({
                        projectId: this.selectedProject.id,
                        templateId: this.selectedItem.id, 
                        documentName: this.documentName,
                        documentDescription: this.documentDescription
                    })
                    this.$refs.createDocumentForm.reset()
                    this.documentName = null;
                    this.documentDescription = null;
                    this.successAlert = true;
                    this.showForm = false;
                } catch (error) {
                    this.errorAlert = true;
                }
            }
        },

        closeWholeDialog() {
            this.successAlert = false;
            this.errorAlert = false;
            this.$emit('close-dialog');
        },
    }
}
</script>
