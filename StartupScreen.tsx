import { ArrowLeft, Rocket, Target, Zap, Users, BarChart3, ShieldCheck, Globe, ChevronRight, MessageSquare, Briefcase, Scale } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export default function StartupScreen({ onBack }: { onBack: () => void }) {
  const { darkMode, t } = useTheme();
  const steps = [
    {
      id: 1,
      title: "Problem & Solution",
      icon: <Target className="text-[var(--color-accent)]" />,
      status: "Validated",
      description: "Turkistan lacks recycling infrastructure. Schools are the perfect decentralized hubs.",
      details: ["Customer Interviews: 50+ students", "UVP: AI-Verified ESG Rewards"]
    },
    {
      id: 2,
      title: "MVP Build",
      icon: <Zap className="text-[var(--color-accent)]" />,
      status: "Live",
      description: "AI Sorting Assistant + ESG Dashboard + Real-time Leaderboard.",
      details: ["Tech: Gemini Vision AI", "Low-cost: Serverless Architecture"]
    },
    {
      id: 3,
      title: "Market Traction",
      icon: <BarChart3 className="text-[var(--color-accent)]" />,
      status: "In Progress",
      description: "Securing first 5 schools in the Turkistan region.",
      details: ["Waitlist: 12 schools", "Pre-sales: EcoQolday Partnership"]
    },
    {
      id: 4,
      title: "Fundamentals",
      icon: <Briefcase className="text-[var(--color-accent)]" />,
      status: "Planning",
      description: "Mapping unit economics (50 KZT/kg) and team expansion.",
      details: ["Team: 3 Co-founders", "Legal: ESG Corp Registration"]
    },
    {
      id: 5,
      title: "Scale & Grow",
      icon: <Rocket className="text-[var(--color-accent)]" />,
      status: "Future",
      description: "Expanding to Almaty and Shymkent markets.",
      details: ["Funding: Seed Round Q4", "Goal: 1M kg recycled by 2027"]
    }
  ];

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 bg-[var(--color-accent)] z-10 relative overflow-hidden">
        <div className="absolute inset-0 geometric-green opacity-10" />
        <button 
          onClick={onBack}
          className="text-[var(--color-bg-main)] hover:bg-[var(--color-bg-main)]/10 transition-colors flex items-center justify-center w-10 h-10 rounded-full relative z-10"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase text-[var(--color-bg-main)] relative z-10">Startup Roadmap</h1>
        <div className="w-10 h-10" />
      </header>

      <main className="flex-1 flex flex-col px-6 space-y-8 pt-8">
        {/* Pitch Card */}
        <div className="bg-[var(--color-card-bg)] p-6 rounded-[40px] shadow-2xl shadow-black/10 border border-[var(--color-border)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 geometric-green opacity-5 -mr-8 -mt-8" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg-main)]">
              <Rocket size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--color-text-main)] uppercase tracking-tight">Eco-Nexus Startup</h2>
              <p className="text-[10px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest">Green-Tech MVP v1.0</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
            We are building the first decentralized circular economy platform for Central Asian schools, powered by AI and verified by ESG data.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest ml-1">Execution Strategy</h3>
          {steps.map((step) => (
            <div key={step.id} className="group bg-[var(--color-card-bg)] p-5 rounded-3xl border border-[var(--color-border)] shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-black text-[var(--color-text-main)] uppercase tracking-tight">{step.title}</h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      step.status === 'Live' ? 'bg-emerald-100/20 text-emerald-500' : 
                      step.status === 'Validated' ? 'bg-blue-100/20 text-blue-500' :
                      step.status === 'In Progress' ? 'bg-orange-100/20 text-orange-500' :
                      'bg-slate-100/20 text-slate-500'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]/70 font-medium mb-3 leading-snug">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, i) => (
                      <span key={i} className="text-[9px] font-bold text-[var(--color-text-main)] bg-[var(--color-accent)]/10 px-2 py-1 rounded-lg">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Investor CTA */}
        <div className="p-6 rounded-[40px] bg-[var(--color-accent)] text-[var(--color-bg-main)] relative overflow-hidden shadow-2xl shadow-[var(--color-accent)]/30">
          <div className="absolute top-0 right-0 w-32 h-32 geometric-green opacity-10 -mr-8 -mt-8 rotate-12" />
          <h4 className="text-lg font-black uppercase tracking-tight text-[var(--color-bg-main)]/60 mb-2">Investor Portal</h4>
          <p className="text-xs text-[var(--color-bg-main)]/80 font-medium mb-4">
            Download our full Pitch Deck and Financial Projections for the Central Asian market.
          </p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-[var(--color-bg-main)] text-[var(--color-accent)] font-black rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-black/10"
          >
            Request Pitch Deck <ChevronRight size={16} />
          </motion.button>
        </div>
      </main>
    </div>
  );
}
