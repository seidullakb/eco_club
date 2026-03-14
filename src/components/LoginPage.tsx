import React, { useState } from 'react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { Leaf, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isInIframe = window.self !== window.top;

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Reset auth state to prevent "Pending promise was never set" internal errors
      try {
        await signOut(auth);
      } catch (e) {
        // Ignore sign out errors
      }

      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Google Login Error:", err);
      
      if (err.code === 'auth/popup-blocked') {
        setError("Your browser blocked the login popup. Please click 'Open in New Tab' below to login safely.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError("Login window was closed. Please try again.");
      } else if (err.code === 'auth/internal-error' || err.message?.includes('INTERNAL ASSERTION')) {
        setError("Auth system got stuck due to iframe restrictions. Please use the 'Open in New Tab' button.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)]/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[var(--color-card-bg)] backdrop-blur-xl border border-[var(--color-border)] p-8 rounded-[32px] shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-accent)]/20 rounded-2xl flex items-center justify-center mb-4 border border-[var(--color-accent)]/30">
            <Leaf className="text-[var(--color-accent)]" size={32} />
          </div>
          <h1 className="text-3xl font-black text-[var(--color-text-main)] tracking-tight uppercase">{t('app.name')}</h1>
          <p className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-widest mt-2">
            {isRegistering ? t('auth.create') : t('auth.welcome')}
          </p>
        </div>

        {isInIframe && !error && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] p-3 rounded-xl mb-6 text-center font-bold uppercase tracking-wider">
            ⚠️ Running in Preview: Google Login works best in a new tab
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl mb-6 flex flex-col gap-3">
            <p className="text-center font-medium">{error}</p>
            <button 
              onClick={openInNewTab}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              🚀 Open in New Tab to Fix
            </button>
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)]/30" size={18} />
            <input 
              type="email" 
              placeholder={t('auth.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-[var(--color-bg-main)]/50 border border-[var(--color-border)] rounded-2xl pl-12 pr-4 text-[var(--color-text-main)] focus:border-[var(--color-accent)] focus:bg-[var(--color-bg-main)]/80 outline-none transition-all placeholder:text-[var(--color-text-main)]/20"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)]/30" size={18} />
            <input 
              type="password" 
              placeholder={t('auth.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 bg-[var(--color-bg-main)]/50 border border-[var(--color-border)] rounded-2xl pl-12 pr-4 text-[var(--color-text-main)] focus:border-[var(--color-accent)] focus:bg-[var(--color-bg-main)]/80 outline-none transition-all placeholder:text-[var(--color-text-main)]/20"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-bg-main)] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-accent)]/20"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-[var(--color-bg-main)]/30 border-t-[var(--color-bg-main)] rounded-full animate-spin" />
            ) : (
              <>
                {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
                {isRegistering ? t('auth.join') : t('auth.signin')}
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[var(--color-bg-main)] px-4 text-[var(--color-text-main)]/30 font-black tracking-widest">{t('auth.or')}</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full h-14 bg-[var(--color-card-bg)] hover:bg-[var(--color-card-bg)]/80 border border-[var(--color-border)] text-[var(--color-text-main)] font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          {t('auth.google')}
        </button>

        <p className="text-center mt-8 text-[var(--color-text-main)]/40 text-xs font-bold uppercase tracking-widest">
          {isRegistering ? t('auth.hasaccount') : t('auth.noaccount')}
          <button 
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="ml-2 text-[var(--color-accent)] hover:opacity-80 transition-colors underline underline-offset-4"
          >
            {isRegistering ? t('auth.signin') : t('auth.signup')}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
