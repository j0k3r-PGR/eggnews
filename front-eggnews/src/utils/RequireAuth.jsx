import { Navigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/auth/useAuth.hook";

export default function RequireAuth({children}){

    const token = localStorage.getItem('token')

    const location = useLocation()

    return (
            token
            ?
            children
            :
            <Navigate to="/eggnews/login" state={{ from : location}} replace />
    )
}