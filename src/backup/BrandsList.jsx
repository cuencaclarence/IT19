import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';

function SuppliersList() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        // Fetch data from the supplier table
        const { data: suppliersData, error } = await supabase
          .from('supplier')
          .select('id, name, location, company');

        if (error) {
          throw error;
        }

        // For each supplier, fetch the brands connected to it
        const suppliersWithBrands = await Promise.all(
          suppliersData.map(async (supplier) => {
            const { data: brandsData, error: brandsError } = await supabase
              .from('brands')
              .select('brand_id, brand_name')
              .eq('brand_supplier', supplier.id);

            if (brandsError) {
              throw brandsError;
            }

            return { ...supplier, brands: brandsData };
          })
        );

        // Set the retrieved data to state
        setSuppliers(suppliersWithBrands);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSuppliers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Suppliers List</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            <div>Name: {supplier.name}</div>
            <div>Location: {supplier.location}</div>
            <div>Company: {supplier.company}</div>
            <div>Brands:</div>
            <ul>
              {supplier.brands.map((brand) => (
                <li key={brand.brand_id}>
                    {brand.brand_id}
                    {brand.brand_name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuppliersList;
