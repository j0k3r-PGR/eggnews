import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { Link } from "react-router-dom"
import Input from "../components/Input"
import axios from "../config/axios"

export default function CargaUser() {

    const [roles, setRoles] = useState([])

    const [waiting, setWaiting] = useState(true)

    const [guardado, setGuardado] = useState(false)

    const [user, setUser] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        idRole: 1,
        alta: true
    })

    useEffect(() => {
        let isMounted = true

        const controller = new AbortController()

        const getCategoies = async () => {
            await axios.get('/superuser/roles/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                signal: controller.signal,
                mode: 'no-cors'
            })
                .then(res => {
                    isMounted && setRoles(res.data)
                    setWaiting(false)
                })
                .catch(err => {
                    setWaiting(false)
                    console.log(err)
                });
        }
        getCategoies()
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeCheck = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.checked
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setWaiting(true)

        await axios.post('/superuser/user/save', user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'no-cors'
        }).then(()=>{
            setWaiting(false)
            setGuardado(true)
        })
    }

    return (
        <div className="container">
            {
                waiting &&
                <div className="enviando">
                    <ClipLoader className="spiner-enviando" color="#276559" />
                </div>
            }
            <h2>Carga de usuarios</h2>
            {
                guardado &&
                <div className="alert alert-success guardado-exito" role="alert">
                    <p>Usuario guardado con éxito</p>
                    <button className="btn-close" onClick={() => setGuardado(false)} aria-label="Close"></button>
                    <Link to="/eggnews/superusers/listar" className="btn btn-primary btn-volver">Volver</Link>
                </div>
            }
            <div>
                <Input label="Nombre" type="text" value={user.name} name="name" handleChange={handleChange} />
                <Input label="Apellido" type="text" value={user.surname} name="surname" handleChange={handleChange} />
                <Input label="Usuario" type="text" value={user.username} name="username" handleChange={handleChange} />
                <Input label="Contraseña" type="text" value={user.password} name="password" handleChange={handleChange} />
                <div className="form-group mt-3">
                    <label>Alta</label>
                    <input type="checkbox" className="checkbox" defaultChecked={user.alta} name="alta" onClick={handleChangeCheck} />
                </div>
                <div className="form-group mt-3">
                    <select name="idRole" className="form-control mt-1" onChange={handleChange}>
                        {
                            roles.map((role) => {
                                return (
                                    <option key={role?.id} value={role?.id}>{role?.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Cargar usuario</button>
            </div>
        </div>
    )
}