import { useAuthStore } from '../store/authStore';
import StartInputFrame from '../Components/StartInputFrame';
import { useNavigate, useParams } from 'react-router-dom';      
import toast from 'react-hot-toast';
import { useState } from 'react';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { resetPassword } = useAuthStore();
    const navigate = useNavigate();
    const {token} = useParams();
    const handleResetPassword = async (e) => {
        e.preventDefault();
            const  password = e.target.newPassword.value
            const confirmPassword = e.target.confirmPassword.value
            
            if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
            }
        try {
            await resetPassword(token, password);
            toast.success("Password has been reset successfully.");
            navigate('/login'); // Redirect to login or show success message
        } catch (error) {
            console.error("Error during password reset:", error);
            toast.error(error.message || "An error occurred during password reset.");
        }
    }
    
  return (
    
     <StartInputFrame>
        <div className='w-full h-full flex flex-col items-center justify-center gap-4 py-[3vh]'>


                        <h1 className='font-bold lg:text-4xl md:text-3xl text-2xl mb-2'>Reset Password</h1>
    <form onSubmit={handleResetPassword} className="flex flex-col gap-6  w-full" >



<div className="w-full flex items-center bg-white rounded-[5vh] px-4 py-2">
                        <span className="material-icons text-gray-500 mr-2">lock</span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="w-full outline-none "
                            name="newPassword" placeholder="Enter new password" 
                        />
                        <span
                            className="material-icons text-gray-500 cursor-pointer ml-2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                    </div>



<div className="w-full flex items-center bg-white rounded-[5vh] px-4 py-2">
                        <span className="material-icons text-gray-500 mr-2">lock</span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword" placeholder="Confirm new password" required 
                            className="w-full outline-none "
                            
                        />
                        <span
                            className="material-icons text-gray-500 cursor-pointer ml-2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                    </div>





       <button type="submit" className="bg-black w-[80%] mx-auto cursor-pointer mt-4 text-white py-2 rounded-full hover:bg-black/70 transition">
                       Reset Password
                    </button>
   
        </form>

        </div>
     </StartInputFrame>
   
  )
}

export default ResetPassword
