import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAdmin=() =>{
    const {user,loading} = useAuth();
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey:['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/users/admin/${user?.email}`)
            const data = await res.json();
            console.log('is admin response', data.admin);
            return data.admin;
        }
    })
    return [isAdmin,isAdminLoading]
}
export default useAdmin;