"use client";

import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

async function syncFirebaseAuth(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error("Error siging in with the custom token:", error);
    }
  } else {
    auth.signOut();
  }
}

//Sync with the authentication tab of firebase

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    syncFirebaseAuth(session);
  }, [session]);

  return <div>{children}</div>;
}

export default FirebaseAuthProvider;
