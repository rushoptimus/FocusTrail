import React from 'react'
import { useAuthStore } from '../store/authStore';
import StartInputFrame from '../Components/StartInputFrame';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const ForgotPassword = () => {
  const { forgotPassword } = useAuthStore();
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value; // Assuming you have an input field with name="email"
      await forgotPassword(email);
      // Handle success (e.g., show toast notification)
      toast.success("Password reset link sent to your email and please check spam in case you don't see it in your inbox.");
      navigate('/login'); // Redirect to login or show success message

    }
    catch (error) {
      console.error("Error during forgot password:", error);
      // Handle error (e.g., show toast notification)
    }
  }
  return (
    <StartInputFrame>
      <div className='w-full flex flex-col items-center justify-center'>
        
      <h2 className="text-3xl font-bold mb-4 text-center">Forgot Password</h2>
      <h2 className="lg:text-xl text-lg font-semibold mb-4 text-center capitalize ">Enter your email to reset your password</h2>

 
      <form onSubmit={handleForgotPassword} className="w-full flex flex-col gap-6 mt-4" >
        <div className="flex items-center bg-white rounded-[1vh] w-full px-4 py-4">
          <span className=" material-icons text-gray-500 mr-2 " >email</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full outline-none font-bold lg:text-xl "
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
            required
          />
        </div>
        <button type="submit" className="bg-black cursor-pointer mt-4 text-white py-3 rounded-full hover:bg-black/70 transition">
          Sent Reset Link
        </button>
      </form>
      </div>
    </StartInputFrame>
  )
}

export default ForgotPassword
