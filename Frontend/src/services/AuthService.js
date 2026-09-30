import { api } from "./api";

export const loginService = (data) => {
    return api.post('/auth/login', data);
};

export const registerService = (data) => {
    return api.post('/auth/register', data);
};