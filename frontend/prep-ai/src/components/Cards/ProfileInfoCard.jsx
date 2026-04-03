import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return user && (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.name}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#F39845]/30 ring-offset-1"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F39845] to-[#e07c20] flex items-center justify-center text-white text-sm font-bold ring-2 ring-[#F39845]/30 ring-offset-1">
          {getInitials(user.name)}
        </div>
      )}
      <div className="hidden sm:flex flex-col">
        <span className="text-sm font-semibold text-slate-800 leading-tight">{user.name || "User"}</span>
        <button
          className="text-[11px] text-[#F39845] font-semibold cursor-pointer hover:text-[#e07c20] transition-colors text-left leading-tight mt-0.5"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
