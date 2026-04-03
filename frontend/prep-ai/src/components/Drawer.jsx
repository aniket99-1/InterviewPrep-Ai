import React from 'react'
import { LuX } from 'react-icons/lu'

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900/30 dark:bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Drawer Panel */}
      <div
        className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[600px] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800/80 shrink-0 bg-gray-50/50 dark:bg-slate-800/20">
          <h5
            id="drawer-right-label"
            className="text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            {title}
          </h5>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-200 border border-gray-100 hover:border-gray-200 dark:border-slate-700 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex items-center justify-center shadow-sm hover:shadow"
            aria-label="Close drawer"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
          <div className="p-6 h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;