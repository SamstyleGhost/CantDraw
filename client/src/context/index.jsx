/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, createContext, useState } from 'react';
import { ethers } from 'ethers';
import("dotenv/config");

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [walletAddress, setWalletAddress] = useState("");

    const base = "https://api.prodia.com/v1";
    const headers = {
      "X-Prodia-Key": "e7bce943-bf22-4962-a2d7-97bd80b16451",
    };
    
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

    const createJob = async params => {

      console.log("Inside createJob");
      const response = await fetch(`${base}/job`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      console.log("Response is ",response);
    
      if(response.status !== 200) {
        throw new Error(`Bad Prodia Response: ${response.status}`);
      }
      
      return response.json();
    };
    
    const getJob = async (jobId) => {
      const response = await fetch(`${base}/job/${jobId}`, {
        headers,
      });
    
      if(response.status !== 200) {
        throw new Error(`Bad Prodia Response: ${response.status}`);
      }
      
      return response.json();
    };

    return(
        <StateContext.Provider
            value={{
                walletAddress,
                connectWallet,
                createJob,
                getJob
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);