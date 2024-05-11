import React, { useEffect, useState } from 'react'
import supabase from '../../../config/supabaseClient'

import '../../../css/dealer.css'

function Inventory() {

  const [inventory, setInventory] = useState(null)

  useEffect (() => {
    const fetchInventory = async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('id, date_stored, vin, dealer_id(dealer_name)')
        .order('date_stored', { ascending: true }) // Sort by date_stored in ascending order

      if (data) {
        setInventory(data)
        console.log(data)
      } 
    }
    fetchInventory()
  }, [])
 
  // Function to find the dealer with the longest stored inventory
  const findLongestStoringDealer = () => {
    if (inventory) {
      const earliestDate = inventory[0].date_stored; // Assuming inventory is sorted by date
      const longestStoringDealer = inventory.find(item => item.date_stored === earliestDate);
      const currentDate = new Date();
      const storedDate = new Date(earliestDate);
      const differenceInDays = Math.floor((currentDate - storedDate) / (1000 * 60 * 60 * 24));
      return { dealerName: longestStoringDealer.dealer_id.dealer_name, daysStored: differenceInDays };
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
            <p className='text-center'>{inven.dealer_id.dealer_name}</p>
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
