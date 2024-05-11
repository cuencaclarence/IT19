import React, { useState } from 'react';
import profile from '../../../images/profile.jpg'

import Sold from './Sold'
import Inventories from './Inventories'
import Home from './Home'
import insertAdd from './insertAdd';


function Add() {

    const [activeContent, setActiveContent] = useState('insert');
    const [activeButton, setActiveButton] = useState('home');

    const dealerDataString = localStorage.getItem('dealer');
    const dealerData = JSON.parse(dealerDataString);

    console.log(dealerData)

    const handleNavClick = (content) => {
        setActiveContent(content);
        setActiveButton(content);
    };

  return (
    <div className='bg-white h-screen'>
        <div className='gridDealer h-screen'>
            {/* navigation */}
            <div className='back1 pt-7 px-6'>
              <div className='profile'>
                <img src={profile} className='profile-pic' alt=""/>
                <p className='text-center text-xl'>{dealerData.dealer_name}</p>
              </div>
              <div className='design'>
                <button className={`but1 ${activeButton === 'home' && 'but2'}`} onClick={() => handleNavClick('home')}>Home</button>
                <button className={`but1 ${activeButton === 'inventory' && 'but2'}`} onClick={() => handleNavClick('inventory')}>Inventory</button>
                <button className={`but1 ${activeButton === 'sold' && 'but2'}`} onClick={() => handleNavClick('sold')}>Sold</button>
              </div>
            </div>

            {/* content */}
            <div className=''>
              {activeContent === 'inventory' && <insertAdd />}
            

            </div>
        </div>
    </div>
  )
}

export default Add
