import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginChoice() {

    const [data, setData] = useState(null);
    const [count, setCount] = useState(null)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/julia');
          const jsonData = await response.json();
          setData(jsonData);
          setCount(jsonData.length)
          console.log(jsonData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="text-white">
             <h1>Julia Data</h1>
             {count && <p>total of  {count}</p>}
            {data && (
                <ul className='text-white'>
                {data.map((item, index) => (
                    <div className='flex gap-3' key={index}>
                        <p>{item.id}</p>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>{item.age}</p>
                        <p>{item.price}</p>
                    </div>
                 
                ))}
                </ul>
            )}
        </div>


    )
}

export default LoginChoice
