import { createStore } from "vuex";
import templateService from "./services/templateService";
import projectService from "./services/projectService";
import authenticationService from "./services/authenticationService";

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

    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    setTokens(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
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
    //AUTHENTICATION API
    async register({ commit }, { firstName, lastName, email, password }) {
      console.log("request received at store... processing...")
      const response = await authenticationService.register(firstName, lastName, email, password);
      const { accessToken, refreshToken } = response.data;
      console.log("received answer from server: ")
      console.log(response)
      commit('setTokens', { accessToken, refreshToken });
    },
    async login({ commit }, { email, password }) {
      console.log("request received at store... processing...")
      const response = await authenticationService.login(email, password);
      const { accessToken, refreshToken } = response.data;
      console.log("received answer from server: ")
      console.log(response)
      commit('setTokens', { accessToken, refreshToken });
    },
    async refreshToken({ commit, getters }) {
      const response = await authenticationService.refreshToken(getters.refreshToken);
      const { accessToken } = response.data;
      commit('setTokens', { accessToken, refreshToken: getters.refreshToken });
    },
    logout({ commit }) {
      commit('clearTokens');
    },
    //TEMPLATE API
    async getTemplates({ commit, state }) {
      const templates = await templateService.getTemplates(state.accessToken);
      commit("setTemplates", templates);
    },
    async getTemplate({ commit, state }, templateId) {
      const template = await templateService.getTemplate(templateId, state.accessToken);
      commit("setSelectedTemplate", template);
    },
    async deleteTemplate({ dispatch, state }, templateId) {
      await templateService.deleteTemplate(templateId, state.accessToken);
      dispatch("getTemplates");
    },
    async downloadTemplate({ commit, state }, templateId) {
      const downloadedTemplate = await templateService.downloadTemplate(templateId, state.accessToken);
      commit("setDownloadedTemplate", downloadedTemplate);
    },
    async updateTemplate(
      { dispatch, state },
      { templateId, templateFile, templateName, templateDescription }
    ) {
      await templateService.updateTemplate({
        templateId,
        templateFile,
        templateName,
        templateDescription,
      }, state.accessToken);
      dispatch("getTemplates");
    },
    async createTemplate(
      { dispatch, state },
      { templateFile, templateName, templateDescription }
    ) {
      await templateService.createTemplate(
        templateFile,
        templateName,
        templateDescription,
        state.accessToken
      );
      dispatch("getTemplates");
    },
    async getTemplateDoc({ commit, state }, templateId) {
      const docData = await templateService.getTemplateDoc(templateId, state.accessToken);
      commit("setDocData", docData);
    },
    async updateContentMap({ commit, state }, { templateId, updatedContentMap }) {
      const response = await templateService.updateContentMap(
        templateId,
        updatedContentMap,
        state.accessToken
      );
      commit("setContentMapResponse", response);
    },

    //PROJECT API
    async getProjects({ commit, state }) {
      const projects = await projectService.getProjects(state.accessToken);
      commit("setProjects", projects);
    },
    async getProject({ commit, state }, projectId) {
      const project = await projectService.getProject(projectId, state.accessToken);
      commit("setSelectedProject", project);
    },
    async deleteProject({ dispatch, state }, projectId) {
      await projectService.deleteProject(projectId, state.accessToken);
      dispatch("getProjects");
    },
    async updateProject(
      { dispatch, state },
      { projectId, vorloUserId, templateId, projectName }
    ) {
      await projectService.updateProject(
        projectId,
        vorloUserId,
        templateId,
        projectName,
        state.accessToken
      );
      dispatch("getProjects");
    },
    async createProject(
      { dispatch, state },
      { vorloUserId, templateId, projectName }
    ) {
      await projectService.createProject(vorloUserId, templateId, projectName, state.accessToken);
      dispatch("getProjects");
    },
    async createAndDownloadTemplate({ commit, state }, projectId) {
      const downloadData = await projectService.createAndDownloadTemplate(
        projectId,
        state.accessToken
      );
      commit("setDownloadData", downloadData);
    },
  },
  getters: {
    accessToken: (state) => {
      return state.accessToken;
    },
    refreshToken: (state) => {
      return state.refreshToken;
    },
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
