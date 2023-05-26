import axios from 'axios'; 

const API_URL = 'http://localhost:8080/api/v1/auth'; 

const register = (firstName, lastName, email, password) => {
    console.log("request received at service... sending axios request...")
    return axios.post(`${API_URL}/register`, {
        firstName, 
        lastName,
        email,
        password,
    });
};

const login = (username, password) => {
    console.log("request received at service... sending axios request...")
    return axios.post(`${API_URL}/authenticate`, {
        username,
        password,
    });
};

const refreshToken = (refreshToken) => {
    return axios.post(`${API_URL}/refresh-token`, {
        refreshToken,
    });
};


export default {
    register,
    login,
    refreshToken,
};
