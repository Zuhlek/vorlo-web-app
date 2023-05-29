
import axios from 'axios';

const BACKEND_ENDPOINT_URL_TEMPLATES = "https://vorlo-api-app.onrender.com/api/v1/templates/";

export default {

  async getTemplates(accessToken) {
    try {
      const response = await axios.get(BACKEND_ENDPOINT_URL_TEMPLATES, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data.data.templates.filter(
        template => template.vorloProjectId === 0);
    } catch (error) {
      console.error('Error getting templates:', error);
      throw error;
    }
  },

  async getTemplate(accessToken, templateId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data.data.template;
    } catch (error) {
      console.error(`Error getting template with id ${templateId}:`, error);
      throw error;
    }
  },

  async deleteTemplate(accessToken, templateId) {
    try {
      await axios.delete(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  },

  async downloadTemplate(accessToken, templateId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}/download-file`, { 
        responseType: 'blob',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return { data: response.data, headers: response.headers };
    } catch (error) {
      console.error('Error downloading template:', error);
      throw error;
    }
  }, 

  async updateTemplate(accessToken, { templateId, templateFile, templateName, templateDescription }) {
    try {
      const formData = new FormData();
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'multipart/form-data'
        }
      };
      formData.append('templateId', templateId);
      formData.append('vorloProjectId', 0); // 0 = template, ansonsten projektbezogen
      if (templateFile) {
        formData.append('file', templateFile, templateFile.name);
      }
      if (templateName) {
        formData.append('templateName', templateName);
      }
      if (templateDescription) {
        formData.append('templateDescription', templateDescription);
      }
      await axios.put(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}`, formData, config);
    } catch (error) {
      console.error('Error updating template:', error);
      throw error;
    }
  },

  async createTemplate(accessToken, templateFile, templateName, templateDescription) {
    try {
      const formData = new FormData();
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'multipart/form-data'
        }
      }
      formData.append('file', templateFile, templateFile.name);
      formData.append('vorloProjectId', 0);
      formData.append('templateName', templateName);
      formData.append('templateDescription', templateDescription);
      return await axios.post(BACKEND_ENDPOINT_URL_TEMPLATES, formData, config);
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  },
  
  async getTemplateDoc(accessToken, templateId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}/download-file`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        responseType: 'arraybuffer'
      });
      return response.data;
    } catch (error) {
      console.error('Error getting template document:', error);
      throw error;
    }
  },
  
  async updateContentMap(accessToken, templateId, updatedContentMap) {
    try {
      const response = await axios.put(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}/content-map`, updatedContentMap, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response;
    } catch (error) {
      console.error('Error updating content map:', error);
      throw error;
    }
  },
  
};
