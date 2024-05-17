import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import supabase from '../../../config/supabaseClient';

export default function ChartColumn() {
  const [salesByBrand, setSalesByBrand] = useState([]);
  const [sales, setSales] = useState(null);
  const [salesCount, setSalesCount] = useState(0);
  const [salesByMonth, setSalesByMonth] = useState([]);
  
  const brandMapping = {
    1: 'Honda',
    2: 'Toyota',
    3: 'Audi',
    4: 'BMW',
    5: 'Ford',
    // Add more mappings as needed
  };

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/api/salesAll').then(response => response.json()),
      fetch('http://127.0.0.1:8000/api/customersAll').then(response => response.json()),
      fetch('http://127.0.0.1:8000/api/dealersAll').then(response => response.json()),
      fetch('http://127.0.0.1:8000/api/vehiclesAll').then(response => response.json())
    ])
      .then(([salesData, customersData, dealersData, vehiclesData]) => {
        const processedSales = salesData.map(item => {
          const customer = customersData.find(customer => customer.id === item.customer_id);
          const dealer = dealersData.find(dealer => dealer.id === item.dealer_id);
          const vehicle = vehiclesData.find(vehicle => vehicle.id === item.vehicle_id);
          const saleDate = new Date(item.sale_date);
          const formattedDate = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, '0')}-${saleDate.getDate().toString().padStart(2, '0')}`;
          return {
            ...item,
            name: customer ? customer.name : 'unknown Customer',
            dealer_name: dealer ? dealer.dealer_name : 'Unknown Dealer',
            vin: vehicle ? vehicle.vin : 'Unknown VIN',
            brand_id: vehicle ? vehicle.brand_id : 'unknown brand',
            model_id: vehicle ? vehicle.model_id : 'unknown model',
            date: formattedDate,
          };
        });
        setSales(processedSales);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (sales && sales.length > 0) {
      const salesByBrandAndDate = sales.reduce((acc, curr) => {
        const { date, brand_id } = curr;
        if (!acc[date]) {
          acc[date] = {};
        }
        if (!acc[date][brand_id]) {
          acc[date][brand_id] = 0;
        }
        acc[date][brand_id]++;
        return acc;
      }, {});

      const chartData = Object.entries(salesByBrandAndDate).map(([date, brandCounts]) => {
        const data = [date];
        Object.values(brandCounts).forEach(count => {
          data.push(count);
        });
        return data;
      });

      setSalesByBrand(chartData);
    }
  }, [sales]);

  const salesByBrandAndMonth = {};

  sales && sales.forEach(sale => {
    const date = new Date(sale.date);
    const month = date.toLocaleString('default', { month: 'long' });
    if (!salesByBrandAndMonth[month]) {
      salesByBrandAndMonth[month] = {};
    }
    const brandId = sale.brand_id;
    salesByBrandAndMonth[month][brandId] = (salesByBrandAndMonth[month][brandId] || 0) + 1;
  });

  const chartData1 = [['Month', ...Object.keys(brandMapping)]];

  Object.keys(salesByBrandAndMonth).forEach(month => {
    const rowData = [month];
    Object.keys(brandMapping).forEach(brandId => {
      rowData.push(salesByBrandAndMonth[month][brandId] || 0);
    });
    chartData1.push(rowData);
  });

  const lineChartData = sales ? sales.map((sale, index) => [sale.sale_date, index + 1]) : [];

  const options = {
    chart: {
      title: 'Total Sales Over Time',
      subtitle: 'in millions of dollars (USD)'
    },
    width: 600,
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
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={chartData1}
          options={{
            title: 'Sales by Brand and Month',
            hAxis: {
              title: 'Month',
            },
            vAxis: {
              title: 'Total Sales',
            },
            series: {
              0: { color: 'orange', labelInLegend: '4-BMW' },   // 5: Honda
              1: { color: 'red', labelInLegend: '2-Ford' },    // 2: Toyota
              2: { color: 'green', labelInLegend: '1-Honda' }, // 3: Audi
              3: { color: 'purple', labelInLegend: '3-Audi' },  // 4: BMW
              4: { color: 'blue', labelInLegend: '5-Toyota' }, // 1: Ford
            },
          }}
          rootProps={{ 'data-testid': '3' }}
        />
        <div className='mt-2'>

        <Chart
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[['Sale Date', 'Total Sales'], ...lineChartData]}
          options={options}
        />
        </div>
      </div>
     
    </div>
  );
}
