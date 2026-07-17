import { Recycle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="phone-shell flex min-h-screen flex-col justify-center bg-white px-4 py-8">
        <img src={`${import.meta.env.BASE_URL}kitarlah-logo.png`} alt="Kitarlah logo" className="mx-auto size-24 rounded-full object-cover shadow-soft" />

        <section className="mt-6 text-center">
          <h1 className="text-4xl font-black text-slate-950">Kitarlah</h1>
          <p className="mt-3 text-base font-semibold text-eco-800">Recover plastic. Grow change.</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            A plastic recovery prototype for verified QR entries, better everyday choices, and cleaner local recycling.
          </p>
        </section>

        <div className="mt-8 grid gap-3">
          <Link to="/login">
            <Button className="w-full" size="lg">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-full" variant="secondary" size="lg">
              Sign up
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Card variant="tinted" className="p-4 text-center">
            <Recycle className="mx-auto size-7 text-eco-700" />
            <p className="mt-2 text-sm font-black text-eco-900">Verify & recover</p>
          </Card>
          <Card variant="tinted" className="p-4 text-center">
            <Sparkles className="mx-auto size-7 text-eco-700" />
            <p className="mt-2 text-sm font-black text-eco-900">Learn & improve</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
