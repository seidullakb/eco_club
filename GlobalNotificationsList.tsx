import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Bell, Zap } from 'lucide-react';

interface GlobalNotification {
  id: string;
  title: string;
  description: string;
  timestamp: any;
  isNew: boolean;
}

export default function GlobalNotificationsList() {
  const [notifications, setNotifications] = useState<GlobalNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'global_notifications'),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GlobalNotification[];
      setNotifications(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Bell size={32} className="text-[var(--color-text-main)]/20" />
        <p className="text-[var(--color-text-main)]/30 text-xs font-bold uppercase tracking-widest">
          No notifications yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`relative rounded-2xl p-4 border transition-all ${
            n.isNew
              ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20'
              : 'bg-[var(--color-bg-main)]/60 border-[var(--color-border)]'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              n.isNew ? 'bg-[var(--color-accent)]/20' : 'bg-[var(--color-text-main)]/5'
            }`}>
              <Zap size={14} className={n.isNew ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-main)]/40'} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className={`text-xs font-black uppercase tracking-wider truncate ${
                  n.isNew ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-main)]/60'
                }`}>
                  {n.title}
                </p>
                {n.isNew && (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_rgba(45,255,126,0.8)]" />
                )}
              </div>
              <p className="text-[var(--color-text-main)]/60 text-xs leading-relaxed">{n.description}</p>
              {n.timestamp && (
                <p className="text-[var(--color-text-main)]/20 text-[10px] font-bold uppercase tracking-widest mt-2">
                  {n.timestamp.toDate().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
