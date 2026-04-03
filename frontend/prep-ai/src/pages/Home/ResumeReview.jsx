import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { motion } from "framer-motion";

const ResumeReview = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        toast.error("Only PDF files are supported!");
        return;
      }
      setFile(selected);
      setFeedback(null); // reset prior feedback
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file first");
      return;
    }

    setIsLoading(true);
    setFeedback(null);
    
    // We must use FormData for multipart/form-data (file uploads)
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axiosInstance.post(API_PATHS.AI.REVIEW_RESUME, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setFeedback(response.data);
      toast.success("Resume successfully reviewed!");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error analyzing resume. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="pt-6 pb-20 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Resume Reviewer</h1>
            <p className="text-sm text-slate-500 mt-1">Upload your PDF resume to get instant, actionable feedback to pass ATS</p>
          </div>
        </div>

        {!feedback && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F39845]/10 flex items-center justify-center mb-5 text-[#F39845]">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Upload your Resume</h2>
            <p className="text-slate-500 text-sm max-w-sm mb-6">Drop your PDF resume here or click to browse. We'll analyze it using our AI agent.</p>
            
            <input 
              type="file" 
              accept=".pdf" 
              id="resumeUpload" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            
            {!file ? (
              <label 
                htmlFor="resumeUpload" 
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#F39845] hover:bg-[#e07c20] cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Browse Files
              </label>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button 
                    onClick={() => { setFile(null); setFeedback(null); }}
                    className="ml-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-green-200 text-green-800 transition-colors"
                    title="Remove file"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <button 
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#F39845] hover:bg-[#e07c20] cursor-pointer transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? <SpinnerLoader /> : "Analyze Document"}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* FEEDBACK SECTION */}
        {feedback && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
            
            {/* Header Score Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full border-8 border-slate-50 flex items-center justify-center shadow-inner relative">
                <svg className="w-full h-full absolute top-0 left-0 -rotate-90">
                   <circle cx="50%" cy="50%" r="56" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                   <circle cx="50%" cy="50%" r="56" fill="transparent" stroke={feedback.score >= 8 ? "#10b981" : feedback.score >= 5 ? "#F39845" : "#ef4444"} strokeWidth="12" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * (feedback.score / 10))} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="text-3xl font-black text-slate-800"><span className={feedback.score >= 8 ? "text-emerald-500" : feedback.score >= 5 ? "text-[#F39845]" : "text-red-500"}>{feedback.score}</span><span className="text-xl text-slate-300">/10</span></div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Overall Assessment</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feedback.summary}</p>
                <button onClick={() => {setFeedback(null); setFile(null)}} className="mt-4 text-sm font-semibold text-[#F39845] hover:underline underline-offset-4">Scan another resume</button>
              </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6">
                <h4 className="flex items-center gap-2 text-emerald-800 font-bold mb-4">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Strengths
                </h4>
                <ul className="space-y-3">
                  {feedback.strengths?.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6">
                 <h4 className="flex items-center gap-2 text-red-800 font-bold mb-4">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Weaknesses
                </h4>
                <ul className="space-y-3">
                  {feedback.weaknesses?.map((wk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

             {/* Textual Feedback */}
             <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-6">
                <div>
                  <h4 className="text-slate-800 font-bold mb-2">Formatting & Readability</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{feedback.formatting}</p>
                </div>
                <div>
                  <h4 className="text-slate-800 font-bold mb-2">Impact Metrics & Action Verbs</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{feedback.actionWords}</p>
                </div>
             </div>

             {/* Actionable Improvements */}
             <div className="bg-gradient-to-br from-[#F39845]/10 to-[#F39845]/5 border border-[#F39845]/20 rounded-3xl p-6">
                <h4 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#F39845]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Actionable Improvements
                </h4>
                <div className="grid gap-3">
                  {feedback.improvements?.map((imp, i) => (
                     <div key={i} className="bg-white/60 p-3 rounded-xl border border-white/80 shadow-sm text-sm text-slate-700">
                        {imp}
                     </div>
                  ))}
                </div>
             </div>

          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ResumeReview;
