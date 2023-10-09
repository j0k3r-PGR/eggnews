import { useContext } from "react";
import AuthContext from "../../providers/auth";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth
