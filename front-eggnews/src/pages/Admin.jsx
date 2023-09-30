import { Outlet } from "react-router-dom"

export default function Admin(){
    return(
        <>
            <h2>Admin</h2>
            <Outlet />
        </>
    )
}