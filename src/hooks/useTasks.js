import { useDispatch } from "react-redux";
import { deleteTasks, toggleTaskStatus } from "../rtk/tasksSlice";

export const useTasks = () => {
  const dispatch = useDispatch();

  const deleteTask = (id) => {
    dispatch(deleteTasks(id));
  };

  const isChecked = (id, completed) => {
    dispatch(toggleTaskStatus({ id, completed }));
  };

  return { deleteTask, isChecked };
};
