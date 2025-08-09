import React from 'react'

const Welcome = ({name}) => {
  return (
    <>
    <div className='w-[90%] h-auto px-[7%]  pt-[1.5%] flex items-center justify-between '>
    <h1 className='lg:text-4xl md:text-2xl text-3xl  capitalize font-bold'>Welcome in,<span className='lg:hidden md:hidden  '><br /></span> {name} </h1>
    </div>
    </>
  )
}

export default Welcome
