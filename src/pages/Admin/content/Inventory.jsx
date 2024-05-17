import React, { useEffect, useState } from 'react'
import supabase from '../../../config/supabaseClient'

import '../../../css/dealer.css'

function Inventory() {

  const [inventory, setInventory] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/api/inventoryAll').then(response => response.json()),
      fetch('http://127.0.0.1:8000/api/dealersAll').then(response => response.json()),
      fetch('http://127.0.0.1:8000/api/vehiclesAll').then(response => response.json())
    ])
      .then(([inventoryData, dealersData, vehiclesData]) => {
        const inventoryWithDetails = inventoryData.map(item => {
          const dealer = dealersData.find(dealer => dealer.id === item.dealer_id);
          const vehicle = vehiclesData.find(vehicle => vehicle.id === item.vehicle_id);
          return {
            ...item,
            dealer_name: dealer ? dealer.dealer_name : 'Unknown Dealer',
            vin: vehicle ? vehicle.vin : 'Unknown VIN'
          };
        });
        setInventory(inventoryWithDetails);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(inventory)

 
  // Function to find the dealer with the longest stored inventory
  const findLongestStoringDealer = () => {
    if (inventory) {
      const earliestDate = inventory[0].date_stored; // Assuming inventory is sorted by date
      const longestStoringDealer = inventory.find(item => item.date_stored === earliestDate);
      const currentDate = new Date();
      const storedDate = new Date(earliestDate);
      const differenceInDays = Math.floor((currentDate - storedDate) / (1000 * 60 * 60 * 24));
      return { dealerName: longestStoringDealer.dealer_name, daysStored: differenceInDays };
    }
    return { dealerName: "No data available", daysStored: 0 };
  }


  return (
    <div className='grid22'>
      <div className='px-3 py-3'>
        <div className='grid4 text-white mb-3'>
          <p className='text-center text-lg font-semibold'>ID</p>
          <p className='text-center text-lg font-semibold'>Dealer name</p>
          <p className='text-center text-lg font-semibold'>VIN</p>
          <p className='text-center text-lg font-semibold'>Date Stored</p>
        </div>
        {inventory && inventory.map((inven, index) => (
          <div className='bg-white py-2 rounded-sm grid4 mb-1' key={index}>
            <p className='text-center'>{inven.id}</p>
            <p className='text-center'>{inven.dealer_name}</p>
            <p className='text-center'>{inven.vin}</p>
            <p className='text-center'>{inven.date_stored}</p>
          </div>
        ))}
      </div>
      <div className='text-white pt-10 border-edit'>
        <h1 className='text-xl text-center mb-5'>Summary Data</h1>
        <div>
          <p className='text-center'>Dealer with longest stored inventory: {findLongestStoringDealer().dealerName}</p>
          <p className='text-center'>Days stored: {findLongestStoringDealer().daysStored} days</p>
        </div>
      </div>
    </div>
  )
}

export default Inventory
