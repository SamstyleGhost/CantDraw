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
    
    <div className="sm:p-8 px-4 py-8 w-full  min-h-[calc(100vh)] bg-[url('./assets/SHIPSINK.svg')] bg-cover bg-center h-80 w-90">
    <div className="w-full flex justify-between items-center sm:px-8 px-4 py-4">
      <Link to="/">
        {/* <img src={logo_ss} alt="logo" className="w-28 object-contain" /> */}
      </Link>

      {walletAddress ? (
        <p className=" rounded-full font-mono font-inter font-medium bg-[#b73d37] hover:bg-[#ec5a52] text-black hover:text-white cursor-none px-4 py-2 rounded-md ">Connected</p>
      ) : (
        <button className="  font-inter font-medium bg-[#efefe6] hover:bg-[#272731] text-black hover:text-white px-4 py-2 rounded-md" onClick={connectWallet}>
          Connect Wallet
        </button>        
      )}
    </div>
    <div>
          <CreateImage />      
      </div>
    </div>
    
    
  </BrowserRouter>
  )
}

export default App
