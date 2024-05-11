import React, { useState } from 'react'
import '../../css/customer.css'
import pic1 from '../../images/pic 1.jpg'
import { useNavigate } from 'react-router-dom'

import supabase from '../../config/supabaseClient'

function LoginPage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data, error} = await supabase
            .from('customers')
            .select()
            .eq('email', email)
            .eq('password', password)
            .limit(1)


            if (error){
                console.log(error)
                
            }
            if (data && data.length === 1) {
                localStorage.setItem('customer', JSON.stringify(data[0]));
                navigate('/customer-home')
            } else{
                setError('invalid email and password')
            }
        } catch (error) {
            console.log('error')
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
                    <h1 className='text-white text-3xl ml-10'>Login to your Account</h1>
                    <p className='text-white ml-10'>Welcome back User!</p>
                  
                    <form className='mt-10 px-6' onSubmit={handleSubmit}>
                        <div>
                            <p className='text-white mb-2 text-xl'>Email</p>
                            <input 
                                id='email'
                                className='input'
                                type="email" 
                                placeholder='E.g. Shovy@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required

                            />
                        </div>
                        <div>
                            <p className='text-white mb-2 text-xl mt-5'>Password</p>
                            <input 
                                id='password'
                                className='input'
                                type="password" 
                                placeholder='Enter your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        

                        <button className='text-white text-xl bg-black mt-5 py-3 rounded-md w-[400px] '>Login</button>
                        {error && <p className='text-slate-500 mt-3 ml-28'>{error}</p>}
                      
                    </form>
                </div>
            </div>
       </div>
    </div>
  )
}

export default LoginPage
