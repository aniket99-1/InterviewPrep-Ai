import React, { useState, useContext } from 'react'
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../utils/uploadimages';

const SignUp = ({ setcurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
   
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    if(!fullName){
      setError("Please enter your full name");
      return;
    }
    setError("");

   // signup API call
     try {
      //upload image
      if(profilePic){
        const imgUploadRes= await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name:fullName,
        email,
        password,
        profileImageUrl,
      });

      const {token}= response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard")
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
    <div className="w-[90vw] md:w-[360px] lg:w-[400px] p-6 lg:p-8 flex flex-col justify-center bg-white rounded-2xl outline-none relative overflow-hidden">
      {/* Decorative gradient blur in background of the card */}
      <div className="absolute top-[-50px] left-[-30px] w-32 h-32 bg-[#F39845]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="text-center mb-6 mt-1 relative z-10">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h3>
        <p className="text-[13px] text-slate-500 mt-2 font-medium">Join us and start mastering your interviews</p>
      </div>

      <form onSubmit={handleSignUp} className="relative z-10">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        
        <div className="flex flex-col gap-3">
          <Input 
            label="Full Name"
            type="text"
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            placeholder="John Doe"
          />
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
            Create Account
          </button>
        </div>

        <div className="mt-6 text-center pt-4 border-t border-slate-100">
          <p className="text-[13px] text-slate-600 font-medium">
            Already have an account?{' '}
            <span 
              className="text-[#F39845] font-bold cursor-pointer hover:underline underline-offset-4 transition-all" 
              onClick={() => setcurrentPage("login")}
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp;