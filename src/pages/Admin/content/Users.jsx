import React, { useState, useEffect } from 'react'
import supabase from '../../../config/supabaseClient'

export default function Users() {

  const [customers, setCustomers] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const [customerCount, setCustomerCount] = useState(0)

  useEffect (() => {
    const fetchCustomers = async () => {
      const {data, error} = await supabase
      .from('customers')
      .select()

      if (error) {
        setFetchError('error')
      }

      if (data) {
        setCustomers(data)
        setFetchError(null)
        console.log(data)
        setCustomerCount(data.length)
      } 
    }
    fetchCustomers()
  }, [])


  return (
    <div> 
      <div className='mx-10 mt-5'>
        <p className='text-white text-lg font-semibold'>Total customers: {customerCount}</p>
      </div>
     

      {customers && 
        <div className="container px-10">
        <table className=" border w-[1200px] rounded-sm">
          <thead>
            <tr>
              <th className='bg-slate-100 w-[70px]'>ID</th>
              <th className='bg-slate-600 w-[200px]'>Name</th>
              <th className='bg-slate-100 w-[300px]'>Address</th>
              <th className='bg-slate-600 w-[170px]'>Phone</th>
              <th className='bg-slate-100 w-[110px]'>Gender</th>
              <th className='bg-slate-600 w-[130px]'>Annual Income</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr className='text-white border py-3' key={index}>
                <td className='text-center'>{customer.customer_id}</td>
                <td className='pl-3'>{customer.name}</td>
                <td className='pl-3'>{customer.address}</td>
                <td className='text-center'>{customer.phone}</td>
                <td className='text-center'>{customer.gender}</td>
                <td className='text-center'>{customer.annual_income}</td>
              </tr>
            ))}
          
          </tbody>
        </table>
      </div>
      }
    </div>
  )
}
