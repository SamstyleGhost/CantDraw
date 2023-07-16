/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useStateContext } from '../context';
import { Loader } from '../components';
import axios from 'axios';
import credentials from '../../credentials';

const CreateImage = () => {

    const { getJob, createJob, walletAddress } = useStateContext();

    const [prompt, setPrompt] = useState("");
    const [photo, setPhoto] = useState("");

    const [generatingImg, setGeneratingImg] = useState(false);
    const [mintingImg, setMintingImg] = useState(false); //still to implement working

    const handleChange = (e) => {      
        setPrompt(e.target.value);
    }

    const handleSubmit = () => {

    }
    
    const generateImage = async () => {

        setGeneratingImg(true);

        console.log("Inside genImg");

        let job = await createJob({        
            prompt: prompt,
        });
        
        console.log("Job Created! Waiting...", prompt);
        
        while (job.status !== "succeeded" && job.status !== "failed") {
            await new Promise((resolve) => setTimeout(resolve, 250));
        
            job = await getJob(job.job);
        }
        
        if(job.status !== "succeeded") {
            throw new Error("Job failed!"); 
        }
        
        setGeneratingImg(false);
        setPhoto(job.imageUrl);

        console.log("Generation completed!", job.imageUrl);
    }

    const URL_to_IPFS = async() => {

      const encodedParams = new URLSearchParams();
      encodedParams.set('fileUrl', `${photo}`);
      encodedParams.set('name', `${prompt}`);
      encodedParams.set('description', `${prompt}`);

      const options = {
        method: 'POST',
        url: 'https://api.verbwire.com/v1/nft/store/metadataFromImageUrl',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'X-API-Key': `${credentials.verbwireKey}`
        },
        data: encodedParams,
      };

      let meta_url = "";
      await axios
        .request(options)
        .then(function (response) {
          meta_url = response.data.ipfs_storage.metadata_url;
          console.log("Metadata url is: ", response.data.ipfs_storage.metadata_url);
        })
        .catch(function (error) {
          console.error(error.response.data);
        });

        console.log("Metaurl is: ", meta_url);
        return meta_url;
    }
    
    const mintImage = async() => {

      setMintingImg(true);
      const img_url = await URL_to_IPFS();
      console.log("Image URL is: ", img_url);

      const mint_data = {
        "contractAddress": '0x3db8960311Ff0Fa45175dd419366eFE305139632',
        "recipientAddress": '0x86D4E2CB09d7B69A1FF9Da48cAB4BC9bd8139E1f',
        "chain": 'goerli',
        "metadataUrl": `${img_url}`
      };
      
      const options = {
        method: 'POST',
        url: 'https://api.verbwire.com/v1/nft/mint/mintFromMetadataUrl',
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
          'X-API-Key': `${credentials.verbwireKey}`,
        },
        data: mint_data
      };

      console.log(options);
      console.log("Mint Data is: ", mint_data);
      
      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error.response.data);
        });

        setMintingImg(false);
    }

    return (
    <section className="max-w-7xl mx-auto">
    <div className='mx-10 sm:flex flex-col'>
      <div className='border-b-2 border-white mb-8'>
        <h1 className="font-extrabold text-[#f3f3f5] text-[32px]">Create</h1>
        <p className="my-2 text-[#5887b7] text-[14px] max-w-[500px]">Create an image just using text</p>
      </div>
      <div>
        <div className='flex flex-row flex-wrap flex-2 gap-5 justify-between '>
        <div className='w-full sm:w-1/2 item-start ='>   
                    <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                      <div className='flex flex-col gap-3'>
                          <div className='flex items-center gap-2'>
                          <label className='block text-sm font-medium text text-[#b73d37] ml-1'>
                              Prompt
                          </label>
                          </div>
                        <div className='ml-none'>
                            <input type="text" className=' bg-transparent border-2 border-[#b73d37] text-white text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3' placeholder='Enter prompt' onChange={handleChange} />
                        </div>
                    </div>
                </form>
              </div>
            <div className="relative  align-end border-4 padding-20px border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center bg-blend-hue">
                <div className=''>
                    {photo ? (
                    <img
                        src={photo}
                        alt={prompt}
                        className="w-full h-full object-contain"
                    />
                    ) : (
                    <img
                        src={photo}
                        alt={Image}
                        className="w-9/12 h-9/12 object-contain opacity-10"
                    />        
                    )}

                    {generatingImg && (
                      <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                        <Loader />
                      </div>
                    )}
              </div>
              
            </div>  
            
            </div>
      </div>
      <div className="flex-wrap flex-row justify-center align-medium m-10  ">
        <div className="mt-5 flex w justify-center">
          <button
            type="button"
            onClick={generateImage}
            className=" bg-[#b73d37] hover:bg-[#ec5a52] text-black hover:text-white font-medium rounded-md text-sm w-7/12 sm:w-1/8 px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10 flex gap-5 justify-center">
          <button
            type="button"
            onClick={mintImage}
            className="text-black bg-[#4448b9] hover:bg-blue-800 font-medium rounded-md text-sm w-7/12 px-5 py-2.5  text-center"
          >
            {mintingImg ? 'Minting...' : 'Mint'}
          </button>
        </div>
        </div>
        <div>
          {mintingImg && (
            <div className='w-full flex items-center'>
              <div className='mx-auto my-8'>
                <Loader />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    )
}

export default CreateImage