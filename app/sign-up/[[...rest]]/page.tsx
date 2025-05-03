import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
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
      <SignUp
        path="/sign-up"
        routing="path"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}
