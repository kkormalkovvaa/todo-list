import { useState } from "react";
import { updateTask } from "../../rtk/tasksSlice";
import "./Task.css"
import EditTask from "../EditTask/EditTask";

const Task = ({task, deleteTask, isChecked}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
      setIsEditing(true);
  };
  const handleCloseEdit  = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="task">
          <div className="task-content">
              <div className="task-header">
                  <input type="checkbox" checked={task.completed} onChange={()=>{isChecked(task.id, task.completed)}}/>
                  <p className={task.completed ? 'task-title completed' : 'task-title'}>{task.title}</p>
              </div>
              {task.description && (
                <div className="task-description-content">
                  <p className={task.completed ? 'task-description completed' : 'task-description'}>
                      {task.description}
                  </p>
                </div>
              )}
              <div className="task-actions">
                  <button className="taskDelete-btn" onClick={()=> deleteTask(task.id)}>Удалить</button>
                  <button className="taskChange-btn" onClick={handleEditClick}>Изменить</button>
              </div>
          </div>
      </div>
      {isEditing && <EditTask task={task} onClose={handleCloseEdit} />}
    </>
  )
}

export default Task