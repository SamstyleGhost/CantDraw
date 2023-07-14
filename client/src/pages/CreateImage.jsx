/* eslint-disable no-unused-vars */
/*eslint-env node*/
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';

const CreateImage = () => {
    
    const [form, setForm] = useState({
        prompt: '',
        photo: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [mintingImg, setMintingImg] = useState(false); //still to implement working
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {      
        setForm({ ...form, prompt: e.target.value });
    }

    const handleSubmit = () => {

    }

    const generateImage = async () => {

        console.log("Form prompt is", form.prompt);
        if(form.prompt){
            try {
                setGeneratingImg(true);
                const sdk = require('api')('@prodia/v1.2#ans39zdlk16spqi');

                sdk.auth('e7bce943-bf22-4962-a2d7-97bd80b16451');
                sdk.generate({prompt:`${form.prompt}`})
                .then(({ data }) => console.log(data))
                .catch(err => console.error(err));                
            } catch (err) {
                console.log(err);
            }
        }
    }

    const mintImage = () => {

    }

    return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Create an image just using text</p>
      </div>
      <div>
        <div className='flex flex-row flex-wrap flex-2 justify-between'>
            <div className='w-full md:m-5 sm:w-1/2'>   
                <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5'>
                        <div className='flex items-center gap-2'>
                        <label className='block text-sm font-medium text-gray-900'>
                            Prompt
                        </label>
                        </div>
                        <div>
                            <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3' placeholder='Enter prompt' onChange={handleChange} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                <div className=''>
                    { form.photo ? (
                    <img
                        src={form.photo}
                        alt={form.prompt}
                        className="w-full h-full object-contain"
                    />
                    ) : (
                    <img
                        src={form.photo}
                        alt="preview"
                        className="w-9/12 h-9/12 object-contain opacity-40"
                    />        
                    )}
                </div>
            </div>  
        </div>
      </div>
      <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-1/2 px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10 flex gap-5">
          <button
            type="button"
            onClick={mintImage}
            className="text-white bg-blue-700 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center"
          >
            {mintingImg ? 'Minting...' : 'Mint'}
          </button>
        </div>
    </section>
    )
}

export default CreateImage