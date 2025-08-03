import React from 'react'
import Image from 'next/image';
const JoinCreateChat = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" >
        <div className="p-8 dark:border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow" >

            <div>
                <img src="/images/chat.png" alt="" className='w-24 mx-auto' />
            </div>

           <h1 className="text-2xl font-semibold text-center mb6" >Join Room / Create Room</h1> 
            {/* name div */}
            <div>
                <label htmlFor="name" className="block font-medium mb-2" >Your Name : </label>
                <input type="text" id='name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-br-3xl focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>

            {/* room id div */}
            <div>
                <label htmlFor="name" className="block font-medium mb-2" >Room ID : </label>
                <input type="text" id='name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-br-3xl focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>

            {/* button */}
            <div className='flex justify-center' >
                <button className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full mr-20' > Join Room </button>
                <button className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full ml-20' > Create Room </button>
            </div>
        </div>
    </div>
  )
};

export default JoinCreateChat
