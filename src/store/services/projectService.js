
import axios from 'axios';

const BACKEND_ENDPOINT_URL_PROJECTS = "https://vorlo-api-app.onrender.com/api/v1/projects/";
//const BACKEND_ENDPOINT_URL_PROJECTS = 'http://localhost:8080/api/v1/projects/'; 

export default {
  async getProjects(accessToken) {
    try {
      const response = await axios.get(BACKEND_ENDPOINT_URL_PROJECTS, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data.data.projects;
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  async getProject(accessToken, projectId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_PROJECTS}${projectId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data.data.project;
    } catch (error) {
      console.error(`Error getting project with id ${projectId}:`, error);
      throw error;
    }
  },

  async deleteProject(accessToken, projectId) {
    try {
      await axios.delete(`${BACKEND_ENDPOINT_URL_PROJECTS}${projectId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error(`Error deleting project with id ${projectId}:`, error);
      throw error;
    }
  },

  async updateProject(accessToken, projectId, templateId, projectName) {
    try {
      const formData = new FormData();
      formData.append('id', projectId);
      formData.append('templateId', templateId);
      formData.append('projectName', projectName);
      axios.put(BACKEND_ENDPOINT_URL_PROJECTS, formData, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async createProject(accessToken, templateId, projectName) {
    try {
      const formData = new FormData();
      formData.append('templateId', templateId);
      formData.append('projectName', projectName);
      return await axios.post(BACKEND_ENDPOINT_URL_PROJECTS, formData, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async createAndDownloadTemplate(accessToken, projectId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_PROJECTS}${projectId}/generate-document`, {
        responseType: "blob",
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return { data: response.data, headers: response.headers };
    } catch (error) {
      console.error('Error creating and downloading template:', error);
      throw error;
    }
  },
};
