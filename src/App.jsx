import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import DividerCustom from './components/DividerCustom'

const App = () => {
  return (
    <div>

      <DividerCustom text={"Project"} />


        <Link to={'/tap-coin'} className='flex-1 p-20 rounded-lg glass flex items-center justify-center min-w-[40%] text-3xl shadow-lg group hover:text-red-500 hover:shadow-red-500 transition-all active:scale-90'>
          Tap Coin
        </Link>

      
    </div>
  )
}

export default App