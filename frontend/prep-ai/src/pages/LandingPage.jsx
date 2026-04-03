import React, { useState } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthmodal, setopenAuthModal] = useState(false);
  const [currentPage, setcurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) setopenAuthModal(true);
    else navigate("/dashboard");
  };

  return (
    <>
      <div className="w-full min-h-screen mesh-bg font-sans relative overflow-hidden">

        {/* ── Animated background orbs ── */}
        <div className="absolute top-[-100px] left-[-80px] w-[450px] h-[450px] bg-amber-300/25 rounded-full blur-[90px] pointer-events-none animate-blob1" />
        <div className="absolute top-[30%] right-[-120px] w-[380px] h-[380px] bg-orange-200/20 rounded-full blur-[80px] pointer-events-none animate-blob2" />
        <div className="absolute bottom-[5%] left-[35%] w-[320px] h-[320px] bg-yellow-300/15 rounded-full blur-[70px] pointer-events-none animate-blob3" />

        {/* Spinning decorative ring */}
        <div className="absolute top-[8%] right-[8%] w-64 h-64 opacity-[0.07] pointer-events-none">
          <div className="w-full h-full rounded-full border-[3px] border-dashed border-[#F39845] animate-spin-slow" />
        </div>
        <div className="absolute bottom-[12%] left-[4%] w-40 h-40 opacity-[0.06] pointer-events-none">
          <div className="w-full h-full rounded-full border-[2px] border-dashed border-orange-400 animate-spin-slow" style={{ animationDirection: "reverse" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

          {/* ── Navbar ── */}
          <header className="flex justify-between items-center py-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F39845] to-[#e07c20] flex items-center justify-center shadow-lg shadow-orange-300/40 hover:scale-110 transition-transform duration-200">
                <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                Interview<span className="gradient-text">Prep</span> AI
              </span>
            </div>
            {user ? <ProfileInfoCard /> : (
              <button
                className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#F39845] to-[#e07c20] shadow-md shadow-orange-200/60 hover:shadow-lg hover:shadow-orange-300/60 hover:-translate-y-0.5 transition-all duration-200"
                onClick={() => setopenAuthModal(true)}
              >Login / Sign Up</button>
            )}
          </header>

          {/* ── Hero ── */}
          <div className="flex flex-col lg:flex-row items-center justify-between mt-12 gap-14">

            {/* Left — text */}
            <div className="flex-1 max-w-xl animate-fade-in-up">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F39845]/40 bg-gradient-to-r from-[#F39845]/15 to-amber-100/50 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#F39845] animate-pulse" />
                <span className="text-xs font-bold text-[#F39845] tracking-wider uppercase">AI Powered • Free to Start</span>
              </div>

              <h1 className="text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                Ace Interviews<br />
                with{" "}
                <span className="gradient-text relative">
                  AI-Powered
                  {/* Underline decoration */}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 9C60 3 140 1 298 9" stroke="url(#grad)" strokeWidth="3.5" strokeLinecap="round"/>
                    <defs><linearGradient id="grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F39845"/><stop offset="1" stopColor="#fbbf24"/>
                    </linearGradient></defs>
                  </svg>
                </span>
                {" "}Learning
              </h1>

              <p className="text-base text-slate-500 mt-8 leading-relaxed max-w-md">
                Get role-specific questions, dive deep into concepts, and organize
                everything your way. From preparation to mastery — your ultimate interview toolkit.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <button
                  className="group relative px-8 py-3.5 rounded-full text-white font-bold text-sm bg-slate-900 hover:bg-slate-800 transition-all duration-200 shadow-xl shadow-slate-900/25 hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-0.5 overflow-hidden"
                  onClick={handleCTA}
                >
                  <span className="relative z-10">Get Started Free →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  No credit card needed
                </div>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {["#F39845","#34d399","#60a5fa","#a78bfa"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{ background: c }}>
                      {["A","B","C","D"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  <span className="text-slate-800 font-bold">1,200+</span> devs prepping smarter
                </p>
              </div>
            </div>

            {/* Right — 3D floating feature cards */}
            <div className="flex-1 lg:max-w-sm space-y-3 hidden lg:flex flex-col">
              {[
                { icon: "🎯", title: "Role-specific questions", desc: "Tailored to your job title and experience level.", delay: "0ms" },
                { icon: "🧠", title: "Deep AI explanations", desc: "Understand the 'why' — not just the answer.", delay: "75ms" },
                { icon: "📄", title: "AI Resume Review", desc: "Instant ATS formatting & actionable feedback.", delay: "150ms" },
                { icon: "📌", title: "Pin & organize", desc: "Keep your important questions at the top.", delay: "225ms" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-4 flex items-start gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}

              {/* Stats card */}
              <div className="glass-card rounded-2xl p-4 shadow-depth">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[["10+", "Q&A Sets"], ["AI", "Powered"], ["Free", "Forever"]].map(([val, label], i) => (
                    <div key={i}>
                      <div className="text-lg font-extrabold gradient-text">{val}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Hero Image with 3D depth frame ── */}
          <div className="mt-20 w-full flex justify-center perspective-[1200px]">
            <div className="w-full max-w-5xl relative animate-float" style={{ perspective: "1200px" }}>
              {/* Layered glow */}
              <div className="absolute inset-x-0 -bottom-8 h-24 bg-gradient-to-t from-[#F39845]/15 to-transparent blur-2xl rounded-b-3xl pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl scale-[1.02] bg-gradient-to-br from-[#F39845]/10 via-amber-100/8 to-orange-100/5 blur-xl -z-10" />

              {/* Floating badge on image */}
              <div className="absolute -top-4 -left-4 z-20 glass-card rounded-2xl px-4 py-2.5 shadow-depth border border-white/60 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700">AI Generating…</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 glass-card rounded-2xl px-4 py-2.5 shadow-depth border border-white/60 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <div className="flex items-center gap-2">
                  <span className="text-base">🎉</span>
                  <span className="text-xs font-bold text-slate-700">Session ready!</span>
                </div>
              </div>

              <img
                src={HERO_IMG}
                alt="App Interface Mockup"
                className="w-full h-auto object-cover rounded-2xl border border-slate-200/60 shadow-2xl shadow-slate-400/30"
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
              <div className="hidden w-full h-[400px] flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-amber-50 rounded-2xl border border-slate-200">
                <span className="text-4xl mb-3">🖥️</span>
                <span className="text-slate-400 font-medium">Platform Preview</span>
              </div>
            </div>
          </div>

          {/* ── Features ── */}
          <div className="mt-32 mb-20">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F39845]/10 border border-[#F39845]/20 mb-4">
                <span className="text-xs font-bold text-[#F39845] uppercase tracking-wider">✦ Features</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Everything you need to{" "}
                <span className="gradient-text">shine</span>
              </h2>
              <p className="text-slate-500 mt-3 max-w-md mx-auto">
                A complete toolkit built for developers who want to land their dream role.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="glass-card rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-100/80 transition-all duration-300 group border border-white/60"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F39845]/20 to-amber-100/50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                    <span className="text-[#F39845] font-extrabold text-sm">{feature.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
              {APP_FEATURES.slice(3, 6).map((feature) => (
                <div
                  key={feature.id}
                  className="glass-card rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-100/80 transition-all duration-300 group border border-white/60"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F39845]/20 to-amber-100/50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                    <span className="text-[#F39845] font-extrabold text-sm">{feature.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div className="mb-20 relative overflow-hidden rounded-3xl">
            {/* Multi-layer gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: "radial-gradient(at 30% 40%, rgba(243,152,69,0.4) 0, transparent 50%), radial-gradient(at 70% 60%, rgba(251,191,36,0.3) 0, transparent 50%)"
            }} />
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
            <div className="relative z-10 p-14 text-center">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
                Ready to land your dream job?
              </h2>
              <p className="text-slate-400 mb-8 text-base max-w-sm mx-auto">
                Start your AI-powered interview prep today — completely free.
              </p>
              <button
                className="group px-10 py-4 rounded-full text-sm font-bold text-slate-900 bg-gradient-to-r from-[#F39845] to-[#fbbf24] hover:from-[#fbbf24] hover:to-[#F39845] transition-all duration-300 shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-400/40 hover:-translate-y-1 relative overflow-hidden"
                onClick={handleCTA}
              >
                <span className="relative z-10">Get Started Free →</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <Modal isOpen={openAuthmodal} onClose={() => { setopenAuthModal(false); setcurrentPage("login"); }} hideHeader>
        <div>
          {currentPage === "login" && <Login setcurrentPage={setcurrentPage} />}
          {currentPage === "signup" && <Signup setcurrentPage={setcurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
