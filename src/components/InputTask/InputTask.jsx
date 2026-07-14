import { useSelector, useDispatch } from "react-redux"
import {change,changeDescription, zero} from "../../rtk/inputTextSlice"
import {addTasks} from "../../rtk/tasksSlice"
import './InputTask.css'


const InputTask = () => {
    const dispatch = useDispatch()
    const {value, description} = useSelector(store=>store.text)
    

    const handleChange = e => {
        dispatch(change(e.target.value))
    }
    const handleDescriptionChange = e => {
        dispatch(changeDescription(e.target.value))
    }
    const handleClick = () => {
        if (!value.trim()) {
            alert("Введите название задачи");
            return;
        }
        dispatch(addTasks({title: value, description: description, completed: false}))
        dispatch(zero())
    }
    return(
        <div className="input-task">
            <input className="input-title" placeholder="Введите название задачи" value={value} onChange={handleChange} />
            <input className="input-description" placeholder="Введите описание задачи" value={description} onChange={handleDescriptionChange}/>
            <button className="addTask-btn" onClick={handleClick}>Добавить</button>
        </div>
    )
}

export default InputTask