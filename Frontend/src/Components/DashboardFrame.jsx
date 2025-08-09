import React from 'react'

function dashboardFrame({ children }) {
  return (
    <div className='w-full lg:h-screen min-h-full flex items-center justify-center bg-gradient-to-tl from-[#ffcc95] via-[#ffd4a5] to-[#ebf6f6]'>
        {children}
    </div>
  )
}

export default dashboardFrame
