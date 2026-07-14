export const API_URL = import.meta.env.VITE_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  TODOS: {
    GET_ALL: "/todos?page=1&limit=10",
    GET_ONE: (id) => `/todos/${id}`,
    CREATE: "/todos",
    UPDATE: (id) => `/todos/${id}`,
    DELETE: (id) => `/todos/${id}`,
    DELETE_ALL: "/todos",
    TOGGLE: (id) => `/todos/${id}/toggle`,
  },
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
