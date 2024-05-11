import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import supabase from '../../config/supabaseClient'

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const {data, error} = await supabase
      .from('dealers')
      .select()
      .eq('email', email)
      .eq('password', password)
      .limit(1)


      if (error){
          console.log(error)
          
      }
      if (data && data.length === 1) {
          localStorage.setItem('dealer', JSON.stringify(data[0]));
          navigate('/dashboardDealer')
      } else{
          setError('invalid email and password')
      }
  } catch (error) {
      console.log('error')
  }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500">
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <h1 className='text-center text-2xl font-semibold mb-4'>Dealer Login</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
         <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          
        </div>
      </form>
      </div>
      
    </div>
  );
}

export default Login;
