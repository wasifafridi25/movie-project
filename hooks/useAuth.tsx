import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";
import { error } from "console";

interface useAuthProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

//if use arrow function can use directly, but here since normal function and has return type, need to store in variable
export default function useAuth({ children }: useAuthProps){
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true) //blocks the UI
  const router = useRouter();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user){
            setUser(user)
            setLoading(false)
        }else{
            setUser(null)
            setLoading(true)
            router.push("/login")
        }

        setInitialLoading(false)
    })
  }, [auth, router])

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    await signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logout,
      loading,
      error,
    }),
    [loading, user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
  );
}

export const Auth = () => {
  return useContext(AuthContext);
}
