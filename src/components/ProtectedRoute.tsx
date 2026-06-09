import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from './LoginPage';
import ClassSelectionPage from './ClassSelectionPage';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, userClass, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (!userClass) {
    return <ClassSelectionPage />;
  }

  return <>{children}</>;
}