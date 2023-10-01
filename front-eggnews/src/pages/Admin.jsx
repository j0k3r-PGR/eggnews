import { Outlet } from "react-router-dom"

export default function Admin(){
    return(
        <>
            <div className="container">
                <h1>Panel Administrador</h1>
            </div>
            <Outlet />
        </>
    )
}