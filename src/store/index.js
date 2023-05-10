import { createStore } from "vuex";
import templateService from "./services/templateService";

const store = createStore({
  state: {
    selectedProjectId: null,
    selectedProject: null,
    projectWasSelected: false,

    templates: [],
    downloadedTemplate: null,
  },
  mutations: {
    setTemplates(state, templates) {
      state.templates = templates;
    },
    setDownloadedTemplate(state, { data, headers }) {
      state.downloadedTemplate = { data, headers };
    },
  },
  actions: {

    async fetchTemplates({ commit }) {
      try {
        const response = await templateService.getTemplates();
        const filteredTemplates = response.data.data.templates.filter(
          template => template.vorloProjectId === 0);
        commit('setTemplates', filteredTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    },
    async deleteTemplate({ dispatch }, templateId) {
      try {
        await templateService.deleteTemplate(templateId);
        dispatch('fetchTemplates');
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    },
    async downloadTemplate({ commit }, templateId) {
      try {
        const response = await templateService.downloadTemplate(templateId);
        commit('setDownloadedTemplate', { data: response.data, headers: response.headers });
      } catch (error) {
        console.error('Error downloading template:', error);
      }
    },
    async updateTemplate({ dispatch }, { templateId, templateFile, templateName, templateDescription }) {
      try {
        const res = await templateService.updateTemplate({ templateId, templateFile, templateName, templateDescription });
        dispatch('getTemplates');
        return res;
      } catch (error) {
        console.error('Error updating template:', error);
      }
    },
    async createTemplate({ dispatch }, { templateFile, templateName, templateDescription }) {
      try {
        const res = await templateService.createTemplate(templateFile, templateName, templateDescription);
        dispatch('fetchTemplates');
        return res;
      } catch (error) {
        console.error('Error creating template:', error);
      }
    },
  },
  getters: {
    templates: (state) => {
      return state.templates;
    },
    downloadedTemplate: (state) => {
      return state.downloadedTemplate;
    },
  
  },
});

export default store;
