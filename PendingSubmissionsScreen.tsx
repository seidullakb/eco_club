import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Clock, User, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  increment, 
  runTransaction,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Submission {
  id: string;
  userId: string;
  userName: string;
  userClass: string;
  amountKg: number;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function PendingSubmissionsScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { darkMode, t } = useTheme();
  const { userProfile } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'submissions'), where('status', '==', 'pending'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
      setSubmissions(docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (submission: Submission) => {
    setProcessingId(submission.id);
    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, 'users', submission.userId);
        const statsRef = doc(db, 'stats', 'impact');
        const submissionRef = doc(db, 'submissions', submission.id);

        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) throw new Error("User does not exist!");

        const points = Math.round(submission.amountKg * 50);

        // 1. Update user profile
        transaction.update(userRef, {
          ecoBalance: increment(points),
          pickups: increment(1),
          updatedAt: new Date().toISOString()
        });

        // 2. Update global stats
        transaction.update(statsRef, {
          total_kzt: increment(points),
          recycled_kg: increment(submission.amountKg)
        });

        // 3. Update submission status
        transaction.update(submissionRef, {
          status: 'approved',
          approvedAt: new Date().toISOString(),
          approvedBy: userProfile?.uid
        });
      });
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Failed to approve submission.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (submissionId: string) => {
    if (!window.confirm("Are you sure you want to reject and delete this submission?")) return;
    
    setProcessingId(submissionId);
    try {
      await deleteDoc(doc(db, 'submissions', submissionId));
    } catch (error) {
      console.error("Rejection failed:", error);
      alert("Failed to reject submission.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <header className="sticky top-0 z-30 px-6 pt-12 pb-4 bg-[var(--color-bg-main)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-[var(--color-card-bg)] rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-black uppercase tracking-tight">Approval Queue</h1>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 size={40} className="animate-spin text-[var(--color-accent)]" />
            <p className="text-xs font-black uppercase tracking-widest opacity-40">Loading Submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="w-20 h-20 rounded-[32px] bg-[var(--color-card-bg)] flex items-center justify-center border border-[var(--color-border)]">
              <Clock size={40} className="opacity-20" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">All Caught Up!</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">No pending submissions to review</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 px-2">
              {submissions.length} Pending {submissions.length === 1 ? 'Entry' : 'Entries'}
            </p>
            <AnimatePresence mode="popLayout">
              {submissions.map((sub) => (
                <motion.div
                  key={sub.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[var(--color-card-bg)] p-5 rounded-[32px] border border-[var(--color-border)] shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight">{sub.userName}</h4>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Class {sub.userClass}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black tracking-tighter">{sub.amountKg} KG</p>
                      <p className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-widest">{sub.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 uppercase tracking-widest bg-black/5 p-2 rounded-xl">
                    <Clock size={12} />
                    {new Date(sub.createdAt).toLocaleString()}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      disabled={processingId === sub.id}
                      onClick={() => handleApprove(sub)}
                      className="h-12 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {processingId === sub.id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                      Approve
                    </button>
                    <button
                      disabled={processingId === sub.id}
                      onClick={() => handleReject(sub.id)}
                      className="h-12 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {processingId === sub.id ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
