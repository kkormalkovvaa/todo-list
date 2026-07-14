const initialValue = {
  value: "",
};

const inputTextReduser = (store = initialValue, action) => {
  switch (action.type) {
    case "change":
      return { ...store, value: action.payload };
    case "zero":
      return { ...store, value: "" };
    default:
      return store;
  }
};

export default inputTextReduser;
