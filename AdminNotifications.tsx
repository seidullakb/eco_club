import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Send, Loader2, Bell } from 'lucide-react';

export default function AdminNotifications() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Both title and description are required.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await addDoc(collection(db, 'global_notifications'), {
        title: title.trim().toUpperCase(),
        description: description.trim(),
        timestamp: serverTimestamp(),
        isNew: true,
      });
      setTitle('');
      setDescription('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-[var(--color-bg-main)]/50 border border-[var(--color-border)] rounded-2xl px-4 py-3 text-[var(--color-text-main)] text-sm focus:border-[var(--color-accent)] focus:bg-[var(--color-bg-main)]/80 outline-none transition-all placeholder:text-[var(--color-text-main)]/20 resize-none";

  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[var(--color-accent)]/20 rounded-xl flex items-center justify-center border border-[var(--color-accent)]/30">
          <Bell size={18} className="text-[var(--color-accent)]" />
        </div>
        <div>
          <h2 className="text-sm font-black text-[var(--color-text-main)] uppercase tracking-wider">
            Broadcast Notification
          </h2>
          <p className="text-[var(--color-text-main)]/30 text-xs uppercase tracking-widest">
            Sends to all users instantly
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs p-3 rounded-xl text-center font-black uppercase tracking-widest">
          Notification sent successfully
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="TITLE — e.g. NEW CHALLENGE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          maxLength={60}
        />
        <textarea
          placeholder="Description — what should users know?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputClass}
          maxLength={300}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-bg-main)] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Send size={16} />
              Broadcast
            </>
          )}
        </button>
      </form>
    </div>
  );
}