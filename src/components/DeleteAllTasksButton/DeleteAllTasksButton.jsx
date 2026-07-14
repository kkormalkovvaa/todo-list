import { useDispatch } from "react-redux"
import { deleteAllTasks } from "../../rtk/tasksSlice";
import "./DeleteAllTasksButton.css"

const DeleteAllTasksButton = () => {
    const dispatch = useDispatch()

    const handleDeleteAll = () => {
        const isConfirm = window.confirm("Удалить все задачи?")
        
        if(isConfirm) {
            dispatch(deleteAllTasks())
        }
    }

    return (
        <button className="delete-all-btn" onClick={handleDeleteAll}>
            Удалить все задачи
        </button>
    )
}

export default DeleteAllTasksButton