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
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token
      console.log("received answer from server: ")
      console.log(response)
      console.log(accessToken)
      console.log(refreshToken)
      commit('setTokens', { accessToken, refreshToken });
    },
    async login({ commit }, { email, password }) {
      console.log("request received at store... processing...")
      const response = await authenticationService.login(email, password);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token
      console.log("received answer from server: ")
      console.log("access token = " + accessToken)
      console.log("refresh token = " + refreshToken)
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
      console.log("access token = " + state.accessToken)
      console.log("refresh token = " + state.refreshToken)
      const templates = await templateService.getTemplates(state.accessToken);
      commit("setTemplates", templates);
    },
    async getTemplate({ commit, state }, templateId) {
      const template = await templateService.getTemplate(state.accessToken, templateId);
      commit("setSelectedTemplate", template);
    },
    async deleteTemplate({ dispatch, state }, templateId) {
      await templateService.deleteTemplate(state.accessToken, templateId);
      dispatch("getTemplates");
    },
    async downloadTemplate({ commit, state }, templateId) {
      const downloadedTemplate = await templateService.downloadTemplate(state.accessToken, templateId);
      commit("setDownloadedTemplate", downloadedTemplate);
    },
    async updateTemplate(
      { dispatch, state },
      { templateId, templateFile, templateName, templateDescription }
    ) {
      await templateService.updateTemplate(state.accessToken, {
        templateId,
        templateFile,
        templateName,
        templateDescription,
      });
      dispatch("getTemplates");
    },
    async createTemplate(
      { dispatch, state },
      { templateFile, templateName, templateDescription }
    ) {
      await templateService.createTemplate(
        state.accessToken,
        templateFile,
        templateName,
        templateDescription
      );
      dispatch("getTemplates");
    },
    async getTemplateDoc({ commit, state }, templateId) {
      const docData = await templateService.getTemplateDoc(state.accessToken, templateId);
      commit("setDocData", docData);
    },
    async updateContentMap({ commit, state }, { templateId, updatedContentMap }) {
      const response = await templateService.updateContentMap(
        state.accessToken,
        templateId,
        updatedContentMap
      );
      commit("setContentMapResponse", response);
    },

    //PROJECT API
    async getProjects({ commit, state }) {
      const projects = await projectService.getProjects(state.accessToken);
      commit("setProjects", projects);
    },
    async getProject({ commit, state }, projectId) {
      const project = await projectService.getProject(state.accessToken, projectId);
      commit("setSelectedProject", project);
    },
    async deleteProject({ dispatch, state }, projectId) {
      await projectService.deleteProject(state.accessToken, projectId);
      dispatch("getProjects");
    },
    async updateProject(
      { dispatch, state },
      { projectId, vorloUserId, templateId, projectName }
    ) {
      await projectService.updateProject(
        state.accessToken,
        projectId,
        vorloUserId,
        templateId,
        projectName
      );
      dispatch("getProjects");
    },
    async createProject(
      { dispatch, state },
      { vorloUserId, templateId, projectName }
    ) {
      await projectService.createProject(state.accessToken, vorloUserId, templateId, projectName);
      dispatch("getProjects");
    },
    async createAndDownloadTemplate({ commit, state }, projectId) {
      const downloadData = await projectService.createAndDownloadTemplate(
        state.accessToken, 
        projectId,
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
