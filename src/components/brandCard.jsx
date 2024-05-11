import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"


const BrandCard = ({brand, onDelete}) => {

    const handleSubmit = async () => {
        const {data, error} = await supabase
            .from('brands')
            .delete()
            .eq('brand_id', brand.brand_id)
            .select()

        if (data) {
            console.log(data)
            onDelete(brand.brand_id)
        }
        if (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-green-700 brand-card">
            <h1>{brand.brand_name}</h1>
            <p>{brand.brand_id}</p>
            <Link to={'/dashboard/' + brand.brand_id}>edit</Link>
            <p className="cursor hover:text-green-700" onClick={handleSubmit}>Delete</p>
        </div>
    )
}

export default BrandCard
