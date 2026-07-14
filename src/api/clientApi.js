import { API_URL, API_ENDPOINTS, getAuthHeaders } from "./config";

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Войдите в аккаунт");
  }

  if (!response.ok) {
    let errorMessage = `Ошибка: ${response.status} ${response.statusText}`;
    try {
      const data = await response.json();
      errorMessage = data.message || data.error || errorMessage;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  try {
    const data = await response.json();
    return data.data || data;
  } catch (e) {
    return {};
  }
};

const request = async (method, endpoint, body = null) => {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: getAuthHeaders(),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return handleResponse(response);
};

export const taskApi = {
  getTasks: () => request("GET", API_ENDPOINTS.TODOS.GET_ALL),
  createTask: (taskData) =>
    request("POST", API_ENDPOINTS.TODOS.CREATE, taskData),
  updateTask: (id, taskData) =>
    request("PATCH", API_ENDPOINTS.TODOS.UPDATE(id), taskData),
  toggleTask: (id, completed) =>
    request("PATCH", API_ENDPOINTS.TODOS.TOGGLE(id), { completed }),
  deleteTask: (id) => request("DELETE", API_ENDPOINTS.TODOS.DELETE(id)),
  deleteAllTasks: () => request("GET", API_ENDPOINTS.TODOS.DELETE_ALL),
};

export const authApi = {
  login: (credentials) =>
    request("POST", API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) =>
    request("POST", API_ENDPOINTS.AUTH.REGISTER, userData),
};
