import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import '../../css/customer.css'

import logoutIcon from '../../images/logout.png'

function Records() {

    const customerDataString = localStorage.getItem('customer');
    const customerData = JSON.parse(customerDataString);
    console.log(customerData)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('customer')
        navigate('/home')
    }

    const [sale, setSale] = useState(null)
    
    




  return (
    <div className='background'>
        <nav className='flex justify-between px-32 pt-4'>
            <section>
                <Link to={'/customer-home'}> <h1 className='text-4xl font-bold'>Ultra cars</h1></Link>
            </section>
            <section>
              <ul className='flex gap-2'>
                <Link to={'/customer-home'}><li className='inActiveButton'>Home</li></Link>
                <li className='navActiveButton'>Records</li>
                <li className='inActiveButton'>About</li>
                <li className='loginButton'>Julia</li>
                <button onClick={handleLogout}><li><img className='w-7' src={logoutIcon} alt="" /></li></button>
              </ul>
            </section>
        </nav>

        <div className='backgoundTransparent'>
            <h1 className='text-white text-xl'>Car Purchased Records</h1>

            <div className='mt-5'>
                <div className='bg-white text-black mb-2 rounded-md grid7'>
                    <div className='bg-slate-300 text-center py-2'>VIN</div>
                    <div className='bg-slate-400 text-center py-2'>Model</div>
                    <div className='bg-slate-300 text-center py-2'>Brand</div>
                    <div className='bg-slate-400 text-center py-2'>Body Style</div>
                    <div className='bg-slate-300 text-center py-2'>Color</div>
                    <div className='bg-slate-400 text-center py-2'>Sale Date</div>
                    <div className='bg-slate-300 text-center py-2'>Price</div>
                </div>
              
                    
            
            </div>
        </div>

        <div className='footer'>
            ITE 19 Project
        </div>

    </div>
  )
}

export default Records
