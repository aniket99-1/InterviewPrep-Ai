import React, { useState, useContext } from 'react'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosinstance';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Login = ({ setcurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");
    //login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const {token} = response.data;
    if(token){
      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/dashboard");
    }
      
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[360px] lg:w-[400px] p-6 lg:p-8 flex flex-col justify-center bg-white rounded-2xl relative overflow-hidden">
      {/* Decorative gradient blur in background of the card */}
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#F39845]/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F39845]/20 to-[#F39845]/5 mb-5 shadow-sm border border-[#F39845]/10">
           {/* Sparkles Icon */}
           <svg className="w-7 h-7 text-[#F39845]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.642 1.054a.75.75 0 01.716 0l1.921 3.52 3.868.514a.75.75 0 01.403 1.29l-2.83 2.658.749 3.824a.75.75 0 01-1.103.823L12 11.666l-3.366 1.817a.75.75 0 01-1.103-.823l.749-3.824-2.83-2.658a.75.75 0 01.403-1.29l3.868-.514 1.921-3.52z" />
           </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h3>
        <p className="text-[13px] text-slate-500 mt-2 font-medium">Log in to resume your interview prep</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-3 relative z-10">
        <Input 
          label="Email Address"
          type="email"
          value={email}
          onChange={({target}) => setEmail(target.value)}
          placeholder="name@example.com"
        />
        <Input 
          label="Password"
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
          placeholder="••••••••"
        />
        
        {error && (
          <div className="bg-red-50/80 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-1 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <button type="submit" className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-[#F39845] to-[#f08524] hover:from-[#f08524] hover:to-[#e27613] text-white font-semibold rounded-xl shadow-lg shadow-[#F39845]/20 hover:shadow-[#F39845]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-sm ring-1 ring-[#F39845]/50">
          Sign In
        </button>

        <div className="mt-6 text-center pt-4 border-t border-slate-100">
          <p className="text-[13px] text-slate-600 font-medium">
            Don't have an account?{' '}
            <span 
              className="text-[#F39845] font-bold cursor-pointer hover:underline underline-offset-4 transition-all" 
              onClick={() => setcurrentPage("signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login