import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import supabase from '../../../config/supabaseClient';

export default function Sales() {
  const [salesByBrand, setSalesByBrand] = useState([]);
  const [sales, setSales] = useState(null);
  const [salesCount, setSalesCount] = useState(0);
  const [salesByMonth, setSalesByMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('sales')
          .select('sale_id, sale_date, vin(vin, brand_id(brand_name), model_id(model_name)), customer_id(name)');

        if (error) {
          throw error;
        }

        if (data) {
          setSalesCount(data.length);
          setSales(data);

          const brandSalesCount = {};
          const monthSalesCount = {};

          data.forEach((sale) => {
            const brandName = sale.vin?.brand_id?.brand_name;
            if (brandName) {
              brandSalesCount[brandName] = (brandSalesCount[brandName] || 0) + 1;
            }

            const saleDate = new Date(sale.sale_date);
            const month = saleDate.getMonth(); // Extract month from sale date
            monthSalesCount[month] = (monthSalesCount[month] || 0) + 1;
          });

          const salesByBrandArray = Object.entries(brandSalesCount).map(([brandName, count]) => ({
            brand_name: brandName,
            totalSales: count,
          }));

          setSalesByBrand(salesByBrandArray);

          const salesByMonthArray = Object.entries(monthSalesCount).map(([month, count]) => ({
            month: Number(month) + 1, // Add 1 to convert month index to month number
            totalSales: count,
          }));

          setSalesByMonth(salesByMonthArray);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error.message);
      }
    };

    fetchData();
  }, []);

  const lineChartData = sales
    ? sales.map((sale, index) => [sale.sale_date, index + 1])
    : [];

  const options = {
    chart: {
      title: 'Total Sales Over Time',
      subtitle: 'in millions of dollars (USD)'
    },
    width: 600, // Adjusted width
    height: 300,
    hAxis: {
      title: 'Sale Date',
    },
    vAxis: {
      title: 'Total Sales',
    },
  };

  return (
    <div className='container'>
      <div className='ml-5 mt-5 pb-7'>
        <Chart
          width={'600px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[['Brand', 'Total Sales'], ...salesByBrand.map(({ brand_name, totalSales }) => [brand_name, totalSales])]}
          options={{
            title: 'Brand Sales',
            pieHole: 0.4,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        <Chart
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[['Sale Date', 'Total Sales'], ...lineChartData]}
          options={options}
        />
        <Chart
          width={'600px'}
          height={'300px'}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[['Month', 'Total Sales'], ...salesByMonth.map(({ month, totalSales }) => [`Month ${month}`, totalSales])]}
          options={{
            title: 'Sales by Month',
            hAxis: {
              title: 'Month',
            },
            vAxis: {
              title: 'Total Sales',
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        
      </div>
      <div className='mt-10'>
        <h1 className='text-white ml-12 text-xl font-semibold'>Records</h1>
        <h1 className='text-white ml-12 '>Total sale: {salesCount}</h1>
        {sales && 
          <div className="container px-10">
            <table className=" border w-[600px] rounded-sm">
              <thead>
                <tr>
                  <th className='bg-slate-100 w-[70px]'>ID</th>
                  <th className='bg-slate-600 w-[250px]'>VIN</th>
                  <th className='bg-slate-100 w-[250px]'>Customer Buyer</th>
                  <th className='bg-slate-600 w-[170px]'>Brand</th>
                  <th className='bg-slate-100 w-[110px]'>Model</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr className='text-white border py-3 text-center' key={index}>
                    <td className='text-center'>{sale.sale_id}</td>
                    <td>{sale.vin.vin}</td>
                    <td>{sale.customer_id.name}</td>
                    <td>{sale.vin.brand_id.brand_name}</td>
                    <td>{sale.vin.model_id.model_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>

     
    </div>
  );
}
