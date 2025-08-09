import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StartInputFrame from "../Components/StartInputFrame"
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
function VerifyEmail() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const {VerifyEmail,checkAuth, error} = useAuthStore();


    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // blocks non-numeric input

        const newcode = [...code];

        if (value.length > 1) {
            const pasteCode = value.slice(0, 6).split('');
            for (let i = 0; i < 6; i++) {
                newcode[i] = pasteCode[i] || '';
            }
            setCode(newcode);
            const lasFilledIndex = newcode.map(d => d !== '').lastIndexOf(true);
            const focusIndex = lasFilledIndex < 5 ? lasFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newcode[index] = value;
            setCode(newcode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    }


    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        try{
            await VerifyEmail(verificationCode);
            await checkAuth();
            toast.success("Email verified successfully!");
            navigate('/moodPage');
        }
        catch (error) {
            console.error("Error verifying email:", error);
            toast.error("Failed to verify email. Please try again.");
        }
    }


    return (
        <>
            <StartInputFrame>
                <div className='lg:p-5 p-1 w-full  flex flex-col items-center justify-center '>
                    <h2 className='font-bold lg:text-4xl md:text-3xl text-2xl mb-2'>Verify your Email</h2>
                    <p className='font-medium lg:text-xl md:text-lg text-md text-center mb-4'>Enter the 6 digit code sent to your email address</p>
                    <form onSubmit={handleSubmit} typeof='submit' className='flex flex-col gap-4 mt-4 w-full items-center justify-center'>
                        <div className='flex gap-4 w-full items-center justify-center'>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => { handleChange(index, e.target.value) }}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className='lg:w-14 lg:h-14 md:w-14 md:h-14 w-8 h-8 p-2 text-center border rounded'
                                />
                            ))}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type='submit'  className='bg-black w-[80%] cursor-pointer mt-4 text-white py-3 rounded-full hover:bg-black/70 transition' >
                            Verify Email
                        </button>


                    </form>

                </div>

            </StartInputFrame>

        </>
    )
}

export default VerifyEmail
