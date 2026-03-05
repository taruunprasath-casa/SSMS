import { useState } from "react";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import Badge from "../components/Badge";

const SettingsPage = () => {
  const [thresholds, setThresholds] = useState<Record<string, number>>({
    empty_consecutive: 3,
    low_stock_window_min: 30,
    overstock_hours: 4,
    alert_cooldown_min: 15,
  });
  const [saved, setSaved] = useState<boolean>(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 800 }}>
      <Card>
        <SectionHeader title="⚙️ Alert Thresholds" subtitle="Configure when alerts are triggered" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { key: "empty_consecutive",   label: "Empty — Consecutive Detections to Trigger", unit: "detections", min:1, max:10 },
            { key: "low_stock_window_min", label: "Low Stock — Rolling Window",                unit: "minutes",    min:5, max:60 },
            { key: "overstock_hours",      label: "Overstock — Duration Before Alert",         unit: "hours",      min:1, max:12 },
            { key: "alert_cooldown_min",   label: "Alert Deduplication Cooldown",              unit: "minutes",    min:5, max:60 },
          ].map(f => (
            <div key={f.key} style={{ display: "flex", alignItems: "center", gap: 16,
              padding: "14px 18px", background: "rgba(30,41,59,0.5)", borderRadius: 12, border: "1px solid #1e293b" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{f.label}</div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{f.min}–{f.max} {f.unit}</div>
              </div>
              <input type="range" min={f.min} max={f.max} value={thresholds[f.key]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThresholds(prev => ({...prev, [f.key]: +e.target.value}))}
                style={{ width: 140 }} />
              <div style={{ width: 60, textAlign: "center", fontSize: 18, fontWeight: 800, color: "#3b82f6" }}>
                {thresholds[f.key]}
              </div>
            </div>
          ))}
        </div>
        <button onClick={save} style={{
          marginTop: 20, padding: "10px 28px", borderRadius: 10, border: "none",
          background: saved ? "#22c55e" : "#1d4ed8", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
          transition: "background 0.3s",
        }}>{saved ? "✓ Saved!" : "Save Settings"}</button>
      </Card>

      <Card>
        <SectionHeader title="🔗 API Configuration" subtitle="Backend connection settings" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "FastAPI Backend URL", value: "http://localhost:8000", placeholder: "http://your-api.com" },
            { label: "WebSocket URL",        value: "ws://localhost:8001",  placeholder: "ws://your-ws.com" },
            { label: "ClickHouse Host",      value: "localhost:9000",       placeholder: "clickhouse-host" },
          ].map(f => (
            <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{f.label}</label>
              <input defaultValue={f.value} placeholder={f.placeholder} style={{
                padding: "10px 14px", borderRadius: 10, border: "1px solid #1e293b",
                background: "#0f172a", color: "#e2e8f0", fontSize: 13,
              }} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="👤 Admin User Management" subtitle="Manage dashboard access" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { name: "Taruun Prasath",    email: "taruun@store.com",  role: "Super Admin", active: true  },
            { name: "Viswanth",  email: "viswanth@store.com", role: "Manager",     active: true  },
            { name: "Sudharshini",   email: "sudharshini@store.com",role: "Viewer",      active: false },
            { name: "Darshana",   email: "darshana@store.com",role: "Viewer",      active: false },
          ].map(u => (
            <div key={u.email} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
              background: "rgba(30,41,59,0.5)", borderRadius: 10, border: "1px solid #1e293b" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1d4ed8",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>
                {u.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{u.name}</div>
                <div style={{ fontSize: 11, color: "#475569" }}>{u.email}</div>
              </div>
              <Badge text={u.role}   color="#6366f1" bg="rgba(99,102,241,0.15)" />
              <Badge text={u.active ? "Active" : "Inactive"} color={u.active?"#22c55e":"#64748b"} bg={u.active?"rgba(34,197,94,0.12)":"rgba(100,116,139,0.12)"} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;