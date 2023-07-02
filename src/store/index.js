import { createStore } from "vuex";
import templateService from "./services/templateService";
import projectService from "./services/projectService";
import authenticationService from "./services/authenticationService";
import documentService from "./services/documentService";

const store = createStore({
  state: {
    selectedProjectId: null,
    projectWasSelected: false,

    templates: [],
    selectedTemplate: null,
    downloadedTemplate: null,

    projects: [],
    selectedProject: null,

    documents: [],
    selectedDocument: null,

    docData: null,
    dynamicContents: null,
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
    setDocuments(state, documents) {
      state.documents = documents;
    },
    setSelectedDocument(state, document) {
      state.selectedDocument = document;
    },
    setDocData(state, docData) {
      state.docData = docData;
    },
    setDynamicContents(state, dynamicContents) {
      state.dynamicContents = dynamicContents;
    },    
    setDownloadData(state, { data, headers }) {
      state.downloadData = { data, headers };
    },
  },
  actions: {
    //AUTHENTICATION API
    async register({ commit }, { firstName, lastName, email, password }) {
      const response = await authenticationService.register(firstName, lastName, email, password);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token
      commit('setTokens', { accessToken, refreshToken });
    },
    async login({ commit }, { email, password }) {
      const response = await authenticationService.login(email, password);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token
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
      { templateFile, templateName, templateDescription, templateType }
    ) {
      await templateService.createTemplate(
        state.accessToken,
        templateFile,
        templateName,
        templateDescription,
        templateType
      );
      dispatch("getTemplates");
    },
    async getTemplateDoc({ commit, state }, templateId) {
      const docData = await templateService.getTemplateDoc(state.accessToken, templateId);
      commit("setDocData", docData);
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
      { projectId, projectName, projectDescription }
    ) {
      await projectService.updateProject(
        state.accessToken,
        projectId,
        projectName,
        projectDescription
      );
      dispatch("getProjects");
    },
    async createProject(
      { dispatch, state },
      { projectName, projectDescription }
    ) {
      await projectService.createProject(state.accessToken, projectName, projectDescription);
      dispatch("getProjects");
    },

    //DOCUMENT API
    async getDocumentsByProjectId({ commit, state }, projectId) {
      const documents = await documentService.getDocumentsByProjectId(state.accessToken, projectId);
      commit("setDocuments", documents);
    },
    async getDocument({ commit, state }, documentId) {
      const document = await documentService.getDocument(state.accessToken, documentId);
      console.log(document)
      commit("setSelectedDocument", document);
    },
    async deleteDocument({ dispatch, state }, documentId, projectId) {
      await documentService.deleteDocument(state.accessToken, documentId);
      dispatch("getDocumentsByProjectId", projectId);
    },
    async updateDocument(
      { dispatch, state },
      { documentId, projectId, templateId, documentName, documentDescription }
    ) {
      console.log("store method updateDocument...")
      await documentService.updateDocument(
        state.accessToken,
        documentId,
        projectId, 
        templateId,
        documentName,
        documentDescription
      );
      dispatch("getDocumentsByProjectId", projectId);
    },
    async createDocument(
      { dispatch, state },
      { projectId, templateId, documentName, documentDescription }
    ) {
      await documentService.createDocument(state.accessToken, projectId, templateId, documentName, documentDescription);
      dispatch("getDocumentsByProjectId", projectId);
    },
    async createAndDownloadDocument({ commit, state }, documentId) {
      console.log(documentId)
      const downloadData = await documentService.createAndDownloadDocument(
        state.accessToken, 
        documentId,
      );
      commit("setDownloadData", downloadData);
    },
    async updateDynamicContents({ commit, state }, { documentId, dynamicContents }) {
      
      const dynamicContent = await documentService.updateDynamicContents(
        state.accessToken,
        documentId,
        dynamicContents
      );
      commit("setDynamicContents", dynamicContent);
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
    documents: (state) => {
      return state.documents;
    },
    selectedDocument: (state) => {
      return state.selectedDocument;
    },
    docData: (state) => {
      return state.docData;
    },
    dynamicContents: (state) => {
      return state.dynamicContents;
    },
    downloadData: (state) => {
      return state.downloadData;
    },
  },
});

export default store;
