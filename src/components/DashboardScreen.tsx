import React, { useState, useEffect } from 'react';
import { Bell, TrendingUp, Leaf, Award, ChevronRight, ArrowUpRight, Users, Calendar, LayoutGrid, Settings, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
// This is the important part:
import { db } from '../lib/firebase'; 
import { doc, onSnapshot } from 'firebase/firestore';

export default function DashboardScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { t } = useTheme();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This tells the screen to watch the "impact" page in the "stats" notebook
    const unsub = onSnapshot(doc(db, "stats", "impact"), (doc) => {
      if (doc.exists()) {
        setStats(doc.data());
      }
      setLoading(false);
    });
    return () => unsub(); // Stop watching when leaving the screen
  }, []);

  // Small gray pulsing bar while waiting for numbers
  const Skeleton = () => <div className="h-8 w-24 bg-white/20 animate-pulse rounded" />;

  return (
    <div className="pb-24 flex flex-col min-h-full bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      <main className="flex-1 px-6 py-4 space-y-8">
        <section>
          <div className="bg-[var(--color-accent)] p-8 rounded-[40px] text-[var(--color-bg-main)] shadow-2xl">
            <p className="text-[10px] font-black uppercase opacity-60 mb-1">{t('dash.totalFund')}</p>
            <h3 className="text-4xl font-black mb-6">
              {loading ? <Skeleton /> : `${stats?.total_kzt?.toLocaleString()} KZT`}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-3xl">
                <p className="text-[8px] font-black uppercase opacity-60">Projects</p>
                <p className="text-xl font-black">{loading ? "..." : stats?.active_projects}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-3xl">
                <p className="text-[8px] font-black uppercase opacity-60">Recycled</p>
                <p className="text-xl font-black">{loading ? "..." : `${stats?.recycled_kg}kg`}</p>
              </div>
            </div>
          </div>
        </section>
        {/* Rest of your UI below */}
      </main>
    </div>
  );
}
