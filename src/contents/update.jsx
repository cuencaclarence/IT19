import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../config/supabaseClient'

function Update() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [brand_name, setBrandName] = useState('')
    const [brand_supplier, setBrandSupplier] = useState('')
    const [success, setSuccess] = useState(null)
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!brand_name || !brand_supplier) {
            setFormError('kulangan ug data')
            return
        }

        const {data, error} = await supabase
            .from('brands')
            .update({brand_name, brand_supplier})
            .eq('brand_id', id)
            .select()
           
        if (error) {
            setFormError('kulangan ug data')
            console.log(error)
        }
        if (data) {
            setFormError(null)
            setSuccess('update success')
            navigate('/dashboard')
        }

    }

    useEffect(() => {
        const fetchBrands = async () => {
            const {data, error} = await supabase
                .from('brands')
                .select()
                .eq('brand_id', id)
                .single()

            if (error) {
                navigate('/', {replace: true})
            }

            if (data) {
                setBrandName(data.brand_name)
                setBrandSupplier(data.brand_supplier)
                console.log(data)
            }
        }

        fetchBrands()
    }, [id, navigate])

    return (
        <div>
            <h1>Update - {id}</h1>

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

          <button className='px-3 py-1 bg-slate-500 rounded-sm mx-3 hover:bg-green-500'>Update</button>

          {formError && <p>{formError}</p>}
      </form>

        </div>
    )
}

export default Update
