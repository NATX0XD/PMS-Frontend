// src/api/controllers/jobsController.js
import { api } from "..";

export const jobsController = (props = {}) => {
    const baseRoute = "jobs";
    const description = "จัดการเปิดงาน";

    const config = {
        ...props,
        context: props?.context || null,
        router: props?.router || null,
        description: props?.description || description,

    };
    return {
        create: async (params) => {
            return await api.post(`${baseRoute}`, params, config);
        },
        findall: async () => {
            return await api.get(`${baseRoute}`, config);
        },
        findOne: async (id) => {
            return await api.get(`${baseRoute}/${id}`, config);
        },
        update: async (id, params) => {
            return await api.patch(`${baseRoute}/${id}`, params, config);
        },
        remove: async (id) => {
            return await api.delete(`${baseRoute}/${id}`, config);
        },
    }


}