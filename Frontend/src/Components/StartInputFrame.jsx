import React from 'react'

function StartInputFrame({ children }) {
  return (
    <div className='w-full h-screen flex items-center justify-center p-6 bg-gradient-to-tl from-[#ffcc95] via-[#ffd4a5] to-[#ebf6f6]'>
        <div className='xl:w-2/6 lg:w-3/6  w-full  px-4 py-8 flex flex-col bg-[#feefdf] rounded-[5vh]  items-center justify-center '>
            {children}
        </div>
    </div>
  )
}

export default StartInputFrame
