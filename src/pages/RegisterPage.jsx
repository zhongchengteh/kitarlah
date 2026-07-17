import { Lock, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import InputField from "../components/ui/InputField.jsx";
import { AuthFrame } from "./LoginPage.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Create profile" subtitle="Create your recovery passport and unlock your first local mission.">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/app/dashboard");
        }}
      >
        <InputField id="name" label="Name" icon={UserRound} placeholder="Your name" />
        <InputField id="member-id" label="Member ID" icon={UserRound} placeholder="M1234567" />
        <InputField id="email" label="Email" icon={Mail} type="email" placeholder="member@example.com" />
        <InputField id="password" label="Password" icon={Lock} type="password" placeholder="Create password" />
        <Button type="submit" size="lg" className="mt-2 w-full">
          Start my journey
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link to="/login" className="font-bold text-eco-800">
          Login
        </Link>
      </p>
    </AuthFrame>
  );
}
