"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Props {
  action: "login" | "signup";
  children: (onClick: () => void) => React.ReactNode;
}

export default function AuthAwareButton({ action, children }: Props) {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push(action === "login" ? "/sign-in" : "/sign-up");
    }
  };

  return <>{children(handleClick)}</>;
}
