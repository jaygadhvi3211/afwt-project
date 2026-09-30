import { api } from "./api";

export const appointmentService = {
    getAllAppointments: async (params) => {
        return api.get('/appointments', { params });
    },
    getAppointmentById: async (id) => {
        return api.get(`/appointments/${id}`);
    },
    createAppointment: async (data) => {
        return api.post('/appointments', data);
    },
    updateAppointmentStatus: async (id, status) => {
        return api.patch(`/appointments/${id}/status`, { status });
    },
    cancelAppointment: async (id, reason) => {
        return api.post(`/appointments/${id}/cancel`, { reason });
    }
};
