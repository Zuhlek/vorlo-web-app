
import axios from 'axios';

const BACKEND_ENDPOINT_URL_TEMPLATES = "http://localhost:8080/api/v1/templates/";
//const BACKEND_ENDPOINT_URL_TEMPLATES = "https://vorlo-api-app.onrender.com/api/v1/templates/";

export default {
  async getTemplates() {
    try {
      const response = await axios.get(BACKEND_ENDPOINT_URL_TEMPLATES);
      return response.data.data.templates.filter(
        template => template.vorloProjectId === 0);
    } catch (error) {
      console.error('Error getting templates:', error);
      throw error;
    }
  },
  async getTemplate(templateId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}`);
      return response.data.data.template;
    } catch (error) {
      console.error(`Error getting template with id ${templateId}:`, error);
      throw error;
    }
  },

  async deleteTemplate(templateId) {
    try {
      await axios.delete(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}`);
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  },

  async downloadTemplate(templateId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}/download-file`, { responseType: 'blob' });
      return { data: response.data, headers: response.headers };
    } catch (error) {
      console.error('Error downloading template:', error);
      throw error;
    }
  }, 

  async updateTemplate({ templateId, templateFile, templateName, templateDescription }) {
    try {
      const formData = new FormData();
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      formData.append('templateId', templateId);
      formData.append('vorloProjectId', 0); // 0 = template, ansonsten projektbezogen
      formData.append('vorloUserId', 1);
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

  async createTemplate(templateFile, templateName, templateDescription) {
    try {
      const formData = new FormData();
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      formData.append('file', templateFile, templateFile.name);
      formData.append('vorloProjectId', 0);
      formData.append('vorloUserId', 1);
      formData.append('templateName', templateName);
      formData.append('templateDescription', templateDescription);
      return await axios.post(BACKEND_ENDPOINT_URL_TEMPLATES, formData, config);
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  },
  async getTemplateDoc(templateId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}/download-file`, {
        responseType: 'arraybuffer'
      })
      return response.data;
    } catch (error) {
      console.error('Error getting template document:', error);
      throw error;
    }
  },
  
  async updateContentMap(templateId, updatedContentMap) {
    try {
      const response = await axios.put(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}/content-map`, updatedContentMap)
      return response;
    } catch (error) {
      console.error('Error updating content map:', error);
      throw error;
    }
  },
  
};
