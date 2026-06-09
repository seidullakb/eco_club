import React, { useState } from 'react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { Leaf, Mail, Lock, LogIn, UserPlus, User } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        setError("Your browser blocked the login popup. Please enable popups or try a different browser.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError("Login window was closed. Please try again.");
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
      if (isSignUpMode) {
        if (!firstName.trim() || !lastName.trim()) {
          setError("Please enter your first and last name.");
          setLoading(false);
          return;
        }
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        await updateProfile(credential.user, { displayName: fullName });
        await setDoc(doc(db, 'users', credential.user.uid), {
          uid: credential.user.uid,
          email: credential.user.email,
          name: fullName,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          class: null,
          role: 'student',
          ecoBalance: 0,
          pickups: 0,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full h-14 bg-[var(--color-bg-main)]/50 border border-[var(--color-border)] rounded-2xl pl-12 pr-4 text-[var(--color-text-main)] focus:border-[var(--color-accent)] focus:bg-[var(--color-bg-main)]/80 outline-none transition-all placeholder:text-[var(--color-text-main)]/20";

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
          <h1 className="text-3xl font-black text-[var(--color-text-main)] tracking-tight uppercase">
            {isSignUpMode ? 'SIGN UP' : 'SIGN IN'}
          </h1>
          <p className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-widest mt-2">
            {isSignUpMode ? t('auth.create') : t('auth.welcome')}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl mb-6">
            <p className="text-center font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUpMode && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)]/30" size={18} />
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)]/30" size={18} />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)]/30" size={18} />
            <input
              type="email"
              placeholder={t('auth.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
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
              className={inputClass}
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
                {isSignUpMode ? <UserPlus size={20} /> : <LogIn size={20} />}
                {isSignUpMode ? 'SIGN UP' : 'SIGN IN'}
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
          {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={() => { setIsSignUpMode(!isSignUpMode); setError(null); }}
            className="ml-2 text-[var(--color-accent)] hover:opacity-80 transition-colors underline underline-offset-4"
          >
            {isSignUpMode ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}