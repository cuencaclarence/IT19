import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'

function Add() {

  const navigate = useNavigate()
  const [brand_name, setBrandName] = useState('')
  const [brand_supplier, setBrandSupplier] = useState('')
  const [formError, setFormError] = useState(null)
  const [success, setSuccess] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!brand_name || !brand_supplier) {
      setFormError('kulangan ug data')
      return
    }

    const { data, error } = await supabase
      .from('brands')
      .insert([{brand_name, brand_supplier}])
      .select()

      if (error) {
        setFormError('error siya')
        console.log(error)
      }

      if(data){
        setFormError(null)
        console.log(data)
        setBrandName('')
        setBrandSupplier('')
        setSuccess('Added Brand Successful')
      }
  }


  return (
    <div>
      <h1>Add Brand</h1>
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
          <label htmlFor="brand_name">Brand Name:</label>
          <input 
            type="text" 
            id='brand_name'
            value={brand_name}
            onChange={(e) => setBrandName(e.target.value)}
          />

          <label htmlFor="brand_supplier">Brand Supplier:</label>
          <input 
            type="text" 
            id='brand_supplier'
            value={brand_supplier}
            onChange={(e) => setBrandSupplier(e.target.value)}
          />

          <button className='px-3 py-1 bg-slate-500 rounded-sm mx-3 hover:bg-green-500'>Create</button>

          {formError && <p>{formError}</p>}
      </form>

    </div>
  )
}

export default Add
