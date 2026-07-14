import { useDispatch } from "react-redux"
import {logout} from "../../rtk/authSlice"
import "./LogoutButton.css"

const LogoutButton = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }
    
    return (
        <button onClick={handleLogout} className="logout-btn">
            Выйти
        </button>
    )
}

export default LogoutButton