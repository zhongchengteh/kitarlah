import { ArrowLeft, Lock, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import InputField from "../components/ui/InputField.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Welcome back" subtitle="Sign in with demo details to open your recycling dashboard.">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/app/dashboard");
        }}
      >
        <InputField id="member-id" label="Member ID" icon={UserRound} placeholder="M1234567" />
        <InputField id="email" label="Email" icon={Mail} type="email" placeholder="member@example.com" />
        <InputField id="password" label="Password" icon={Lock} type="password" placeholder="Password" />
        <Button type="submit" size="lg" className="mt-2 w-full">
          Login
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        New to Kitarlah?{" "}
        <Link to="/register" className="font-bold text-eco-800">
          Create account
        </Link>
      </p>
    </AuthFrame>
  );
}

export function AuthFrame({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="phone-shell flex min-h-screen flex-col justify-center px-4 py-8">
        <Link
          to="/"
          aria-label="Back to welcome page"
          className="mb-8 inline-flex size-11 items-center justify-center rounded-lg bg-white text-eco-800 shadow-soft ring-1 ring-eco-100 transition hover:bg-eco-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <Card variant="elevated" className="p-5">
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </Card>
      </div>
    </div>
  );
}
