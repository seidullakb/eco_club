import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  class: string | null;
  role: 'student' | 'mentor' | 'admin';
  ecoBalance: number;
  pickups: number;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userClass: string | null;
  loading: boolean;
  classLoading: boolean;
  setUserClass: (className: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userClass, setUserClassState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [classLoading, setClassLoading] = useState(false);

  // Bootstrap global stats
  useEffect(() => {
    const bootstrapStats = async () => {
      if (!user) return; // Only bootstrap if user is logged in
      
      try {
        // Initialize impact stats with zeros if they don't exist
        await setDoc(doc(db, 'stats', 'impact'), {
          total_kzt: 0,
          recycled_kg: 0,
          active_projects: 0,
          trees_planted: 0,
          co2_saved: 0
        }, { merge: true });

        // Initialize leaderboard meta if it doesn't exist
        await setDoc(doc(db, 'stats', 'leaderboard_meta'), {
          total_users: 0,
          total_pickups: 0
        }, { merge: true });
      } catch (error) {
        console.error("Error bootstrapping stats:", error);
      }
    };
    bootstrapStats();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setClassLoading(true);
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            setUserProfile(data);
            setUserClassState(data.class || null);
          } else {
            // Create user profile if it doesn't exist
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              class: null,
              role: 'student',
              ecoBalance: 0,
              pickups: 0,
              updatedAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
            setUserProfile(newProfile);
            setUserClassState(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserClassState(null);
        } finally {
          setClassLoading(false);
        }
      } else {
        setUserProfile(null);
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
        const updateData = {
          class: className,
          updatedAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'users', user.uid), updateData, { merge: true });
        setUserClassState(className);
        if (userProfile) {
          setUserProfile({ ...userProfile, ...updateData });
        }
      } catch (error) {
        console.error("Error saving user class:", error);
        throw error;
      } finally {
        setClassLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, userClass, loading, classLoading, setUserClass }}>
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