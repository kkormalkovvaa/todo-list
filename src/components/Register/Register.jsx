import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError, registerUser } from "../../rtk/authSlice"
import { useNavigate } from "react-router-dom"
import "./Register.css"

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, error} = useSelector((store)=> store.auth)

    const handleSubmit = (e)=> {
        e.preventDefault()
        dispatch(clearError())
        dispatch(registerUser({email, password, name}))
    }

    const handleLoginClick = () => {
        navigate("/login"); 
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Регистрация</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Загрузка..." : "Зарегистрироваться"}
                </button>
                <div className="toLogin">
                    <p>У вас уже есть акканут?</p>
                    <button className="toLogin-btn" onClick={handleLoginClick}>Войти</button>
                </div>
            </form>
        </div>
    )

}

export default Register