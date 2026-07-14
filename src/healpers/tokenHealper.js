export const token = {
  get: () => localStorage.getItem("token"),
  set: (value) => localStorage.setItem("token", value),
  remove: () => localStorage.removeItem("token"),
  isAuthorized: () => !!localStorage.get("token"),
};
