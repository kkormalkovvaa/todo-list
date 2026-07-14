const initialValue = {
  value: [],
};

const tasksReduser = (store = initialValue, action) => {
  switch (action.type) {
    case "add":
      return {
        ...store,
        value: [
          ...store.value,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            isDone: false,
          },
        ],
      };
    case "deleteTask":
      return {
        ...store,
        value: store.value.filter((task) => task.id !== action.payload),
      };
    case "toggleStatus":
      return {
        ...store,
        value: store.value.map((task) =>
          task.id === action.payload ? { ...task, isDone: !task.isDone } : task,
        ),
      };
    default:
      return store;
  }
};

export default tasksReduser;
