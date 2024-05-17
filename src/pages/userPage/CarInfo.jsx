import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import '../../css/customer.css';

//pic
import carPic from '../../images/cars 2.jpeg';
import logoutIcon from '../../images/logout.png';

function CarInfo() {
  const customerDataString = localStorage.getItem('customer');
  const customerData = JSON.parse(customerDataString);
  const navigate = useNavigate();
  const { vin_id } = useParams();
  const [vehicles, setVehicles] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const currentDate = formatDate(new Date());

  const [formData, setFormData] = useState({
    sale_date: currentDate,
    dealer_id: '1',
    customer_id: '1',
    vehicle_id: ''
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/vehiclesAll`)
      .then(response => response.json())
      .then(data => {
        const filteredVehicle = data.find(vehicle => vehicle.vin === vin_id);
        if (filteredVehicle) {
          setVehicles([filteredVehicle]);
          setVehicleId(filteredVehicle.id); // Removed array wrapping
        } else {
          console.log(`No vehicle found with vin_id: ${vin_id}`);
        }
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, [vin_id]);

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      vehicle_id: vehicleId || '' // If vehicleId is null, set it to an empty string
    }));
  }, [vehicleId]);

  const handleLogout = () => {
    localStorage.removeItem('customer');
    navigate('/home');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/salesAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Sale added successfully');
        navigate('/customer-home')
      } else {
        console.error('Failed to add sale');
      }
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  console.log(formData);

  return (
    <div className='background'>
      <nav className='flex justify-between px-32 pt-4'>
        <section>
          <Link to={'/customer-home'}><h1 className='text-4xl font-bold'>Ultra cars</h1></Link>
        </section>
        <section>
          <ul className='flex gap-2 items-center'>
            <li className='navActiveButton'>Home</li>
            <Link to={'/records'}><li className='inActiveButton'>Records</li></Link>
            <li className='inActiveButton'>About</li>
            <li className='loginButton'>Julia</li>
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
          {vehicles && vehicles.length > 0 && (
            <div className='mt-5'>
              <div className='flex ml-5'>
                <p>VIN:</p> <p className='ml-4 w-'>{vehicles[0].vin}</p>
              </div>
              <div className='flex ml-5'>
                <p>Model: </p> <p className='ml-4'>{vehicles[0].models.model_name}</p>
              </div>
              <div className='flex ml-5'>
                <p>Brand: </p> <p className='ml-4'>{vehicles[0].brand.brand_name}</p>
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
                <p>Price: </p> <p className='ml-4 text-xl'>${vehicles[0].price}</p>
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
  );
}

export default CarInfo;
