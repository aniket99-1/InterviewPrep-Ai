import React, { useRef } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  React.useEffect(() => {
    if (isExpanded) setHeight(contentRef.current.scrollHeight + 24);
    else setHeight(0);
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(255,255,255,0.5) 0%, transparent 65%)`;
      shineRef.current.style.opacity = "1";
    }
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      className={`relative group overflow-hidden rounded-2xl glass-card mb-3 transition-all duration-150 ${isExpanded ? "border-[#F39845]/40 shadow-depth-hover" : "shadow-depth hover:shadow-lg"}`}
      style={{ transition: "transform 0.12s ease, box-shadow 0.3s ease" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine */}
      <div
        ref={shineRef}
        className="absolute inset-0 z-20 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300 ${isExpanded ? "bg-gradient-to-b from-[#F39845] to-[#fbbf24]" : "bg-transparent group-hover:bg-[#F39845]/30"}`} />

      {/* Question row */}
      <div className="p-4 sm:p-5 flex items-start gap-4 pl-6">
        {/* Q badge */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm transition-all duration-200 shadow-sm ${isExpanded ? "bg-gradient-to-br from-[#F39845] to-[#e07c20] text-white shadow-orange-200/50" : "bg-[#F39845]/10 text-[#F39845]"}`}
          style={{ transform: isExpanded ? "translateZ(8px) scale(1.05)" : "translateZ(0)" }}>
          Q
        </div>

        <h3
          className="text-[14px] font-semibold text-slate-800 cursor-pointer pt-1 hover:text-[#F39845] flex-1 min-w-0 leading-snug transition-colors duration-200"
          onClick={toggleExpand}
        >
          {question}
        </h3>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className={`flex gap-1.5 transition-all duration-200 ${isExpanded ? "flex" : "hidden group-hover:flex"}`}>
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${isPinned ? "text-[#F39845] bg-[#F39845]/10 scale-110" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
              onClick={onTogglePin}
              title={isPinned ? "Unpin" : "Pin"}
            >
              {isPinned ? <LuPinOff className="w-4 h-4" /> : <LuPin className="w-4 h-4" />}
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F39845] to-[#e07c20] text-white shadow-md shadow-orange-200/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(true); onLearnMore?.(); }}
            >
              <LuSparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold hidden sm:block">Learn More</span>
            </button>
          </div>
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${isExpanded ? "bg-[#F39845]/10 text-[#F39845] rotate-180" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"}`}
            onClick={toggleExpand}
            style={{ transition: "transform 0.3s ease, background 0.2s, color 0.2s" }}
          >
            <LuChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Animated answer panel */}
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: `${height}px` }}>
        <div className="px-6 pb-5 pt-1 text-slate-600 leading-relaxed border-t border-slate-100/80" ref={contentRef}>
          <div className="pt-3">
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;