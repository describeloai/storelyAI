import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
        padding: "2rem",
      }}
    >
      <SignIn
        path="/sign-in"
        routing="path"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
