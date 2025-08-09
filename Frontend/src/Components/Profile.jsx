import React, { useState } from 'react'
import Dashboard_component_frames from './Dashboard_component_frames'
import { useImageStore } from "../store/images";

const Profile = ({ name, userTitle, image }) => {

  const { uploadImage, imageUrl } = useImageStore();
  const [show, Setshow] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file);
    handleShow();
  };

  const handleShow = () => {
    Setshow(!show)
  }






  return (
    <>
      <Dashboard_component_frames >
        <div className='w-full h-full flex flex-col items-center justify-end  relative bg-white rounded-[5vh]'>
          <div className='relative  w-full h-full     '>
            {image ? (
  <img src={image} className='w-full h-full object-cover object-top rounded-[5vh]' />
) : (
  // fallback UI
  <div className="w-full lg:h-[80%] h-full flex items-center justify-center relative">
    <div className="relative w-44 h-44 lg:mb-0 lg:mt-0 mb-[15%] mt-[2%] rounded-full border-[6px] border-gray-300 flex items-center justify-center text-gray-500 text-center overflow-hidden bg-white">
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        "Add a Profile Image"
      )}
    </div>

    {/* Top-right + button */}
    <div className="absolute w-[90%] h-[80%] flex items-start justify-end">
      <button
        onClick={handleShow}
        className="bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center text-xl text-white shadow-md hover:bg-gray-400 hover:text-black cursor-pointer"
      >
        +
      </button>
    </div>
  </div>
)}


          </div>


          <div className='absolute w-[90%] lg:h-[20%]  flex mb-4   px-8 items-center gap-4  bg-zinc-900/80 rounded-[5vh] text-white  justify-center font-bold capitalize    '>

            <div className='w-2 h-2 bg-zinc-50   flex items-center justify-center rounded-full'></div>
            <div className='    w-full   p-2  rounded-2xl'>
              <h2 className='xl:text-xl lg:text-lg md:text-lg  text-lg capitalize  '>{name}</h2>
              <h4 className=' font-semibold xl:text-lg lg:text-md md:text-md sm:text-sm text-sm capitalize  ' > {userTitle}</h4>
            </div>

          </div>


        </div>


        {show === true ?
          <div className="lg:absolute fixed inset-0 h-full bg-black/50 flex flex-col items-center justify-center z-[1000] gap-3">

            <label className='flex flex-col items-center lg:text-2xl  md:text-xl text-md font-bold gap-4 bg-white rounded-[5vh] py-8 '>
              <div className='flex items-center gap-6 justify-between'> Upload Your Image
                <div className=' w= flex items-end justify-end  '>
                  <div onClick={handleShow} className='bg-black w-6 h-6 text-white rounded-full cursor-pointer
                 flex items-center text-sm justify-center shadow-md'>X</div>
                </div>
              </div>
              <input type="file" onChange={handleFileChange} placeholder='click to upload'
                className='w-[80%] font-medium lg:text-lg md:text-md text-sm cursor-pointer bg-black text-white p-2 rounded-full' />
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="w-50 h-50 aspect-square object-cover rounded-full" />}
            </label>
          </div> : ""
        }
      </Dashboard_component_frames>

    </>
  )
}

export default Profile
