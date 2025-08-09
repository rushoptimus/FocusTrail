import React from 'react'

const Dashboard_component_frames = ({children}) => {
  return (
    <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md shadow-yellow-300 rounded-[5vh] w-full lg:h-[35vh] md:h-full h-full flex items-center justify-center'>
      {children}
    </div>
  )
}

export default Dashboard_component_frames
