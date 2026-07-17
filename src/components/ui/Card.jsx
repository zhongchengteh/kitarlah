import { cn } from "../../lib/cn.js";

const variants = {
  default: "bg-white ring-1 ring-slate-100",
  elevated: "bg-white shadow-soft ring-1 ring-eco-100",
  interactive: "bg-white shadow-soft ring-1 ring-eco-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.99]",
  tinted: "bg-eco-50 ring-1 ring-eco-100",
};

export default function Card({ children, className, variant = "default", as: Component = "div" }) {
  return <Component className={cn("rounded-lg p-4", variants[variant], className)}>{children}</Component>;
}
