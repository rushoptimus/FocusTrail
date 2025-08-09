import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StartInputFrame from '../Components/StartInputFrame';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const SignUp = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [Title, setTitle] = useState("");
    const {signup, error} =  useAuthStore();
    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            await signup(email, password, name, Title);
            toast.success("Signup successful! Please verify your email.");
            navigate('/verify-email');
        }
        catch (error) {
            console.error("Error during signup:", error);
            toast.error("Signup failed. Please try again.");
        }
        
    }

    return (
        <StartInputFrame>
            <div className='lg:p-5 p-1 w-full  mx-auto'>
                <h1 className="lg:text-4xl text-3xl font-bold mb-4 text-center mt-4">FocusTrail</h1>
                <h2 className="lg:text-xl text-lg font-medium mb-4 text-center">Create your FocusTrail Account</h2>

                <form onSubmit={handleSignup} className="flex flex-col gap-6 mt-4">

                    {/* Name Field */}
                    <div className="flex items-center bg-white rounded-[1vh] px-4 py-2">
                        <span className="material-icons text-gray-500 mr-2">person</span>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full outline-none"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        
                        />
                    </div>

                       <div className="flex items-center bg-white rounded-[1vh] px-4 py-2">
                        <span className="material-icons text-gray-500 mr-2">title</span>
                        <input
                            type="text"
                            placeholder="Work Title"
                            className="w-full outline-none"
                            onChange={(e) => setTitle(e.target.Title)}
                            value={Title}
                        
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex items-center bg-white rounded-[1vh] px-4 py-2">
                        <span className="material-icons text-gray-500 mr-2">email</span>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full outline-none "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex items-center bg-white rounded-[1vh] px-4 py-2">
                        <span className="material-icons text-gray-500 mr-2">lock</span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="material-icons text-gray-500 cursor-pointer ml-2"
                        >
                            {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}


                    <button type="submit" className="bg-black cursor-pointer mt-4 text-white py-2 rounded-full hover:bg-black/70 transition">
                        Sign Up
                    </button>
                    <h3 className='text-sm text-center'>By signing up, you agree to the Terms of Service.</h3>
                </form>

                <div className='w-full mx-auto mt-8 flex flex-col items-center justify-center gap-4 '>
                    <div className='h-0.5 w-full bg-gray-400 rounded-full'></div>
                    <div className='w-full h-full flex  lg:flex-row md:flex-row flex-col gap-4 items-center justify-between'>
                        <h3>Already have an account?</h3>
                        <Link to="/login" className="text-white  bg-black/90 rounded-full px-4 py-1 ">Log In</Link>
                    </div>
                </div>
            </div>
        </StartInputFrame>
    );
};

export default SignUp;
