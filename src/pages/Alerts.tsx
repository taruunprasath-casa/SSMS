import { useState } from "react";
import type { Alert } from "../types/types";
import { MOCK_ALERTS } from "../data/data";
import { ALERT_TYPE_ICONS, SEVERITY_CONFIG, timeAgo } from "../utils/config";
import Badge from "../components/Badge";
import Card from "../components/Card";


const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [filter, setFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = alerts.filter(a => {
    if (filter === "active" && a.acknowledged) return false;
    if (filter === "acknowledged" && !a.acknowledged) return false;
    if (typeFilter !== "all" && a.alert_type !== typeFilter) return false;
    return true;
  });

  const acknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.alert_id === id ? {...a, acknowledged: true, acknowledged_by:"admin"} : a));
  };

  const ackAll = () => setAlerts(prev => prev.map(a => ({...a, acknowledged: true, acknowledged_by:"admin"})));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { label: "Critical", count: alerts.filter(a=>a.severity==="critical").length, color: "#ef4444" },
          { label: "High",     count: alerts.filter(a=>a.severity==="high").length,     color: "#f59e0b" },
          { label: "Medium",   count: alerts.filter(a=>a.severity==="medium").length,   color: "#6366f1" },
          { label: "Acknowledged", count: alerts.filter(a=>a.acknowledged).length,      color: "#22c55e" },
        ].map(s => (
          <div key={s.label} style={{ padding: "18px 22px", background: "rgba(15,23,42,0.8)",
            border: `1px solid ${s.color}33`, borderRadius: 14, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.count}</span>
            <span style={{ fontSize: 13, color: "#64748b" }}>{s.label} Alerts</span>
          </div>
        ))}
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["all","active","acknowledged"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "7px 16px", borderRadius: 20, border: `1px solid ${filter===f?"#3b82f6":"#1e293b"}`,
                background: filter===f ? "rgba(59,130,246,0.2)" : "transparent",
                color: filter===f ? "#60a5fa" : "#64748b", fontSize: 12, cursor: "pointer", textTransform: "capitalize",
              }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <select value={typeFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)} style={{
              padding: "7px 14px", borderRadius: 10, border: "1px solid #1e293b",
              background: "#0f172a", color: "#94a3b8", fontSize: 12, cursor: "pointer",
            }}>
              <option value="all">All Types</option>
              <option value="empty_shelf">Empty Shelf</option>
              <option value="low_stock">Low Stock</option>
              <option value="overstock">Overstock</option>
              <option value="refill_needed">Refill Needed</option>
            </select>
            <button onClick={ackAll} style={{
              padding: "7px 16px", borderRadius: 10, border: "none",
              background: "rgba(34,197,94,0.15)", color: "#22c55e", fontSize: 12, cursor: "pointer",
            }}>✓ Ack All</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 120px 100px 100px 120px 90px",
            gap: 12, padding: "8px 14px", fontSize: 11, color: "#475569", fontWeight: 700, textTransform: "uppercase" }}>
            <span>#</span><span>Alert</span><span>Product</span><span>Shelf</span><span>Type</span><span>Time</span><span>Action</span>
          </div>
          {filtered.map((a) => {
            const sev = SEVERITY_CONFIG[a.severity];
            return (
              <div key={a.alert_id} style={{
                display: "grid", gridTemplateColumns: "32px 1fr 120px 100px 100px 120px 90px",
                gap: 12, padding: "12px 14px", borderRadius: 10, alignItems: "center",
                background: a.acknowledged ? "rgba(15,23,42,0.3)" : sev.bg,
                border: `1px solid ${a.acknowledged ? "#1e293b" : sev.color+"33"}`,
                opacity: a.acknowledged ? 0.6 : 1, transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 18 }}>{ALERT_TYPE_ICONS[a.alert_type]}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{a.message}</div>
                  <Badge text={a.severity} color={sev.color} bg={`${sev.color}22`} />
                </div>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{a.product_name}</span>
                <span style={{ fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>{a.shelf_id}</span>
                <span style={{ fontSize: 11, color: "#64748b", textTransform: "capitalize" }}>
                  {a.alert_type.replace("_"," ")}
                </span>
                <span style={{ fontSize: 11, color: "#475569" }}>{timeAgo(a.triggered_at)}</span>
                {!a.acknowledged ? (
                  <button onClick={() => acknowledge(a.alert_id)} style={{
                    padding: "5px 12px", borderRadius: 8, border: "none",
                    background: "#22c55e22", color: "#22c55e", fontSize: 11, cursor: "pointer",
                  }}>Acknowledge</button>
                ) : (
                  <span style={{ fontSize: 11, color: "#22c55e" }}>✓ Done</span>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default AlertsPage;
