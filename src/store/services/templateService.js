
import axios from 'axios';

const BACKEND_ENDPOINT_URL_TEMPLATES = "http://localhost:8080/api/v1/templates/";

export default {
  async getTemplates() {
    return await axios.get(BACKEND_ENDPOINT_URL_TEMPLATES);
  },

  async deleteTemplate(templateId) {
    return await axios.delete(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}`);
  },

  async downloadTemplate(templateId) {
    return await axios.get(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}/download-file`, { responseType: 'blob' });
  },  

  async updateTemplate({ templateId, templateFile, templateName, templateDescription }) {
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
  
    formData.append('templateId', templateId);
    formData.append('vorloProjectId', templateId);
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
  
    return await axios.put(`${BACKEND_ENDPOINT_URL_TEMPLATES}${templateId}`, formData, config);
  },
  
  

  async createTemplate(templateFile, templateName, templateDescription) {
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
  },
  

};
