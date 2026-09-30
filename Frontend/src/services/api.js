import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5001/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("salon_token");
    if (token && token.length > 50) { // basic check for actual jwt
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});