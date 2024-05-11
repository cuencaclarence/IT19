import React, { useState } from 'react'

//icons
import dashboardIcon from '../../images/layout.png'
import rateIcon from '../../images/interest-rate.png'
import groupIcon from '../../images/group1.png'
import inventoryIcon from '../../images/management.png'
import dealersIcon from '../../images/dealing.png'


//content
import Home from './content/Home'
import Inventory from './content/Inventory'
import Sales from './content/Sales'
import Users from './content/Users'
import Dealer from './content/Dealer'

function Dashboard() {

    const [activeContent, setActiveContent] = useState('home')
    const [activeButton, setActiveButton] = useState('home')

    const handleNavClick = (content) => {
        setActiveButton(content)
        setActiveContent(content)
    }

  return (
    <div className='bg-white'>
        <div className='border-b-2 px-4 py-6'>
            <h1 className='ml-16 text-xl font-bold'>Ultra Cars Admin</h1>
        </div>
        <div className='dash-container '>
            <div className='bg-white h-screen'>
                <div className='ml-16 mt-20'>
                    <button className={`navButton ${activeButton === 'home' && 'activeButton'}`} onClick={() => handleNavClick('home')}>
                        <img className='w-7' src={dashboardIcon} alt="" />
                        <p className='ml-3'>Dashboard</p>
                    </button>
                    <button className={`navButton ${activeButton === 'inventory' && 'activeButton'}`} onClick={() => handleNavClick('inventory')}>
                        <img className='w-8' src={inventoryIcon} alt="" />
                        <p className='ml-3'>Inventory</p>
                    </button>
                    <button className={`navButton ${activeButton === 'users' && 'activeButton'}`} onClick={() => handleNavClick('users')}>
                        <img className='w-8' src={groupIcon} alt="" />
                        <p className='ml-3'>Costumers</p>
                    </button>
                    <button className={`navButton ${activeButton === 'dealer' && 'activeButton'}`} onClick={() => handleNavClick('dealer')}>
                        <img className='w-8' src={dealersIcon} alt="" />
                        <p className='ml-3'>Dealers</p>
                    </button>
                    <button className={`navButton ${activeButton === 'sales' && 'activeButton'}`} onClick={() => handleNavClick('sales')}>
                        <img className='w-8' src={rateIcon} alt="" />
                        <p className='ml-3'>Sales</p>
                    </button>
                </div>
            </div>
            <div className='content'>
                {activeContent === 'home' && <Home />}
                {activeContent === 'inventory' && <Inventory />}
                {activeContent === 'users' && <Users />}
                {activeContent === 'sales' && <Sales />}
                {activeContent === 'dealer' && <Dealer />}
            </div>
        </div>
       
    </div>
  )
}

export default Dashboard
