import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="h-16 sticky top-0 z-30 backdrop-blur-xl bg-white/75 border-b border-white/60 shadow-sm shadow-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F39845] to-[#e07c20] flex items-center justify-center shadow-md shadow-orange-200/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-lg font-extrabold text-slate-900 tracking-tight">
            Interview<span className="gradient-text">Prep</span> AI
          </span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-6">
          <Link 
            to="/resume-review" 
            className="group relative flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-[#F39845] to-[#f08524] text-white text-[12px] md:text-[13px] font-semibold shadow border border-white/20 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden"
          >
            {/* Glossy shimmer effect overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
            
            <svg className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Review Resume
          </Link>
          <ProfileInfoCard />
        </div>
      </div>
    </div>
  )
}

export default Navbar