/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter, Link } from 'react-router-dom';
import CreateImage from './pages/CreateImage';
import { useStateContext } from './context';
// import { logo_ss } from './assets';

const App = () => {

  const { walletAddress, connectWallet } = useStateContext();

  console.log("Address: ", walletAddress);

  return (
    <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        {/* <img src={logo_ss} alt="logo" className="w-28 object-contain" /> */}
      </Link>

      {walletAddress ? (
        <p className="font-inter font-medium bg-[#202487] text-white px-4 py-2 rounded-md">{walletAddress}</p>
      ) : (
        <button className="font-inter font-medium bg-[#202487] text-white px-4 py-2 rounded-md" onClick={connectWallet}>
          Connect Wallet
        </button>        
      )}

    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <CreateImage />
    </main>
  </BrowserRouter>
  )
}

export default App
