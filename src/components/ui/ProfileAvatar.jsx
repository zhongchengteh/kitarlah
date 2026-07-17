import { cn } from "../../lib/cn.js";

export default function ProfileAvatar({ src, name, className }) {
  return <img src={src} alt={`${name} profile`} className={cn("shrink-0 rounded-full object-cover ring-2 ring-white shadow-soft", className)} />;
}
