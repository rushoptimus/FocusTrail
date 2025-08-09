import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StartInputFrame from '../components/StartInputFrame';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {login, error} = useAuthStore();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Signup successful! Please verify your email.");
            navigate('/moodPage');
            // Redirect or show success message
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        }
    }
    return (
        <StartInputFrame>
            <div className='lg:p-5 p-2 w-full  mx-auto'>
                <h1 className="lg:text-4xl text-3xl font-bold mb-4 text-center mt-4">FocusTrail</h1>
                <h2 className="lg:text-xl text-lg font-medium mb-4 text-center">Welcome To FocusTrail </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-6 mt-4">


                    {/* Email Field */}
                    <div className="flex items-center bg-white rounded-[1vh] px-4 py-2">
                        <span className="material-icons text-gray-500 mr-2">email</span>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full outline-none "
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            className="material-icons text-gray-500 cursor-pointer ml-2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="bg-black cursor-pointer mt-4 text-white py-2 rounded-full hover:bg-black/70 transition">
                        Log In 
                    </button>
                    <div className='w-full flex items-end justify-end'>
                          <Link to="/forgot-password" className="text-white  bg-black/90 rounded-full px-4 py-1 ">Forgot Password</Link>
                    </div>
            
                </form>

                <div className='w-full mx-auto mt-8 flex flex-col items-center justify-center gap-4 '>
                    <div className='h-0.5 w-full bg-gray-400 rounded-full'></div>
                    <div className='w-full h-full flex lg:flex-row md:flex-row flex-col gap-4 items-center justify-between'>
                        <h3>Dont have an account?</h3>
                        <Link to="/" className="text-white  bg-black/90 rounded-full px-4 py-1 ">Sign Up</Link>
                    </div>
                </div>
            </div>
        </StartInputFrame>
    );
};

export default Login;
