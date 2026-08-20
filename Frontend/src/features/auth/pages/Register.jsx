import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import toast from 'react-hot-toast'

export const Register = () => {

    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(!username || !email || !password){
            toast.error("Please fill in all fields")
            return
        }
        
        const result = await handleRegister({ username, email, password })
        
        if(result instanceof Error || (result && result.response)){
            toast.error(result?.response?.data?.message || "Registration failed")
        } else {
            toast.success("Successfully registered! Please login.")
            navigate('/login')
        }
    }


    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">UserName</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id='username'
                            name='username'
                            placeholder='Enter UserName'
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Enter Email Address'
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Enter password'
                        />
                    </div>

                    <button className='button primary-button' disabled={loading}>
                        {loading ? <><span className="spinner"></span>Registering...</> : 'Register'}
                    </button>
                </form>

                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register;