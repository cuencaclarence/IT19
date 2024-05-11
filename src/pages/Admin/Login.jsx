import React, { useState } from 'react'
import '../../css/Admin.css'
import pic1 from '../../images/pic 1.jpg'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === 'julia@gmail.com' && password === 'password') {
            navigate('/admin-dashboard')
        } else {
            setError('Invalid email and password')
        }

    }

  return (
    <div className=''>
       <div className='px-16 py-5'>
            <h1 className='text-2xl font-semibold text-white border-b-[1px] pb-2'>Ultra Cars</h1>
            <div className='container'>
                <div>
                    <img className='mt-[90px] rounded-md' src={pic1} alt="" />
                </div>
                <div className='px-10 ml-20 mt-28'>
                    <h1 className='text-white text-3xl ml-10'>Login to yuor Account</h1>
                    <p className='text-white ml-10'>Welcome back Admin!</p>
                    <form className=' mt-10 px-6' onSubmit={handleSubmit}>
                        <p className='text-white'>Email</p>
                        <input 
                            id='email'
                            className='input'
                            type="email" 
                            placeholder='E.g. Shovy@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required

                        />
                        <div>
                            <p className='mt-5 text-white'>Password</p>
                            <input 
                                id='password'
                                className='input'
                                type="text" 
                                placeholder='Enter your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        

                        <button className='text-white text-xl bg-black mt-5 py-3 rounded-md w-[400px]'>Login</button>
                        {error && <p className='text-white text-center mt-2 ml-[-150px]'>{error}</p>}
                    </form>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Login
