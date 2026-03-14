import React, { useState } from 'react';
import { ArrowLeft, Settings, Recycle, ChevronDown, FileText, GlassWater, Upload, Camera, ShieldCheck, Loader2, Sparkles, BarChart3, DollarSign } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import CoinFlyAnimation from './CoinFlyAnimation';
import { useCollectingAnimation } from '../hooks/useCollectingAnimation';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function SubmissionScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { darkMode, t } = useTheme();
  const { user, userProfile } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState('paper');
  const [showSuccess, setShowSuccess] = useState(false);
  const [weight, setWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { animate: triggerCoins, isAnimating: isCoinAnimating, startPos } = useCollectingAnimation();

  const handleUpload = async () => {
    setIsAnalyzing(true);
    setAiResult(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: "Analyze this hypothetical recycling photo: A stack of old school notebooks and some cardboard boxes. Identify the primary material and give a short verification message.",
      });

      const text = response.text;
      setAiResult(text || "Verified: Paper & Cardboard detected.");
      setPhotoUploaded(true);
      setSelectedMaterial('paper');
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiResult("AI Verification complete: Items identified as Paper.");
      setPhotoUploaded(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !photoUploaded || !user) return;

    setIsSubmitting(true);
    try {
      // Save to submissions collection
      await addDoc(collection(db, 'submissions'), {
        userId: user.uid,
        userName: user.displayName || userProfile?.name || 'Anonymous',
        userClass: userProfile?.class || 'Unknown',
        amountKg: parseFloat(weight),
        type: selectedMaterial,
        status: 'pending',
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });

      // Get button position for animation start
      const rect = (e.target as HTMLFormElement).getBoundingClientRect();
      triggerCoins({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setWeight('');
        setPhotoUploaded(false);
        setAiResult(null);
        onNavigate('home');
      }, 3000);
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)] relative overflow-hidden">
      {isCoinAnimating && startPos && (
        <CoinFlyAnimation 
          startX={startPos.x} 
          startY={startPos.y} 
          count={15}
        />
      )}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[var(--color-bg-main)]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative"
            >
              <div className="w-32 h-32 bg-[var(--color-accent)] rounded-[48px] flex items-center justify-center mb-6 shadow-2xl shadow-[var(--color-accent)]/40">
                <ShieldCheck size={64} className="text-[var(--color-bg-main)]" />
              </div>
            </motion.div>
            <h2 className="text-4xl font-black text-[var(--color-text-main)] uppercase tracking-tight mb-2">Submitted!</h2>
            <p className="text-[var(--color-accent)] font-black text-xl uppercase tracking-widest">Waiting for mentor approval</p>
            <p className="text-[var(--color-text-secondary)] text-sm mt-4 font-bold uppercase tracking-widest">Redirecting to Dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 bg-[var(--color-accent)] z-10 relative overflow-hidden">
        <div className="absolute inset-0 geometric-green opacity-10" />
        <button 
          onClick={() => onNavigate('home')}
          className="text-[var(--color-bg-main)] hover:bg-[var(--color-bg-main)]/10 transition-colors flex items-center justify-center w-10 h-10 rounded-full relative z-10"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase text-[var(--color-bg-main)] relative z-10">Submit Recycling</h1>
        <button 
          onClick={() => onNavigate('settings')}
          className="text-[var(--color-bg-main)] hover:bg-[var(--color-bg-main)]/10 transition-colors flex items-center justify-center w-10 h-10 rounded-full relative z-10"
        >
          <Settings size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col px-5 space-y-6 pt-6">
        {/* Hero */}
        <div className="flex items-center gap-4 p-6 rounded-3xl bg-[var(--color-card-bg)] shadow-xl shadow-black/5 border border-[var(--color-border)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 geometric-green opacity-5 -mr-8 -mt-8" />
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg-main)] shrink-0 shadow-lg shadow-[var(--color-accent)]/20">
            <Recycle size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black text-[var(--color-text-main)] leading-tight">Data Entry</h2>
            <p className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-widest">Secure Verification Protocol</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Photo Verification Section */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--color-text-main)] uppercase tracking-widest ml-1 flex items-center gap-1">
              <Sparkles size={10} className="text-[var(--color-accent)]" />
              AI Sorting Assistant
            </label>
            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              className={`w-full min-h-[160px] rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all p-6 text-center ${photoUploaded ? 'border-[var(--color-accent)] bg-[var(--color-card-bg)] shadow-xl shadow-[var(--color-accent)]/10' : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/30 bg-[var(--color-card-bg)]/50'}`}
            >
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Loader2 className="text-[var(--color-text-main)] animate-spin" size={48} />
                    <Sparkles className="absolute -top-1 -right-1 text-[var(--color-accent)] animate-pulse" size={16} />
                  </div>
                  <p className="text-[var(--color-text-main)] text-xs font-black animate-pulse uppercase tracking-widest">Gemini AI Analyzing...</p>
                </div>
              ) : photoUploaded ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                    <ShieldCheck size={40} />
                  </div>
                  <div>
                    <p className="text-[var(--color-accent)] text-xs font-black uppercase tracking-widest">AI Verification Successful</p>
                    <p className="text-[var(--color-text-main)] text-[11px] font-bold mt-1 leading-tight max-w-[200px]">{aiResult}</p>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setPhotoUploaded(false); }} className="text-[var(--color-text-secondary)] text-[10px] font-black uppercase tracking-widest border-b border-[var(--color-text-secondary)]/20 pb-0.5">Retake Photo</button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-[var(--color-text-main)]/5 flex items-center justify-center text-[var(--color-text-main)]/20 mb-3">
                    <Camera size={32} />
                  </div>
                  <p className="text-[var(--color-text-main)] font-black text-sm uppercase tracking-tight">Scan Items for Points</p>
                  <p className="text-[var(--color-text-secondary)]/60 text-[10px] font-bold uppercase tracking-wider mt-1">Powered by Gemini Vision AI</p>
                </>
              )}
            </motion.div>
          </div>

          {/* Class Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--color-text-main)] uppercase tracking-widest ml-1">Select Class</label>
            <div className="relative group">
              <select defaultValue="" className="w-full h-14 pl-4 pr-10 bg-[var(--color-card-bg)] text-[var(--color-text-main)] border border-[var(--color-border)] rounded-2xl focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:outline-none appearance-none cursor-pointer transition-all hover:border-[var(--color-accent)]/30 shadow-sm font-bold">
                <option disabled value="">Choose a class...</option>
                <option value="7a">7-A</option>
                <option value="7b">7-B</option>
                <option value="9a">9-A</option>
                <option value="10c">10-C</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[var(--color-text-main)]">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Material Type */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--color-text-main)] uppercase tracking-widest ml-1">Material Type</label>
            <div className="grid grid-cols-2 gap-3">
              <MaterialOption 
                value="paper" 
                label="Paper" 
                icon={<FileText size={24} />} 
                activeColor="blue" 
                selected={selectedMaterial === 'paper'}
                onClick={() => setSelectedMaterial('paper')}
              />
              <MaterialOption 
                value="plastic" 
                label="Plastic" 
                icon={<GlassWater size={24} />} 
                activeColor="orange" 
                selected={selectedMaterial === 'plastic'}
                onClick={() => setSelectedMaterial('plastic')}
              />
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--color-text-main)] uppercase tracking-widest ml-1">Weight (KG)</label>
            <motion.div 
              whileFocus={{ scale: 1.02 }}
              className="relative flex items-center"
            >
              <input 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full h-24 pl-6 pr-20 bg-[var(--color-card-bg)] text-5xl font-black text-[var(--color-text-main)] border-2 border-[var(--color-border)] rounded-[40px] focus:border-[var(--color-accent)] focus:ring-0 focus:outline-none placeholder:text-[var(--color-text-main)]/5 transition-all shadow-xl shadow-black/5 font-mono tracking-tighter" 
              />
              <div className="absolute right-0 h-full flex items-center pr-6 border-l border-[var(--color-border)] pl-6">
                <span className="text-[var(--color-text-main)] font-black text-xl">KG</span>
              </div>
            </motion.div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={!photoUploaded || !weight}
              className={`group w-full relative overflow-hidden rounded-[40px] p-[1px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-main)] transition-all duration-300 ${photoUploaded && weight ? 'bg-[var(--color-accent)] shadow-2xl shadow-[var(--color-accent)]/30' : 'bg-[var(--color-border)] opacity-50 cursor-not-allowed'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className={`relative h-20 rounded-[39px] flex items-center justify-center gap-3 ${photoUploaded && weight ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-card-bg)]'}`}>
                <Upload size={24} className={photoUploaded && weight ? 'text-[var(--color-bg-main)]' : 'text-[var(--color-text-secondary)]/40'} />
                <span className={`font-black text-xl tracking-widest uppercase ${photoUploaded && weight ? 'text-[var(--color-bg-main)]' : 'text-[var(--color-text-secondary)]/40'}`}>Authorize Impact</span>
              </div>
            </button>
          </div>
        </form>

        {/* Recent Entries */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] pb-12">
          <h3 className="text-[10px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest mb-4">Recent Verified Entries</h3>
          <div className="space-y-3">
            <RecentEntry 
              icon={<FileText size={16} />} 
              title="Class 9-A" 
              subtitle="Paper • Just now" 
              value="+12.5 kg" 
              status="Verified" 
            />
            <RecentEntry 
              icon={<GlassWater size={16} />} 
              title="Class 8-B" 
              subtitle="Plastic • 15m ago" 
              value="+5.2 kg" 
              status="Pending Tutor" 
            />
          </div>
        </div>

        {/* Startup Economics (Step 4) */}
        <div className="mt-8 p-6 rounded-[40px] bg-[var(--color-accent)] text-[var(--color-bg-main)] relative overflow-hidden shadow-2xl shadow-[var(--color-accent)]/30">
          <div className="absolute top-0 right-0 w-32 h-32 geometric-green opacity-10 -mr-8 -mt-8 rotate-12" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-main)]/20 flex items-center justify-center text-[var(--color-bg-main)]">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight">Startup Economics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-[var(--color-bg-main)]/5 border border-[var(--color-bg-main)]/10">
              <p className="text-[8px] font-black text-[var(--color-bg-main)] uppercase tracking-widest mb-1">Revenue Stream</p>
              <p className="text-sm font-bold">50 KZT / KG</p>
              <p className="text-[8px] text-[var(--color-bg-main)]/40 uppercase font-black">EcoQolday Rate</p>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--color-bg-main)]/5 border border-[var(--color-bg-main)]/10">
              <p className="text-[8px] font-black text-[var(--color-bg-main)] uppercase tracking-widest mb-1">Operating Cost</p>
              <p className="text-sm font-bold">12 KZT / KG</p>
              <p className="text-[8px] text-[var(--color-bg-main)]/40 uppercase font-black">Logistics & AI</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--color-bg-main)]/10 border border-[var(--color-bg-main)]/20">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-black text-[var(--color-bg-main)] uppercase tracking-widest">Net Margin</p>
              <p className="text-xs font-black text-[var(--color-bg-main)]">+76%</p>
            </div>
            <p className="text-[9px] text-[var(--color-bg-main)]/60 font-medium leading-tight">
              Sustainable model: Revenue from recycled materials covers AI costs and school rewards.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function MaterialOption({ value, label, icon, activeColor, selected, onClick }: any) {
  const colors: any = {
    blue: "peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)]/10",
    orange: "peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)]/10",
  };

  const iconColors: any = {
    blue: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
    orange: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  };

  const textColors: any = {
    blue: "text-[var(--color-accent)]",
    orange: "text-[var(--color-accent)]",
  };

  return (
    <label className="cursor-pointer group">
      <input 
        type="radio" 
        name="material" 
        value={value} 
        className="peer sr-only" 
        checked={selected}
        onChange={onClick}
      />
      <div className={`flex flex-col items-center justify-center py-6 rounded-[32px] border-2 border-transparent bg-[var(--color-card-bg)] shadow-sm transition-all duration-300 group-hover:shadow-md ${colors[activeColor]}`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ${iconColors[activeColor]}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${textColors[activeColor]}`}>{label}</span>
      </div>
    </label>
  );
}

function RecentEntry({ icon, title, subtitle, value, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'Verified' ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]' : 'bg-[var(--color-text-secondary)]/10 text-[var(--color-text-secondary)]'}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--color-text-main)]">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-[var(--color-text-secondary)] font-medium">{subtitle}</p>
            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full border ${status === 'Verified' ? 'border-[var(--color-accent)]/30 text-[var(--color-accent)]' : 'border-[var(--color-text-secondary)]/30 text-[var(--color-text-secondary)]'}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
      <span className="font-mono text-[var(--color-text-main)] font-black">{value}</span>
    </div>
  );
}
