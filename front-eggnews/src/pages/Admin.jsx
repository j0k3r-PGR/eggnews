import { Outlet, Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import axios from "../config/axios"
import NoticeContext from '../providers/show'

export default function Admin() {

    const navigate = useNavigate();

    const noticeContext = useContext(NoticeContext)

    const {setShow} = noticeContext

    useEffect(() => {
        // axios.get('/admin/noticias/listar/'+localStorage.getItem('username'),{
            axios.get("/category/all",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'no-cors'
        })
        .then(() => {

        }
        )
        .catch(() => {
            localStorage.clear()
            navigate("/eggnews/login")
        })
    }, [])

    const handleClickAlta = (e) => {
        setShow({
            alta : true,
            baja : false
        })
    }
    const handleClickBaja = (e) => {
        setShow({
            alta : false,
            baja : true
        })
    }
    const handleClickAll = () =>{
        setShow({
            alta : true,
            baja : true
        })
    }

    return (
        <>
            <div className="container text-center">
                <h1>Panel Administrador</h1>
                <Link className="btn btn-primary m-3" to="/eggnews/admin/cargar">Cargar Noticia</Link>
                <Link className="btn btn-primary m-3" to="/eggnews/admin/listar" onClick={handleClickAll}>Todas las noticias</Link>
                <Link className="btn btn-primary m-3" to="/eggnews/admin/listar" onClick={handleClickAlta} >Noticias de alta</Link>
                <Link className="btn btn-primary m-3" to="/eggnews/admin/listar" onClick={handleClickBaja} >Noticias de baja</Link>
            </div>
            <Outlet />
        </>
    )
}