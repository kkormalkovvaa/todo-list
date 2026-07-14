import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, clearError } from "../../rtk/authSlice"
import {useNavigate } from "react-router-dom"
import "./Login.css"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, error} = useSelector((store) => store.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(clearError())
        dispatch(loginUser({email, password}))
    }
    const handleRegisterClick = () => {
        navigate("/register")
    }

    return(
        <div className="login-container">

        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Вход в систему</h2>
            {error && <div className="error-message">{error}</div>}
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
            />
            <input 
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Загрузка...' : 'Войти'}
            </button>
            <div className="toRegister">
                <p>нет аккаунта?</p>
                <button className="toRegister-btn" onClick={handleRegisterClick}>Зарегистрироваться</button>
            </div>
        </form>
        </div>
    )
}

export default Login