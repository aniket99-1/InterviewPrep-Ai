import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: "radial-gradient(at 15% 50%, rgba(243,152,69,0.35) 0, transparent 55%), radial-gradient(at 80% 20%, rgba(251,191,36,0.2) 0, transparent 50%)"
      }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />
      {/* Blob animations */}
      <div className="absolute right-[15%] top-0 w-24 h-24 bg-[#F39845]/20 blur-[55px] animate-blob1 pointer-events-none" />
      <div className="absolute right-[5%] bottom-0 w-20 h-20 bg-teal-400/10 blur-[45px] animate-blob2 pointer-events-none" />
      <div className="absolute right-[25%] top-0 w-16 h-16 bg-fuchsia-400/10 blur-[40px] animate-blob3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-2 h-2 rounded-full bg-[#F39845] animate-pulse" />
              <span className="text-[11px] font-bold text-[#F39845] uppercase tracking-[0.15em]">Interview Session</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textShadow: "0 2px 20px rgba(243,152,69,0.3)" }}>
              {role || "Loading…"}
            </h1>
            {topicsToFocus && (
              <p className="text-sm text-slate-400 mt-1.5 font-medium max-w-lg">{topicsToFocus}</p>
            )}
            {description && (
              <p className="text-xs text-slate-500 mt-1 max-w-lg">{description}</p>
            )}
          </div>

          {/* Right badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: "🎯", text: `${experience} ${experience === "1" ? "yr" : "yrs"} exp` },
              { icon: "🧠", text: `${questions} Q&A` },
              ...(lastUpdated ? [{ icon: "🕐", text: lastUpdated }] : []),
            ].map((b, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-200 bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-2 rounded-full hover:bg-white/15 transition-colors duration-200 shadow-sm"
              >
                <span>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;