import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  userClass: string | null;
  loading: boolean;
  classLoading: boolean;
  setUserClass: (className: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userClass, setUserClassState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [classLoading, setClassLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setClassLoading(true);
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserClassState(data.class || null);
          } else {
            setUserClassState(null);
          }
        } catch (error) {
          console.error("Error fetching user class:", error);
          setUserClassState(null);
        } finally {
          setClassLoading(false);
        }
      } else {
        setUserClassState(null);
        setClassLoading(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const setUserClass = async (className: string) => {
    if (user) {
      setClassLoading(true);
      try {
        await setDoc(doc(db, 'users', user.uid), {
          class: className,
          email: user.email,
          name: user.displayName,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
        setUserClassState(className);
      } catch (error) {
        console.error("Error saving user class:", error);
        throw error;
      } finally {
        setClassLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, userClass, loading, classLoading, setUserClass }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}