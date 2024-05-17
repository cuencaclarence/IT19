import React, { useEffect, useState } from 'react'
import supabase from '../../../config/supabaseClient'

//icons
import saleIcon from '../../../images/interest-rate.png'
import customerIcon from '../../../images/group1.png'
import dealerIcon from '../../../images/dealing.png'
import brandIcon from '../../../images/brand.png'


export default function Home() {

  const [inventoryCount, setInventoryCount] = useState(null)
  const [dealersCount, setDealersCount] = useState(null)
  const [brandsCount, setBrandsCount] = useState(null)
  const [customerCount, setCustomerCount] = useState(null)
  const [defectiveCount, setDefectiveCount] = useState(null)
  const [salesCount, setSalesCount] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/salesAll')
      .then(response => response.json())
      .then(data => {
        setSalesCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch('http://127.0.0.1:8000/api/customersAll')
      .then(response => response.json())
      .then(data => {
        setCustomerCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch('http://127.0.0.1:8000/api/brandsAll')
      .then(response => response.json())
      .then(data => {
        setBrandsCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch('http://127.0.0.1:8000/api/dealersAll')
      .then(response => response.json())
      .then(data => {
        setDealersCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });




  }, []);

  return (
    <div>
      <h1 className='text-white text-2xl ml-7 mt-7 font-semibold'>OVERVIEW</h1>
      <div className='homeBoxGrid'>
        <div className='homeBox'>
          <img src={saleIcon} alt="" />
          <p className='text-center'>Total Unit Sales: {salesCount}</p>
        </div>
        <div className='homeBox'>
          <img src={customerIcon} alt="" />
          <p className='text-center'>Total Customers: {customerCount}</p>
        </div>
        <div className='homeBox'>
          <img src={brandIcon} alt=""/>
          <p className='text-center'>Total of Brands: {brandsCount}</p>
        </div>
        <div className='homeBox'>
          <img src={dealerIcon} alt="" />
          <p className='text-center'>Total of Dealers: {dealersCount}</p>
        </div>
      </div>


    
    </div>
  )
}
