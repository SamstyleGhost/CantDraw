/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter, Link } from 'react-router-dom';
import CreateImage from './pages/CreateImage';
import { useStateContext } from './context';
import logo from './assets/logo.jpeg';

const App = () => {

  const { walletAddress, connectWallet } = useStateContext();

  console.log("Address: ", walletAddress);

  return (
    <BrowserRouter>
    <div className="w-full flex justify-between items-center bg-gradient-to-t from-slate-700 via-slate-500 to-slate-300 sm:px-8 px-4 py-4">
      <Link to="/">
        {/* <img src={logo_ss} alt="logo" className="w-28 object-contain" /> */}
      </Link>

      {walletAddress ? (
        <p className="font-inter font-medium bg-[#efefe6] hover:bg-[#272731] text-black hover:text-white cursor-none px-4 py-2 rounded-md">{walletAddress}</p>
      ) : (
        <button className="font-inter font-medium bg-[#efefe6] hover:bg-[#272731] text-black hover:text-white px-4 py-2 rounded-md" onClick={connectWallet}>
          Connect Wallet
        </button>        
      )}
    </div>
    <div className="sm:p-8 px-4 py-8 w-full bg-gradient-to-t from-[#272731] from-95% via-slate-800 to-slate-700 min-h-[calc(100vh-73px)]">
      <div>
          <CreateImage />      
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App
