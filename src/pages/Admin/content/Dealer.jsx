import React, { useState, useEffect } from 'react'
import supabase from '../../../config/supabaseClient'

function Dealer() {

    const [dealers, setdealers] = useState(null)
    const [fetchError, setFetchError] = useState(null)
    const [dealerCount, setDealerCount] = useState(0)

    const [showAddDiv, setShowAddDiv] = useState(false);


    const [dealer_name, setDealer_name] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/dealersAll')
        .then(response => response.json())
        .then(data => {
          setdealers(data);
          setDealerCount(data.length)
        })
        .catch(error => {
          console.error('Error fetching customer data:', error);
        });
    }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
        const {data, error} = await supabase
        .from('dealers')
        .insert([{dealer_name, address, phone, email, password}])
        .select()
       
        if (data) {
          setShowAddDiv(false)
        }

        if(error) {
          console.log(error)
        }

       
      
    } catch (error) {
        console.log('error')
    }

}



  return (
    <div> 
      <div className='mx-10 mt-5'>
        <p className='text-white text-lg font-semibold'>Total Dealers: {dealerCount}</p>
      </div>

      <button className='addDealer' onClick={() => setShowAddDiv(!showAddDiv)}>Add Dealer</button>

      {showAddDiv && (
        <div className='mt-5 addDealerDiv'>
          {/* Content of the add div */}
          <div>
          <form className='mt-10 px-6' onSubmit={handleSubmit}>
            <div className='dealer_grid'>
              <p className='text-white widtdealer text-xl'>Dealer Name</p>
              <input 
                  className='dealerInput'
                  type="text" 
                  placeholder='enter a name'
                  value={dealer_name}
                  onChange={(e) => setDealer_name(e.target.value)}
                  required
              />
            </div>
            <div className='dealer_grid'>
              <p className='text-white widtdealer text-xl'>Address</p>
              <input 
                  className='dealerInput'
                  type="text" 
                  placeholder='enter a Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
              />
            </div>
             <div className='dealer_grid'>
              <p className='text-white widtdealer text-xl'>Phone</p>
              <input 
                  className='dealerInput'
                  type="text" 
                  placeholder='enter a Phone #'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
              />
            </div>
            <div className='dealer_grid'>
              <p className='text-white widtdealer text-xl'>Email</p>
              <input 
                  className='dealerInput'
                  type="email" 
                  placeholder='enter an Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            <div className='dealer_grid'>
              <p className='text-white widtdealer text-xl'>Password</p>
              <input 
                  className='dealerInput'
                  type="text" 
                  placeholder='enter a Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            

            <button className='text-white text-lg bg-black mt-5 py-2 rounded-md w-[150px] '>Submit</button>
           
              
            </form>
          </div>
        </div>
      )}
     

      {dealers && 
        <div className="container px-10">
        <table className=" border w-[1200px] rounded-sm">
          <thead>
            <tr>
              <th className='bg-slate-100 w-[70px]'>ID</th>
              <th className='bg-slate-600 w-[200px]'>Name</th>
              <th className='bg-slate-100 w-[300px]'>Address</th>
              <th className='bg-slate-600 w-[170px]'>Phone</th>
             
            </tr>
          </thead>
          <tbody>
            {dealers.map((dealer, index) => (
              <tr className='text-white border py-3' key={index}>
                <td className='text-center'>{dealer.id}</td>
                <td className='pl-3'>{dealer.dealer_name}</td>
                <td className='pl-3'>{dealer.address}</td>
                <td className='text-center'>{dealer.phone}</td>
        
              </tr>
            ))}
          
          </tbody>
        </table>
      </div>
      }
    </div>
  )
}

export default Dealer
