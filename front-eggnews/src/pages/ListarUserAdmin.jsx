import { useEffect, useState } from "react"
import axios from "../config/axios"
import { BeatLoader } from "react-spinners"
import { Link } from "react-router-dom"


export default function ListarNoticiasAdmin() {

    const [users, setUsers] = useState([])

    const [eliminado, setEliminado] = useState(false)

    const [isLoading, setIsLoadin] = useState(true)

    const [eliminarId, setEliminarId] = useState()

    useEffect(() => {
        axios.get('/superuser/user/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'no-cors'
        }).then((res) => {
            setUsers(res.data.filter((user) => user.username !== "SUPERADMIN"))
            setIsLoadin(false)
        })
    }, [eliminarId])


    const eliminarNoticia = () => [
        axios.delete('/superuser/user/delete/' + eliminarId, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'no-cors'
        }).then(() => {
            setEliminado(true)
            setEliminarId(false)
        }).catch((err => console.log(err)))
    ]

    return (
        <div className="container">
            <h2>Listado de usuarios</h2>
            {
                eliminado &&
                <div className="alert alert-success container eliminado" role="alert">
                    Usuario eliminado correctamente
                    <button className="btn-close" onClick={() => setEliminado(false)} aria-label="Close"></button>
                </div>
            }
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Alta</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.idRole === 1 ?"Admin" : user.idRole === 2 ? "Empleado" : "user"}</td>
                                    <td className=""><input className="checkbox" type="checkbox" defaultChecked={user.alta} disabled /></td>
                                    <td>
                                        {/* <Link className="btn btn-primary" to={'/eggnews/superusers/modificar/' + user.id}>Editar</Link> */}
                                        { user.username !== "SUPERADMIN" &&
                                            <Link className="btn btn-danger" onClick={() => setEliminarId(user.id)}>Eliminar</Link>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                isLoading ?
                    <div className="tr-spinner">
                        <BeatLoader
                            className="spinner"
                            color="#1a6b5b"
                            size={35}
                        />
                    </div>
                    :
                    users.length === 0 &&
                    <div className="alert alert-secondary">
                        No hay usuarios en este momento
                    </div>
            }
            {
                eliminarId &&
                <div className="alert alert-success eliminar container" role="alert">
                    <div>
                        <h3>Atencion!!</h3>
                        <button className="btn-close" onClick={() => setEliminarId(false)} aria-label="Close"></button>
                    </div>
                    <p>¿Esta seguro que quiere eliminar esta notica de la base de datos?</p>
                    <div>
                        <Link className="btn btn-primary btn-volver" onClick={() => setEliminarId(false)}>Volver</Link>
                        <button className="btn btn-secondaty" onClick={eliminarNoticia}>Elimar Permanentemente</button>
                    </div>
                </div>
            }
        </div>
    )
}