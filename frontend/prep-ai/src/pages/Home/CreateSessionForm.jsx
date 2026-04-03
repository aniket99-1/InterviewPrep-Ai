import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";


const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    topicsToFocus: "",
    experience: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    try {
      // call AI API to generate questions
      const aiResponse = await axiosInstance.post(
          API_PATHS.AI.GENERATE_QUESTIONS,
          {
              role,
              experience,
              topicsToFocus,
              numberOfQuestions: 10,
          }
      );

      // Should be array like [{question,answer},........]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to create session. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 sm:p-4 flex flex-col justify-center bg-white rounded-2xl relative overflow-hidden">
      {/* Decorative gradient blur in background of the card */}
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#F39845]/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F39845]/20 to-[#F39845]/5 mb-5 shadow-sm border border-[#F39845]/10">
           {/* Sparkles / Create Icon */}
           <svg className="w-7 h-7 text-[#F39845]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Start a New Journey</h3>
        <p className="text-[13px] text-slate-500 mt-2 font-medium">Fill out a few details to unlock personalized questions</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative z-10 w-full sm:w-[400px]">
        <Input
          label="Target Role"
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          placeholder="e.g. Frontend Developer, UI/UX Designer"
          type="text"
        />

        <Input
          label="Years of Experience"
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          placeholder="e.g. 2, 5"
          type="number"
        />

        <Input
          label="Topics to Focus On"
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          placeholder="Comma-separated, e.g. React, Node.js, MongoDB"
          type="text"
        />

        <Input
          label="Description (Optional)"
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          placeholder="Add any specific goals or notes for this session"
          type="text"
        />

        {error && (
          <div className="bg-red-50/80 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-1 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-[#F39845] to-[#f08524] hover:from-[#f08524] hover:to-[#e27613] text-white font-semibold rounded-xl shadow-lg shadow-[#F39845]/20 hover:shadow-[#F39845]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-sm ring-1 ring-[#F39845]/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerLoader/> : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
