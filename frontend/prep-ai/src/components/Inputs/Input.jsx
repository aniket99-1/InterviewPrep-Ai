import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-1">
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5 ml-0.5 tracking-tight">
        {label}
      </label>
      <div className="relative flex items-center group">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-[3px] focus:ring-[#F39845]/20 focus:border-[#F39845] transition-all duration-300 hover:bg-white hover:border-slate-300 shadow-sm hover:shadow-md focus:shadow-md"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3.5 text-slate-400 hover:text-[#F39845] transition-all duration-300 group-focus-within:text-[#F39845] p-1.5 rounded-lg hover:bg-[#F39845]/10"
            onClick={togglePassword}
          >
            {showPassword ? <FaRegEye size={17} /> : <FaRegEyeSlash size={17} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
