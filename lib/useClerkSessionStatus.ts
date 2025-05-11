// lib/useClerkSessionStatus.ts
"use client";

import { useUser, useClerk } from "@clerk/nextjs";

export function useClerkSessionStatus() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  return {
    isSignedIn,
    signOut,
  };
}
