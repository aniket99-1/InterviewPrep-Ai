import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  // Handles clicking on the backdrop to close the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-slate-900/40 backdrop-blur-sm animate-backdrop"
      onClick={handleBackdropClick}
    >
      {/*Modal Content*/}
      <div className={`relative flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden animate-modal-pop`}>
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <button type="button" className="text-slate-400 bg-transparent hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm p-1.5 transition-colors relative z-50" onClick={onClose}>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Modal Body Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            {children}
        </div>

        {/* Floating Close Button for Headerless Modals (Moved here so it has top DOM stacking priority over children) */}
        {hideHeader && (
          <button 
            type="button" 
            className="absolute top-4 right-4 z-[100] text-slate-400 bg-white/80 shadow-sm hover:shadow hover:bg-slate-50 hover:text-slate-900 rounded-full p-2 transition-all cursor-pointer" 
            onClick={onClose}
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
