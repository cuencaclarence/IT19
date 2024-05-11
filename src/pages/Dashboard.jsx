import React, { useState } from 'react';

//contents
import Home from '../contents/Home'
import Inventories from '../contents/Inventories'
import Add from '../contents/Add'

function Dashboard() {

  const [activeContent, setActiveContent] = useState('home');

  // Function to handle click event and set active content
  const handleNavClick = (content) => {
    setActiveContent(content);
  };


  return (
    <div className='bg-green-600 h-screen flex'>
      {/* Navigation */}
      <div className='w-[20%] justify-center py-5'>
        <h1 className='text-white text-2xl font-bold text-center'>Navigation</h1>
        <div className='flex flex-col mt-20 px-6 gap-2'>
           {/* Links to switch content */}
          <button onClick={() => handleNavClick('home')} className='text-black font-semibold rounded-sm py-2 px-4 bg-slate-300 hover:bg-slate-500 hover:text-white'>Home</button>
          <button onClick={() => handleNavClick('add')} className='text-black font-semibold rounded-sm py-2 px-4 bg-slate-300 hover:bg-slate-500 hover:text-white'>Add</button>
          <button onClick={() => handleNavClick('inventories')} className='text-black font-semibold rounded-sm py-2 px-4 bg-slate-300 hover:bg-slate-500 hover:text-white'>Inventories</button>
            
        </div>
      </div>

      {/* Contents */}
      <div className='bg-green-100 h-screen w-[80%]'>
        {/* Render content based on activeContent state */}
        {activeContent === 'home' && <Home />}
        {activeContent === 'add' && <Add />}
        {activeContent === 'inventories' && <Inventories />}
      </div>
        
    </div>
  )
}

export default Dashboard
