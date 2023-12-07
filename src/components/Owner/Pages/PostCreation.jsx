// PostCreations.js

import React from 'react';
import Navbar from './Layouts/Navbar';

function PostCreations() {
  return (
    <div className='relative'>
      <Navbar />
      <div className='absolute w-full max-w-screen-xl mx-auto bg-transparent border border-black border-opacity-25 md:left-0 xl:left-28 md:-mt-24 lg:-mt-24 xl:-mt-24 p-4 md:p-8 rounded-3xl flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-1/5 lg:w-1/4 xl:w-1/6 mb-4 md:mb-0 md:mr-4 lg:mr-8'>
          <div className='w-full h-80 bg-[#dbd6d6] mt-7 rounded-2xl'></div>
        </div>
        <div className='w-full md:w-11/12 lg:w-3/4 xl:w-4/5'>
          <div className='w-full h-80 bg-[#dbd6d6] rounded-2xl flex justify-center '>
            <div className='left-1/3 bg-black text-white '>
              Add Basic Details


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCreations;




