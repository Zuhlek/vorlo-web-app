
import axios from 'axios';

const BACKEND_ENDPOINT_URL_DOCUMENTS = "http://localhost:8080/api/v1/documents/";

export default {
  async getDocumentsByProjectId(accessToken, projectId) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_DOCUMENTS}by-project-id/${projectId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data.data.documents;
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  },

  async getDocument(accessToken, documentId) {
    console.log("getting document with id " + documentId)
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_DOCUMENTS}${documentId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data.data.document;
    } catch (error) {
      console.error(`Error getting document with id ${documentId}:`, error);
      throw error;
    }
  },

  async deleteDocuments(accessToken, documentId) {
    try {
      await axios.delete(`${BACKEND_ENDPOINT_URL_DOCUMENTS}${documentId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error(`Error deleting document with id ${documentId}:`, error);
      throw error;
    }
  },

  async updateDocuments(accessToken, documentId, documentName, documentDescription) {
    try {
      const formData = new FormData();
      formData.append('id', documentId);
      formData.append('documentName', documentName);
      formData.append('documentDescription', documentDescription);
      axios.put(`${BACKEND_ENDPOINT_URL_DOCUMENTS}${documentId}`, formData, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  async createDocument(accessToken, projectId, templateId, documentName, documentDescription) {
    try {
      const formData = new FormData();
      formData.append('projectId', projectId);
      formData.append('templateId', templateId);
      formData.append('documentName', documentName);
      formData.append('documentDescription', documentDescription)
      return await axios.post(BACKEND_ENDPOINT_URL_DOCUMENTS, formData, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  },

  async createAndDownloadDocument(accessToken, documentId) {
    console.log(".."+documentId)
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT_URL_DOCUMENTS}${documentId}/generate-document`, {
        responseType: "blob",
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return { data: response.data, headers: response.headers };
    } catch (error) {
      console.error('Error creating and downloading document:', error);
      throw error;
    }
  },

  async updateDynamicContents(accessToken, documentId, dynamicContents) {
    console.log("trying to update dynamic contents")
    console.log(dynamicContents)
    try {
      const response = await axios.put(`${BACKEND_ENDPOINT_URL_DOCUMENTS}${documentId}/dynamic-content`, dynamicContents, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response;
    } catch (error) {
      console.error('Error updating dynamic contents:', error);
      throw error;
    }
  },
};
