import { useEffect } from "react"
import Task from "../Task/Task"
import DeleteAllTasksButton from "../DeleteAllTasksButton/DeleteAllTasksButton";
import { useDispatch, useSelector } from "react-redux"
import { getTasks } from "../../rtk/tasksSlice"


const TodoList = ({deleteTask, isChecked}) => {
    const { items = [], loading, errors } = useSelector(store => store.tasks || {items: []})
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(getTasks())
    }, [dispatch])

    if (loading) return <h1>Загрузка...</h1>;
    if (errors) return <h1>Ошибка: {errors}</h1>;

    const tasks = Array.isArray(items) ? items : []
    

    return(
        <div className="tasks-list">
            {tasks.length == 0 && <h1>У вас пока нет задач</h1>}
            {tasks.map(task => {
                return (<Task isChecked={isChecked} deleteTask={deleteTask} key={task.id || task._id} task={task} />)
            })}
            {tasks.length > 0 && <DeleteAllTasksButton />}

        </div>
    )
}

export default TodoList