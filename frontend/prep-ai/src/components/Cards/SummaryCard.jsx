import React, { useRef } from "react";
import { getInitials } from "../../utils/helper";
import { LuTrash2, LuClock, LuBrainCircuit, LuUser } from "react-icons/lu";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const tiltX = ((y - midY) / midY) * -10;
    const tiltY = ((x - midX) / midX) * 10;

    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03,1.03,1.03)`;
    card.style.boxShadow = `
      ${-tiltY * 1.5}px ${tiltX * 1.5}px 30px rgba(243,152,69,0.18),
      0 20px 50px rgba(0,0,0,0.12)
    `;

    if (shineRef.current) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      shineRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.55) 0%, transparent 65%)`;
      shineRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer overflow-hidden rounded-2xl glass-card shadow-depth"
      style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
    >
      {/* Shine overlay */}
      <div
        ref={shineRef}
        className="absolute inset-0 z-20 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      {/* Top coloured section */}
      <div
        className="p-5 relative"
        style={{ background: colors.bgcolor, transform: "translateZ(8px)" }}
      >
        {/* Blurred glow in corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Avatar */}
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md" style={{ transform: "translateZ(12px)" }}>
            <span className="text-base font-extrabold text-slate-700">{getInitials(role)}</span>
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-[15px] font-bold text-slate-900 truncate">{role}</h2>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate font-medium">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete — appears on hover */}
        <button
          className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 z-30 flex items-center gap-1.5 text-[11px] text-rose-500 font-semibold bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-rose-100 shadow-sm hover:bg-rose-50 transition-all duration-200"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <LuTrash2 className="w-3 h-3" />
          Delete
        </button>
      </div>

      {/* Bottom info */}
      <div className="px-5 py-4" style={{ transform: "translateZ(4px)" }}>
        {description && (
          <p className="text-[12px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">{description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            <LuUser className="w-3 h-3 text-[#F39845]" />
            {experience} {experience == 1 ? "Yr" : "Yrs"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            <LuBrainCircuit className="w-3 h-3 text-[#F39845]" />
            {questions} Q&A
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            <LuClock className="w-3 h-3 text-[#F39845]" />
            {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
