/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, createContext, useState } from 'react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [walletAddress, setWalletAddress] = useState("");
    
    const requestAccount = async () =>{
        console.log("Requesting Account");

        if(window.ethereum) {
            console.log('detected');
      
            try {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              setWalletAddress(accounts[0]);
              console.log("Wallet address is : ", walletAddress);
            } catch (error) {
              console.log('Error connecting...');
            }
      
          } else {
            alert('Meta Mask not detected');
          }
    }

    const connectWallet = async () => {
        if(typeof window.ethereum !== 'undefined') {
            await requestAccount();
      
            const provider = new ethers.providers.Web3Provider(window.ethereum);
          }
    }

    return(
        <StateContext.Provider
            value={{
                walletAddress,
                connectWallet
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);