import React, { useEffect, useState } from 'react'
import supabase from '../../../config/supabaseClient';
import saleIcon from '../../../images/interest-rate.png'

export default function Home() {

  const [sale, setSale] = useState(null);
  const [vehicles, setVehicles] = useState(null)

  const dealerDataString = localStorage.getItem('dealer');
  const dealerData = JSON.parse(dealerDataString);

  useEffect(() => {
    const fetchVehicles = async () => {
      const {data, error} = await supabase
      .from('sales')
      .select()
      .eq('dealer_id', dealerData.dealer_id)
      

      if (data) {
        setSale(data.length)
        console.log(data)
      }
    }

    fetchVehicles()
},[])

  console.log(dealerData.dealer_id)

  return (
    <div>
        <div className='p-2 ml-[50px] mt-[100px] shadow-xl w-[130px] text-center'>
          <img className='w-[130px]' src={saleIcon} alt="" />
          <p>Sale: {sale}</p>
        </div>
    </div>
  )
}
