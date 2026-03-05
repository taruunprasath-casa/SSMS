import { useCallback, useState } from "react";
import Badge from "./components/Badge";
import { SEVERITY_CONFIG } from "./utils/config";
import type { Alert, User } from "./types/types";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import AnalyticsPage from "./pages/Analytics";
import AlertsPage from "./pages/Alerts";
import ProductsPage from "./pages/Products";
import SettingsPage from "./pages/Settings";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  icon: "📊" },
  { id: "analytics", label: "Analytics",  icon: "📈" },
  { id: "alerts",    label: "Alerts",     icon: "🔔" },
  { id: "products",  label: "Products",   icon: "📦" },
  { id: "settings",  label: "Settings",   icon: "⚙️" },
];

type ToastNotification = Alert & { id: number };

 const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<string>("dashboard");
  const [alertCount, setAlertCount] = useState<number>(5);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const handleAlert = useCallback((alert: Alert) => {
    setAlertCount(c => c + 1);
    setNotifications(prev => [{...alert, id: Date.now()}, ...prev.slice(0,2)]);
    setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
  }, []);

  if (!user) return <LoginPage onLogin={setUser} />;

  const PAGE_COMPONENTS: Record<string, React.ReactNode> = {
    dashboard: <DashboardPage onAlert={handleAlert} />,
    analytics: <AnalyticsPage />,
    alerts:    <AlertsPage />,
    products:  <ProductsPage />,
    settings:  <SettingsPage />,
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
      fontFamily: "'Inter','Segoe UI', sans-serif", color: "#e2e8f0",
    }}>
      <div style={{ position: "fixed", inset: 0,
        backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{
        width: 220, flexShrink: 0, background: "rgba(15,23,42,0.95)", borderRight: "1px solid #1e293b",
        display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh",
        backdropFilter: "blur(20px)", zIndex: 10,
      }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>🏪</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9" }}>SSMS</div>
              <div style={{ fontSize: 11, color: "#475569" }}>Smart Shelf Monitoring System</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px", borderRadius: 10, border: "none", marginBottom: 4,
              background: page === item.id ? "rgba(59,130,246,0.15)" : "transparent",
              color: page === item.id ? "#60a5fa" : "#64748b",
              cursor: "pointer", fontSize: 13, fontWeight: page === item.id ? 700 : 500,
              borderLeft: page === item.id ? "3px solid #3b82f6" : "3px solid transparent",
              transition: "all 0.2s", textAlign: "left",
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "alerts" && alertCount > 0 && (
                <span style={{
                  marginLeft: "auto", minWidth: 20, height: 20, borderRadius: 10,
                  background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px",
                }}>{alertCount > 99 ? "99+" : alertCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 16px 20px", borderTop: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1d4ed8",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
              {user.name[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.name}
              </div>
              <div style={{ fontSize: 10, color: "#475569" }}>{user.role}</div>
            </div>
            <button onClick={() => setUser(null)} title="Logout" style={{
              background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 14,
            }}>⏏</button>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative", zIndex: 1 }}>
        <div style={{
          padding: "16px 28px", borderBottom: "1px solid #1e293b",
          background: "rgba(15,23,42,0.8)", backdropFilter: "blur(20px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 9,
        }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>
              {NAV_ITEMS.find(n => n.id === page)?.icon} {NAV_ITEMS.find(n => n.id === page)?.label}
            </h1>
            <p style={{ fontSize: 12, color: "#475569", margin: "3px 0 0" }}>
              Smart Self Monitoring System — Phase 2 Admin Dashboard
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6,
              padding: "6px 12px", background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)", borderRadius: 20 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
                animation: "pulse 2s infinite", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>LIVE</span>
            </div>
            <div style={{ fontSize: 12, color: "#475569" }}>
              {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
          {PAGE_COMPONENTS[page]}
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 10, zIndex: 9999 }}>
        {notifications.map(n => (
          <div key={n.id} style={{
            padding: "12px 18px", borderRadius: 12, maxWidth: 340,
            background: SEVERITY_CONFIG[n.severity]?.bg || "rgba(15,23,42,0.95)",
            border: `1px solid ${SEVERITY_CONFIG[n.severity]?.color || "#1e293b"}55`,
            backdropFilter: "blur(20px)", boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            animation: "slideIn 0.3s ease",
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{n.message}</div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
              <Badge text={n.severity} color={SEVERITY_CONFIG[n.severity]?.color} bg={`${SEVERITY_CONFIG[n.severity]?.color}22`} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track  { background: #0f172a; }
        ::-webkit-scrollbar-thumb  { background: #1e293b; border-radius: 4px; }
        input:focus, select:focus { outline: 1px solid #3b82f6; }
      `}</style>
    </div>
  );
}
export default App;