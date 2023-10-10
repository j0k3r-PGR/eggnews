import { Link, Outlet } from "react-router-dom"

export default function SuperUserAdmin(){
    return(
        <>
            <h2>SuperAdminUser</h2>
            <div>
                <Link className="btn btn-primary m-3" to="/eggnews/superusers/listar">Listar</Link>
                <Link className="btn btn-primary m-3" to="/eggnews/superusers/cargar">Cargar</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}