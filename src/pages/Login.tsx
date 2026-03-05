import { useState } from "react";
import type { User } from "../types/types";

interface LoginPageProps {
  onLogin: (user: User) => void;
}
function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState<string>("admin@ssms.com");
  const [password, setPassword] = useState<string>("admin123");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    if (!email || !password) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    setTimeout(() => {
      if (email === "admin@ssms.com" && password === "admin123") {
        onLogin({ name: "Taruun Prasath", email, role: "Super Admin" });
      } else {
        setError("Invalid credentials. Use admin@ssms.com / admin123");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage:
        "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{
        width: 420, padding: "40px 44px", background: "rgba(15,23,42,0.9)",
        border: "1px solid #1e293b", borderRadius: 24, backdropFilter: "blur(20px)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>🏪</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>SSMS</h1>
          <p style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>Smart Self Monitoring System</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
            <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleLogin()} style={{
              width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #1e293b",
              background: "#0f172a", color: "#e2e8f0", fontSize: 14, boxSizing: "border-box",
            }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
            <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleLogin()} style={{
              width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #1e293b",
              background: "#0f172a", color: "#e2e8f0", fontSize: 14, boxSizing: "border-box",
            }} />
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, fontSize: 12, color: "#f87171" }}>
            {error}
          </div>
        )}

        <button onClick={handleLogin} disabled={loading} style={{
          width: "100%", marginTop: 24, padding: "14px", borderRadius: 12, border: "none",
          background: loading ? "#1e293b" : "linear-gradient(135deg, #1d4ed8, #4f46e5)",
          color: loading ? "#475569" : "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "default" : "pointer"
        }}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;