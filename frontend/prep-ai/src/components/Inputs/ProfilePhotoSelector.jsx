import React, { useRef, useState } from "react";
import { LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const newPreview = URL.createObjectURL(file);
      if (setPreview) setPreview(newPreview);
      setPreviewUrl(newPreview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6 mt-2">
      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />
      {!image && !preview && !previewUrl ? (
        <div 
          onClick={onChooseFile}
          className="w-20 h-20 rounded-full overflow-hidden bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-[#F39845]/5 hover:border-[#F39845] transition-all duration-300 group shadow-sm hover:shadow-md relative"
        >
          <div className="absolute inset-0 bg-[#F39845]/0 group-hover:bg-[#F39845]/10 transition-colors duration-300 rounded-full" />
          <LuUpload className="w-5 h-5 text-slate-400 group-hover:text-[#F39845] mb-0.5 transition-colors duration-300 relative z-10" />
          <span className="text-[10px] text-slate-400 group-hover:text-[#F39845] font-semibold transition-colors duration-300 relative z-10 tracking-wide uppercase">Avatar</span>
        </div>
      ) : (
        <div className="relative group">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#F39845]/80 p-[2px] shadow-sm transition-all duration-300 bg-white group-hover:shadow-[#F39845]/20 group-hover:shadow-lg group-hover:border-[#F39845]">
            <img 
              src={preview || previewUrl} 
              alt="Profile Preview" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <button
            type="button"
            title="Remove Photo"
            className="absolute bottom-[-2px] right-[-2px] bg-white hover:bg-red-50 text-red-500 rounded-full p-1.5 transition-all duration-300 scale-95 hover:scale-110 active:scale-95 border border-red-100 shadow-sm hover:shadow"
            onClick={handleRemoveImage}
          >
            <LuTrash className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
