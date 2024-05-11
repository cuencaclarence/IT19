import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pic from '../../images/cars 2.jpeg'

import '../../css/customer.css'

import supabase from '../../config/supabaseClient'

//icons

import searchIcon from '../../images/search.png'
import automaticIcon from '../../images/automatic-transmission.png'
import engineIcon from '../../images/car-engine.png'
import colorIcon from '../../images/art.png'
import arrowIcon from '../../images/up-right-arrow.png'
import logoutIcon from '../../images/logout.png'

function CustomerHome() {

    const navigate = useNavigate()

    const customerDataString = localStorage.getItem('customer');
    const customerData = JSON.parse(customerDataString);
    console.log(customerData);

    const [vehicles, setVehicles] = useState(null)
    const [inventory, setInventory] = useState(null)

    useEffect(() => {
        const fetchVehicles = async () => {
          const {data, error} = await supabase
          .from('vehicles')
          .select('vin, Price, model_id(model_name), brand_id(brand_name), color, transmission_type, engine_type')
          

          if (data) {
            setVehicles(data)
          }
        }

        const fetchInventory = async () => {
          const {data, error} = await supabase
          .from('inventory')
          .select('dealer_id, vin(vin, Price, model_id(model_name), brand_id(brand_name), color, transmission_type, engine_type)')

          if(data) {
            setInventory(data)
            console.log(data)
          }
        }

        fetchInventory()
        fetchVehicles()
    },[])

    const handleLogout = () => {
      localStorage.removeItem('customer')
      navigate('/home')
    }


  return (
    <div className='bg-slate-200 h-screen'>
        <div className='background color'>
          <nav className='flex justify-between px-32 pt-4'>
            <section>
              <Link to={'/customer-home'}> <h1 className='text-4xl font-bold'>Ultra cars</h1></Link>
             
            </section>
            <section>
              <ul className='flex gap-2 items-center'>
                <li className='navActiveButton'>Home</li>
                <Link to={'/records'}><li className='inActiveButton'>Records</li></Link>
                <li className='inActiveButton'>About</li>
                <li className='loginButton'>{customerData.name}</li>
                <button onClick={handleLogout}><li><img className='w-7' src={logoutIcon} alt="" /></li></button>
              </ul>
            </section>
          </nav>
          <div className='text-center mt-20'>
            <h2 className='text-xl mb-6'>Cars for sale and rent for you</h2>
            <h1 className='text-6xl font-bold  '>Find Your Perfect Car</h1>
            <div className='flex justify-center mt-10'>
              <ul className='flex gap-6 text-2xl text-white font-semibold'>
                <li className='underline'>All</li>
                <li className='underline'>New</li>
                <li className='underline'>Limed</li>
              </ul>
            </div>
           
            <div className='flex justify-center mt-5'>
              <ul className='flex gap-10 bg-white px-7 py-4 rounded-3xl items-center font-semibold'>
                <li>Any Models</li>
                <li>Any Brands</li>
                <li>Prie of All</li>
                <li className='bg-blue-500 px-4 py-2 rounded-3xl text-white font-semibold flex'><img className='w-4 mr-2' src={searchIcon} alt="" /> Search car</li>
              </ul>
            </div>
            <h2 className='mt-20 text-xl font-bold text-white '>Famous Brands</h2>
            <div className='flex justify-center mt-5'>
              <ul className='flex gap-3'>
                <li className='box1'>BMW</li>
                <li className='box1'>Toyota</li>
                <li className='box1'>Ford</li>
                <li className='box1'>Honda</li>
                <li className='box1'>Audi</li>
              </ul>
            </div>
          </div>
        </div>


        <div className='bg-white px-28 py-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold'>Explore All Vehicles</h1>
          
          </div>

          <div className='grid mt-6'>
            {inventory && inventory.map((vehicle, index) => (
              <div className='mx-3 mt-3 shadow-xl rounded-xl' key={index}>
                <img className='rounded-lg' src={pic} alt=""/>
                <h1 className='ml-5 mt-3'>Model: {vehicle.vin.model_id.model_name}</h1>
                <h2 className='ml-5'>{vehicle.vin.brand_id.brand_name}</h2>
                <div className='border'>
                    <ul className='list'>
                      <li className='box2'><img className='w-8 mr-5' src={automaticIcon} alt="" /> <p>{vehicle.vin.transmission_type}</p></li>
                      <li className='box2'><img className='w-8 mr-5' src={engineIcon} alt="" /> {vehicle.vin.engine_type}</li>
                      <li className='box2'><img className='w-8 mr-5' src={colorIcon} alt="" /> {vehicle.vin.color}</li>
                    </ul>
                </div>
                <div className='py-5 px-6 flex justify-between items-center'>
                  <h2 className='font-semibold text-lg'>${vehicle.vin.Price}</h2>
                  <Link to={'/carInfo/' + vehicle.vin.vin}><p className='text-blue-600 font-medium text-[11px] flex items-center'>View Details <img className='ml-2 w-3 h-3' src={arrowIcon} alt="" /></p></Link>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        <div className='footer'>
            ITE 19 Project
        </div>
    </div>
  )
}

export default CustomerHome
