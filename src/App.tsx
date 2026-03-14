/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import DashboardScreen from './components/DashboardScreen';
import RankingsScreen from './components/RankingsScreen';
import JourneyScreen from './components/JourneyScreen';
import AdminScreen from './components/AdminScreen';
import ProfileScreen from './components/ProfileScreen';
import StatsScreen from './components/StatsScreen';
import ContactScreen from './components/ContactScreen';
import StartupScreen from './components/StartupScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNav from './components/BottomNav';
import ProtectedRoute from './components/ProtectedRoute';

import { useTheme } from './contexts/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { darkMode, language, t } = useTheme();

  const getBgColor = () => {
    return 'bg-[var(--color-bg-main)]';
  };

  // Helper to change tab from within screens
  const navigateTo = (tab: string) => setActiveTab(tab);

  const pageVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <div className={`min-h-screen bg-[var(--color-bg-main)] ${darkMode ? 'dark' : ''} text-[var(--color-text-main)] font-sans overflow-hidden flex flex-col transition-colors duration-500 relative`}>
      {/* Global Background Elements */}
      <div className={`bird-bg ${darkMode ? 'opacity-5 invert' : ''}`} />
      <div className={`fixed inset-0 pattern-overlay pointer-events-none opacity-20 ${darkMode ? 'invert' : ''}`} />
      
      <ProtectedRoute>
        <div className={`flex-1 overflow-y-auto no-scrollbar relative max-w-md mx-auto w-full shadow-2xl ${darkMode ? 'bg-[var(--color-card-bg)]/50' : 'bg-white/10'} backdrop-blur-[2px]`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-h-full"
            >
              {activeTab === 'home' && <DashboardScreen onNavigate={navigateTo} />}
              {activeTab === 'rankings' && <RankingsScreen onNavigate={navigateTo} />}
              {activeTab === 'journey' && <JourneyScreen onNavigate={navigateTo} />}
              {activeTab === 'admin' && <AdminScreen onNavigate={navigateTo} />}
              {activeTab === 'profile' && <ProfileScreen onNavigate={navigateTo} />}
              {activeTab === 'stats' && <StatsScreen onNavigate={navigateTo} />}
              {activeTab === 'contact' && <ContactScreen onBack={() => setActiveTab('profile')} />}
              {activeTab === 'startup' && <StartupScreen onBack={() => setActiveTab('profile')} />}
              {activeTab === 'settings' && (
                <SettingsScreen 
                  onBack={() => setActiveTab('profile')} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </ProtectedRoute>
    </div>
  );
}
