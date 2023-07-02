<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" :title="isUpdateMode
        ? 'Successfully updated template'
        : 'Successfully created new template'
        " @click:close="closeWholeDialog"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error" :title="isUpdateMode
        ? 'Encountered an error when trying to update template'
        : 'Encountered an error when trying to create new template'
        " @click:close="closeWholeDialog"></v-alert>

    <v-sheet v-if="showForm" rounded color="green-lighten-5">
        <v-form v-model="valid" class="pa-6" ref="templateForm">
            <div v-if="!isUpdateMode">
                <v-text-field label="Template name" variant="solo" :rules="valueRequired" v-model="templateName" />
                <v-text-field label="Template description" variant="solo" :rules="valueRequired"
                    v-model="templateDescription" />
                <v-file-input label="Select template from files" variant="solo"
                    accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    show-size :rules="fileRequired" @change="onFileSelected">
                </v-file-input>
                <v-container class="d-flex justify-center">
                    <v-btn type="submit" variant="tonal" @click.prevent="submitForm" :disabled="!valid">create
                        template</v-btn>
                </v-container>
            </div>
            <div v-else>
                <v-text-field label="Template name" variant="solo" v-model="templateName" :placeholder="templateName" />
                <v-text-field label="Template description" variant="solo" v-model="templateDescription"
                    :placeholder="templateDescription" />
                <v-file-input :label="templateFileName || 'Select template from files'" variant="solo"
                    accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    show-size @change="onFileSelected" :placeholder="templateFileName">
                </v-file-input>
                <v-container class="d-flex justify-center">
                    <v-btn variant="tonal" @click.prevent="submitForm">Update
                    </v-btn>
                </v-container>
            </div>

        </v-form>
    </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "template-form",
    emits: ["close-dialog"],
    props: {
        templateId: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            valueRequired: [(value) => !!value || "Input is required"],
            fileRequired: [
                (file) => !!file[0] || "File is required", //currently only one template at a time, so [0] is ok
            ],
            valid: false, // initial value of form validation
            showForm: true,
            templateFile: null,
            templateName: null,
            templateDescription: null,
            templateType: "GENERIC",
            errorAlert: false,
            successAlert: false,
            templateFileName: null,
        };
    },
    computed: {
        ...mapGetters(["templates", "selectedTemplate"]),
        isUpdateMode() {
            return !!this.templateId;
        },
    },
    async mounted() {
        if (this.isUpdateMode) {
            try {
                this.templateName = this.selectedTemplate.name;
                this.templateDescription = this.selectedTemplate.description;
                this.templateFileName = this.selectedTemplate.filePath.split("/")[1];
            } catch (error) {
                console.error("Error getting template metadata:", error);
            }
        }
    },
    methods: {
        ...mapActions(["createTemplate", "updateTemplate"]),
        onFileSelected(event) {
            this.templateFile = event.target.files[0];
        },
        async submitForm() {
            if (this.$refs.templateForm.validate()) {
                try {
                    const template = {
                        templateFile: this.templateFile,
                        templateName: this.templateName,
                        templateDescription: this.templateDescription,
                        templateType: this.templateType,
                    };
                    if (this.isUpdateMode) {
                        template.templateId = this.templateId;
                        await this.updateTemplate(template);
                    } else {
                        await this.createTemplate(template);
                    }
                    this.$refs.templateForm.reset();
                    this.templateFile = null;
                    this.templateName = null;
                    this.templateDescription = null;
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
            this.$emit("close-dialog");
        },
    },
};
</script>
