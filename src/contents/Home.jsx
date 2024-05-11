import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import supabase from '../config/supabaseClient'

import BrandCard from '../components/brandCard'

function Home() {
  
  const [fetchError, setFetchError] = useState(null)
  const [brands, setBrands] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const [ascending, setAscending] = useState(true)


  const handleDelete = (id) => {
    setBrands(prevBrands => {
      return prevBrands.filter(br => br.brand_id != id)
    })
  }

  useEffect (() => {
    const fetchbrands = async () => {
      const {data, error} = await supabase
        .from('brands')
        .select()
        .order(orderBy, {ascending: ascending})

        if (error) {
          setFetchError('error siya')
          setBrands(null)
          console.log(error)
        }
        if (data) {
          setBrands(data)
          setFetchError(null)
          console.log(data)
        }
    }
    fetchbrands()
  }, [orderBy, ascending])



  return (
    <div>
      <h1>Home</h1>

      <div className='px-5'>
        {fetchError && (<p>{fetchError}</p>)}
        {brands && (
         <div> 
          <div>
            <h2>Order:</h2>
            <div>
              <p className='cursor' onClick={() => setOrderBy('brand_name')}>brand_name</p>
              <p className='cursor' onClick={() => setOrderBy('created_at')}>Created at</p>
              <p className='cursor' onClick={() => setOrderBy('brand_id')}>id</p>
              {orderBy}
            </div>
          </div>
          <div  className='brand-grid'> 
            {brands.map(brand => (
              <div key={brand.brand_id}>
                <BrandCard key={brand.brand_id} brand={brand} onDelete={handleDelete} />
              </div>
              
            ))}
          </div>

         </div>
        )}
      </div>
      
    </div>
  )
}

export default Home
