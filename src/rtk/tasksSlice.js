import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { items: [], loading: false, errors: null };

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Необходимо авторизации");
      }

      const response = await fetch(
        "https://todo-redev.onrender.com/api/todos?page=1&limit=10",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { data } = await response.json();
      console.log("tasks: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addTasks = createAsyncThunk(
  "tasks/addTasks",
  async (body, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Необходима авторизация");
      }

      const response = await fetch(
        "https://todo-redev.onrender.com/api/todos",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      const data = await response.json();
      console.log(data.data || data);
      return data.data || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://todo-redev.onrender.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        let errorMessage = "Ошибка удаления задачи";
        try {
          const data = await response.json();
        } catch (e) {
          errorMessage = `Ошибка ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTaskStatus",
  async ({ id, completed }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Необходима авторизация");
      }

      const response = await fetch(
        `https://todo-redev.onrender.com/api/todos/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !completed }),
        },
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, title, description, completed }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://todo-redev.onrender.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, completed }),
        },
      );

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteAllTasks = createAsyncThunk(
  "tasks/deleteAllTasks",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://todo-redev.onrender.com/api/todos",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(addTasks.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        const deletedId = action.payload;

        state.items = state.items.filter((task) => {
          return task.id !== deletedId;
        });
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Ошибка удаления задачи: ", action.payload);
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = state.items.map((task) => {
            if (task.id === action.payload.id) {
              return { ...task, ...action.payload };
            }
            return task;
          });
        }
      })
      .addCase(toggleTaskStatus.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.errors = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, ...action.payload };
          }
          return task;
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.errors = action.payload;
        console.log("description", state.description);
        console.error("Ошибка обновления задачи: ", action.payload);
      })
      .addCase(deleteAllTasks.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(deleteAllTasks.fulfilled, (state, action) => {
        ((state.loading = false), (state.items = []));
      })
      .addCase(deleteAllTasks.rejected, (state, action) => {
        ((state.loading = false), (state.errors = action.payload));
        console.log("Ошибка удаления всех задач: ", action.payload);
      });
  },
});

export default tasksSlice.reducer;
