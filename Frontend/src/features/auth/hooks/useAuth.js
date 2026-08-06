import { useContext , useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register,logout, getMe } from "../services/auth.api.js";



export const useAuth= ()=>{

    const context = useContext(AuthContext);

    const{user , setUser, loading , setLoading}=context



    const handleLogin = async({email , password}) =>{
        setLoading(true)
        try{
            const data = await login({email, password})
            setUser(data.user)
        }
        catch(e){
            return (e)
        }finally{
            setLoading(false)
        }
        
    }

    const handleRegister = async ({username , email, password})=>{
        setLoading(true)
        try{
            const data = await register({username , email , password})
            setUser(data.user)
        }catch(e){
            return (e)
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogout = async()=>{
        setLoading(true)
        
        try{
            await logout()
            setUser(null)
        }catch(e){
            return (e)
        }
        finally{
            setLoading(false)
        }
    }
    //user refreh get logout
    useEffect(()=>{
        const getAndSetUser = async ()=>{
            try{
                const data = await getMe()
                setUser(data.user)
            }catch(err){
                return (err)
            }
            finally{
                setLoading(false)
            }
            
            
        }
        getAndSetUser()
    },[setLoading, setUser])

    return {user , loading , handleRegister, handleLogin , handleLogout}
}