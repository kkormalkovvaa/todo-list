import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Header from './components/Header/Header'
import InputTask from './components/InputTask/InputTask'
import TodoList from './components/TodoList/TodoList'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import {deleteTasks,toggleTaskStatus} from "./rtk/tasksSlice"
import AuthRoutes from './healpers/Routes/AuthRoutes'
import LogoutButton from './components/LogoutButton/LogoutButton'
import {useTasks} from "./hooks/useTasks"

function App() {
  const {isAuthenticated} = useSelector((store) => store.auth)
  const {isChecked, deleteTask} = useTasks()


  if(!isAuthenticated) {
    return <AuthRoutes />
  }

  return (
    <div>
      <LogoutButton />
      <Header />
      <InputTask/>
      <TodoList deleteTask={deleteTask} isChecked={isChecked} />
    </div>
  )
}

export default App
