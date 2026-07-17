import { cn } from "../../lib/cn.js";

const variants = {
  neutral: "bg-slate-100 text-slate-700",
  success: "bg-eco-100 text-eco-800",
  warning: "bg-amber-100 text-amber-800",
  info: "bg-sky-100 text-sky-800",
  error: "bg-red-100 text-red-700",
};

export default function Badge({ children, variant = "neutral", className }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}
