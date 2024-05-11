import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { Auth, SignIn } from '@supabase/auth-ui-react';


function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT"){
      navigate('/')
    } else {
      navigate('/')
    }
  })

  


  return (
    <div className='bg-slate-700 h-screen pt-10'>
      <div className='bg-slate-100 py-3 rounded-md flex justify-center items-center mx-auto'>
        <Auth 
          supabaseClient={supabase}
          appearance={{theme: SignIn}}
          theme='dark'
          providers={['github']}
        />      
      

      </div>


    </div>
  )
}

export default Login
