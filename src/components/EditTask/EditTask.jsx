import { useState } from "react"
import { useDispatch } from "react-redux"
import {updateTask } from "../../rtk/tasksSlice"
import "./EditTask.css"

const EditTask = ({task, onClose}) => {
    const [editTitle, setEditTitle] = useState(task.title || "");
    const [editDescription, setEditDescription] = useState(task.description || "");
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(updateTask({
        id: task.id,
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: task.completed,
        }));
        onClose();
  };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="edit-task-block" onClick={handleCancel}>
            <div className="edit-task-modal" onClick={(e) => e.stopPropagation()}>
                <h3>Редактировать задачу</h3>
                <div className="edit-task-fields">
                    <div className="edit-task-field-group">
                    <input
                        className="edit-title-input"
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Название задачи"
                    />
                    <textarea
                        className="edit-description-input"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Описание задачи"
                        rows="4"
                    />
                    </div>
                </div>
                <div className="edit-task-actions">
                    <button className="edit-cancel-btn" onClick={handleCancel}>
                        Отмена
                    </button>
                    <button className="edit-save-btn" onClick={handleSave}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditTask