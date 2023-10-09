import { useState, useContext } from "react";
import Input from "../components/Input";
import axios from "../config/axios"
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import NoticeContext from '../providers/show'


export default function Login() {

    const noticeContext = useContext(NoticeContext)

    const {tokenValid, setTokenValid} = noticeContext

    const navigate = useNavigate()

    const [error, setError] = useState(false)

    const [guardando, setGuardando] = useState(false)

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const initSession = async () => {
        setGuardando(true)
        await axios.post("/login", JSON.stringify(user), {
            headers: {
                withCredentials: true
            }
        })
            .then((res) => {
                const token = res?.data?.token
                localStorage.setItem('token', token)
                localStorage.setItem('username', res?.data?.username)
                localStorage.setItem('name',res?.data?.name)
                localStorage.setItem('surname', res?.data?.surname)
                setTokenValid("valido")
                setGuardando(false)
                navigate("/eggnews/admin")
            })
            .catch((err) => {
                if (err?.response?.status  == 403){
                    setError("Usuario o contraseña incorecto")
                } else {
                    setError("Ocurrio un problema con el servidor... \n Intente nuevamente mas tarde")
                }
                setGuardando(false)
            })
        setUser({
            username: user.username,
            password: ""
        })
    }

    return (
        <>
            {
                guardando &&
                <div className="enviando">
                    <ClipLoader className="spiner-enviando" color="#276559" />
                </div>
            }
            {
                error &&
                <div className="alert alert-danger error-guardado" role="alert">
                    <p>{error}</p>
                    <button className="btn-close" onClick={() => setError("")} aria-label="Close"></button>
                </div>

            }
            {
                tokenValid === "invalido" &&
                <div className="alert alert-danger error-guardado" role="alert">
                    <p>Su session ah expirado o sus credenciales son incorrectas</p>
                    <button className="btn-close" onClick={() => setTokenValid("valido")} aria-label="Close"></button>
                </div>
            }
            <div className="container mt-5">
                <Input type={"text"} name={"username"} label={"Usuario"} handleChange={handleChange} value={user.username} />
                <Input type={"password"} name={"password"} label={"Contraseña"} handleChange={handleChange} value={user.password} />
                <div className="mt-3 text-center">
                    <button className="btn btn-primary" onClick={initSession}>iniciar sesion</button>
                </div>
            </div>
        </>
    );
}