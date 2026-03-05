import React from 'react'
import AnimatedNumber from './AnimatedNumber';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  trend?: number;
  subtitle?: string;
}

const KPICard = ({ title, value, suffix = "", icon, color, trend, subtitle }: KPICardProps) => {
  return (
    <div style={{
      background: "rgba(15,23,42,0.8)",
      border: `1px solid ${color}33`,
      borderRadius: 16,
      padding: "20px 24px",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${color}22`; }}
    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${color}18, transparent 70%)`,
        pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{title}</span>
        <span style={{ fontSize: 22 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, color: color, lineHeight: 1, marginBottom: 6 }}>
        <AnimatedNumber value={value} suffix={suffix} />
      </div>
      {subtitle && <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>{subtitle}</div>}
      {trend !== undefined && (
        <div style={{ fontSize: 12, color: trend >= 0 ? "#22c55e" : "#ef4444", marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
          <span>{trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%</span>
          <span style={{ color: "#475569" }}>vs last 24h</span>
        </div>
      )}
    </div>
  );
}

export default KPICard