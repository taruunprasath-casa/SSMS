export const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  proper:    { label: "Proper",    color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   dot: "bg-green-500"  },
  low:       { label: "Low Stock", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  dot: "bg-yellow-500" },
  empty:     { label: "Empty",     color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   dot: "bg-red-500"    },
  overstock: { label: "Overstock", color: "#6366f1", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)",  dot: "bg-indigo-500" },
};

export const SEVERITY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: "#ef4444", bg: "rgba(239,68,68,0.15)",  label: "Critical" },
  high:     { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", label: "High"     },
  medium:   { color: "#6366f1", bg: "rgba(99,102,241,0.15)", label: "Medium"   },
  low:      { color: "#94a3b8", bg: "rgba(148,163,184,0.15)",label: "Low"      },
};

export const ALERT_TYPE_ICONS: Record<string, string> = {
  empty_shelf:   "📭",
  low_stock:     "⚠️",
  refill_needed: "🔄",
  overstock:     "📦",
  anomaly:       "🔍",
};

export const timeAgo = (iso: string): string => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60)   return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  return `${Math.floor(diff/3600)}h ago`;
};
