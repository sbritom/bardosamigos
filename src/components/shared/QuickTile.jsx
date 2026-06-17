import { Link } from "react-router-dom";

export default function QuickTile({ icon, title, subtitle, to = "/" }) {
  return (
    <Link to={to} className="bar-mini-card p-4 flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <div>
        <div className="font-black text-sm">{title}</div>
        {subtitle && <div className="text-xs text-zinc-400">{subtitle}</div>}
      </div>
    </Link>
  );
}