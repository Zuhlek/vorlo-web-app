import { createStore } from "vuex";
import templateService from "./services/templateService";
import projectService from "./services/projectService";

const store = createStore({
  state: {
    selectedProjectId: null,
    projectWasSelected: false,

    templates: [],
    selectedTemplate: null,
    downloadedTemplate: null,

    projects: [],
    selectedProject: null,

    docData: null,
    contentMapResponse: null,
    downloadData: null,
  },
  mutations: {
    setTemplates(state, templates) {
      state.templates = templates;
    },
    setSelectedTemplate(state, template) {
      state.selectedTemplate = template;
    },
    setDownloadedTemplate(state, { data, headers }) {
      state.downloadedTemplate = { data, headers };
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setSelectedProject(state, project) {
      state.selectedProject = project;
    },
    setDocData(state, docData) {
      state.docData = docData;
    },
    setContentMapResponse(state, response) {
      state.contentMapResponse = response;
    },
    setDownloadData(state, { data, headers }) {
      state.downloadData = { data, headers };
    },
  },
  actions: {

    //TEMPLATE API
    async getTemplates({ commit }) {
      const templates = await templateService.getTemplates();
      commit('setTemplates', templates);
    },
    async getTemplate({ commit }, templateId) {
      const template = await templateService.getTemplate(templateId);
      commit('setSelectedTemplate', template);
    },
    async deleteTemplate({ dispatch }, templateId) {
      await templateService.deleteTemplate(templateId);
      dispatch('getTemplates');
    },
    async downloadTemplate({ commit }, templateId) {
      const downloadedTemplate = await templateService.downloadTemplate(templateId);
      commit('setDownloadedTemplate', downloadedTemplate);
    },
    async updateTemplate({ dispatch }, { templateId, templateFile, templateName, templateDescription }) {
      await templateService.updateTemplate({ templateId, templateFile, templateName, templateDescription });
      dispatch('getTemplates');
    },
    async createTemplate({ dispatch }, { templateFile, templateName, templateDescription }) {
      await templateService.createTemplate(templateFile, templateName, templateDescription);
      dispatch('getTemplates');
    },
    async getTemplateDoc({ commit }, templateId) {
      const docData = await templateService.getTemplateDoc(templateId);
      commit('setDocData', docData);
    },
    async updateContentMap({ commit }, { templateId, updatedContentMap }) {
      const response = await templateService.updateContentMap(templateId, updatedContentMap);
      commit('setContentMapResponse', response);
    },
  
    //PROJECT API
    async getProjects({ commit }) {
      const projects = await projectService.getProjects();
      commit('setProjects', projects);
    },
    async getProject({ commit }, projectId) {
      const project = await projectService.getProject(projectId);
      commit('setSelectedProject', project);
    },
    async deleteProject({ dispatch }, projectId) {
      await projectService.deleteProject(projectId);
      dispatch('getProjects');
    },
    async updateProject({ dispatch }, { projectId, vorloUserId, templateId, projectName }) {
      await projectService.updateProject( projectId, vorloUserId, templateId, projectName );
      dispatch('getProjects');
    },
    async createProject({ dispatch }, { vorloUserId, templateId, projectName }) {
      await projectService.createProject(vorloUserId, templateId, projectName);
      dispatch('getProjects');
    },
    async createAndDownloadTemplate({ commit }, projectId) {
      const downloadData = await projectService.createAndDownloadTemplate(projectId);
      commit('setDownloadData', downloadData);
    },

  },
  getters: {
    templates: (state) => {
      return state.templates;
    },
    selectedTemplate: (state) => {
      return state.selectedTemplate;
    },
    downloadedTemplate: (state) => {
      return state.downloadedTemplate;
    },
    projects: (state) => {
      return state.projects;
    },
    selectedProject: (state) => {
      return state.selectedProject;
    },
    docData: (state) => {
      return state.docData;
    },
    contentMapResponse: (state) => {
      return state.contentMapResponse;
    },
    downloadData: (state) => {
      return state.downloadData;
    },
  },
});

export default store;
