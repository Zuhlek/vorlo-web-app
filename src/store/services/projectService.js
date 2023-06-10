
import axios from 'axios';

const BACKEND_ENDPOINT_URL_PROJECTS = "http://localhost:8080/api/v1/projects/";

export default {
  async getProjects(accessToken) {
    try {
      const response = await axios.get(BACKEND_ENDPOINT_URL_PROJECTS, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      console.log(response)
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

  async updateProject(accessToken, projectId, projectName, projectDescription) {
    try {
      const formData = new FormData();
      formData.append('id', projectId);
      formData.append('projectName', projectName);
      formData.append('projectDescription', projectDescription);
      axios.put(`${BACKEND_ENDPOINT_URL_PROJECTS}${projectId}`, formData, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async createProject(accessToken, projectName, projectDescription) {
    try {
      const formData = new FormData();
      formData.append('projectName', projectName);
      formData.append('projectDescription', projectDescription)
      return await axios.post(BACKEND_ENDPOINT_URL_PROJECTS, formData, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

};
