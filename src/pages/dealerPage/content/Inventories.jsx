import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../../config/supabaseClient';

export default function Inventories() {

  const currentDate = new Date()

  const dealerDataString = localStorage.getItem('dealer');
  const dealerData = JSON.parse(dealerDataString);

  const [inventory, setInventory] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [vin, setSelectedVehicle] = useState(null); // State to store selected vehicle
  const [showAddDiv, setShowAddDiv] = useState(false); // State to manage visibility of the add div

  const [date_stored, setDateStored] = useState(currentDate)
  const [dealer_id, setDealerID] = useState(dealerData.dealer_id)
 

  useEffect(() => {
    const fetchInventories = async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('id, date_stored, dealer_id(dealer_name), vin(vin, brand_id(brand_name), model_id(model_name), bodystyle, color, engine_type, transmission_type, plant_id(plant_name), Price)')
        .eq('dealer_id', dealerData.dealer_id);

      if (data) {
        setInventory(data);
        console.log(data)
      }
    };
    fetchInventories();

    const fetchVehicles = async () => {
      const {data, error} = await supabase
      .from('vehicles')
      .select('vin, bodystyle, brand_id(brand_name), model_id(model_name)');

      if (data) {
        setVehicles(data);
        
      }
    };
    fetchVehicles();
  }, []);

  console.log(vin, date_stored, dealer_id)

  const handleAdd = async () => {
    const {data, error} = await supabase
    .from('inventory')
    .insert([{vin, dealer_id, date_stored}])
    .select()

    if (data) {
      setShowAddDiv(false)
    }
  }


 

 

  return (
    <div>
      <div className='text-center pt-4'>
        <h1 className='text-3xl font-bold mt-3'>INVENTORIES</h1>
      </div>

      <div className=''>
        {/* Button to toggle visibility of the add div */}
        <button className='add' onClick={() => setShowAddDiv(!showAddDiv)}>ADD</button>
      </div>

      {/* Conditionally render the add div based on the state */}
      {showAddDiv && (
        <div className='mt-5 ml-5 addinsert'>
          {/* Content of the add div */}
          <p className='text-xl ml-5 mb-3 font-semibold'>NEW DATA</p>
          <div className='grid44 text-center'>
            <p className='back3 font-semibold'>Vehicles</p>
          </div>
          <div className='grid44 text-center'>
            <select 
              className='back3' 
              onChange={(e) => setSelectedVehicle(e.target.value)} 
              value={vin}
            >
              <option value="">Select a vehicle</option>
              {vehicles && vehicles.map((vehicle, index) => (
                <option key={index} value={vehicle.vin}>{vehicle.bodystyle} - {vehicle.brand_id.brand_name} - {vehicle.model_id.model_name}</option>
              ))}
            </select>
            <button onClick={handleAdd} className='button4'>Submit</button>
          </div>
         
          
        </div>
      )}

      <div className='mt-5'>
        <div className='grid6 text-center'>
          <p className='back3 font-semibold'>ID</p>
          <p className='back4 font-semibold'>Date</p>
          <p className='back3 font-semibold'>VIN</p>
          <p className='back4 font-semibold'>Model</p>
          <p className='back3 font-semibold'>Brand</p>
          <p className='back4 font-semibold'>Body Style</p>
          <p className='back3 font-semibold'>Price</p>
        </div>
        {inventory && inventory.map((inven, index) => (
          <div className='grid6 text-center rounded-md' key={index}>
            <p className='back3'>{inven.id}</p>
            <p className='back4'>{inven.date_stored}</p>
            {inven.vin && (
              <>
                <p className='back3'>{inven.vin.vin}</p>
                {inven.vin.model_id && (
                  <p className='back4'>{inven.vin.model_id.model_name}</p>
                )}
                {inven.vin.brand_id && (
                  <p className='back3'>{inven.vin.brand_id.brand_name}</p>
                )}
                <p className='back4'>{inven.vin.bodystyle}</p>
                <p className='back3'>${inven.vin.Price}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
