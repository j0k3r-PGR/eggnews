import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import Input from "../components/Input"
import axios from "../config/axios"

export default function ModificarUser() {

    const { id } = useParams()

    const [roles, setRoles] = useState([])

    const [user, setUser] = useState({})

    const [waiting, setWaiting] = useState(true)

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
                })
                .catch(err => console.log(err));
        }
        getCategoies()
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    useEffect(() => {
        axios.get('/superuser/user/find/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'no-cors'
        }).then((res) => {
            setUser(res.data)
            setWaiting(false)
        }
        )
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
        await axios.put('/superuser/user/update/' + id, user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'no-cors'
        }).then(() => {
            console.log("Guardado")
            setWaiting(false)
        }).catch((err => console.log(err)))
    }

    return (
        <>
            {
                waiting &&
                <div className="enviando">
                    <ClipLoader className="spiner-enviando" color="#276559" />
                </div>
            }
            <div className="container">
                <h2>Carga de usuarios</h2>
                <div>
                    <Input label="Nombre" type="text" value={user?.name} name="name" handleChange={handleChange} />
                    <Input label="Apellido" type="text" value={user?.surname} name="surname" handleChange={handleChange} />
                    <Input label="Usuario" type="text" value={user?.username} name="username" handleChange={handleChange} />
                    <Input label="Contraseña" type="text" value={user?.password} name="password" handleChange={handleChange} />
                    <div className="form-group mt-3">
                        <label>Alta</label>
                        <input type="checkbox" className="checkbox" defaultChecked={user?.alta} name="alta" onClick={handleChangeCheck} />
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

                    <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Modificar</button>
                </div>
            </div>
        </>
    )
}