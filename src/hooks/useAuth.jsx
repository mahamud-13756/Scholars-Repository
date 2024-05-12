import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
    console.log("use auth is is called.")
    const auth = useContext(AuthContext);
    return auth;
}

export default useAuth;