import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskApi } from "../api/clientApi";

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
      const data = await taskApi.getTasks();
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
      const data = await taskApi.createTask(body);
      console.log("Созданная задача: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (id, thunkAPI) => {
    try {
      await taskApi.deleteTask(id);
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
      const data = await taskApi.toggleTask(id, !completed);
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
      const data = await taskApi.updateTask(id, {
        title,
        description,
        completed,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteAllTasks = createAsyncThunk(
  "tasks/deleteAllTasks",
  async (_, thunkAPI) => {
    try {
      await taskApi.deleteAllTasks();
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
