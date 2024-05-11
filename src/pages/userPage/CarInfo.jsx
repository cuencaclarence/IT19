import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import '../../css/customer.css'

//pic
import carPic from '../../images/cars 2.jpeg'
import logoutIcon from '../../images/logout.png'

function CarInfo() {

    const currentDate = new Date()

    const customerDataString = localStorage.getItem('customer');
    const customerData = JSON.parse(customerDataString);
    console.log(customerData)

    const navigate = useNavigate()

    const {vin_id} = useParams()
    const [vehicles, setVehicles] = useState(null)
    const [inventory, setInventory] = useState(null)

    const [sale_date, setSaleDate] = useState(currentDate)
    const [dealer_id, setDealerId] = useState(1)
    const [customer_id, setCustomerId] = useState(customerData.customer_id)
    const [vin, setVin] = useState(vin_id)
    const [created_at, setCreatedAt] = useState(currentDate)

    console.log(currentDate)

    const handleLogout = () => {
        localStorage.removeItem('customer')
        navigate('/home')
    }

    useEffect (() => {
        const fetchVehicles = async () => {
            const {data, error} = await supabase
            .from('vehicles')
            .select('Price, bodystyle, brand_id(brand_name), color, engine_type, model_id(model_name), transmission_type, vin')
            .eq('vin', vin_id)

            if(data) {
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
    }, [])

    const handleSubmit = async () => {
        const {data, error} = await supabase
        .from('sales')
        .insert([{sale_date, dealer_id, customer_id, vin, created_at}])
        .select()

        if (data) {
            navigate('/customer-home')
        }
    }

  return (
    <div className='background'>
        <nav className='flex justify-between px-32 pt-4'>
            <section>
              <h1 className='text-4xl font-bold'>Ultra cars</h1>
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

        <div className='grid2 mt-10 backgoundTransparent'>
            <div>
                <img src={carPic} alt="" />
            </div>
            <div className='text-white px-10'>
                <h1 className='text-xl font-semibold border-b-2 pb-3'>Car Information</h1>
                {vehicles && (
                <div className='mt-5'>
                    <div className='flex ml-5'>
                        <p>VIN:</p> <p className='ml-4 w-'>{vehicles[0].vin}</p>
                    </div>
                    <div className='flex ml-5'>
                        <p>Model: </p> <p className='ml-4'>{vehicles[0].model_id.model_name}</p>
                    </div>
                    <div className='flex ml-5'>
                        <p>Brand: </p> <p className='ml-4'>{vehicles[0].brand_id.brand_name}</p>
                    </div>
                    <div className='flex ml-5'>
                        <p>Transmission Type: </p> <p className='ml-4'>{vehicles[0].transmission_type}</p>
                    </div>
                    <div className='flex ml-5'>
                        <p>Engine Type: </p> <p className='ml-4'>{vehicles[0].engine_type}</p>
                    </div>
                    <div className='flex ml-5'>
                        <p>Color: </p> <p className='ml-4'>{vehicles[0].color}</p>
                    </div>
                    <div className='flex items-center mt-4 ml-5'>
                        <p>Price: </p> <p className='ml-4 text-xl'>${vehicles[0].Price}</p>
                    </div>

                    <button onClick={handleSubmit} className='buy'>Buy</button>
                </div>
                )}
                
            </div>
        </div>
        <div className='footer'>
            ITE 19 Project
        </div>
      
    </div>
  )
}

export default CarInfo
