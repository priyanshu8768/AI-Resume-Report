import { useState } from 'react'
import { useNavigate , Link } from 'react-router'
import "../auth.form.scss" 
import { useAuth } from '../hooks/useAuth.js'
import toast from 'react-hot-toast'


const Login = ()=>{

    const {loading , handleLogin} = useAuth()
    const [email,setEmail] = useState("")
    const[password, setPassword] = useState("")

    

    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(!email || !password){
            toast.error("Please fill in all fields")
            return
        }
        
        const result = await handleLogin({email, password})
        
        // useAuth returns the error if it fails, otherwise undefined or null
        if(result instanceof Error || (result && result.response)){
            toast.error(result?.response?.data?.message || "Invalid email or password")
        } else {
            toast.success("Login successful!")
            navigate('/')
        }
    }
    

    return(
        <main>
            <div className="form-container">
            <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email" id='email' name='email' placeholder='Enter Email Address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={(e)=>{setPassword(e.target.value)}}
                         type="password" id='password' name='password' placeholder='Enter password' />
                    </div>

                    <button className='button primary-button' disabled={loading}>
                        {loading ? <><span className="spinner"></span>Logging in...</> : 'Login'}
                    </button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
            
        </main>
    )
}

export default Login ;