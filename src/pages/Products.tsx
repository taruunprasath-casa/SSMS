import { useState } from "react";
import Badge from "../components/Badge";
import Card from "../components/Card";
import { STATUS_CONFIG } from "../utils/config";
import { MOCK_PRODUCTS } from "../data/data";

const ProductsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = MOCK_PRODUCTS.filter(p => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <input value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search products..." style={{
              flex: 1, minWidth: 200, padding: "9px 14px", borderRadius: 10,
              border: "1px solid #1e293b", background: "#0f172a", color: "#e2e8f0", fontSize: 13,
            }} />
          {["all","proper","low","empty","overstock"].map(s => {
            const cfg = s === "all" ? { color: "#64748b", label: "All" } : STATUS_CONFIG[s];
            return (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: "7px 16px", borderRadius: 20, border: `1px solid ${statusFilter===s ? cfg.color : "#1e293b"}`,
                background: statusFilter===s ? `${cfg.color}22` : "transparent",
                color: statusFilter===s ? cfg.color : "#64748b", fontSize: 12, cursor: "pointer", textTransform: "capitalize",
              }}>{cfg.label}</button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {filtered.map(p => {
            const cfg = STATUS_CONFIG[p.status];
            return (
              <div key={p.product_id} style={{
                padding: "16px 18px", borderRadius: 12,
                background: cfg.bg, border: `1px solid ${cfg.border}`,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = ""}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: "#475569", background: "rgba(0,0,0,0.3)", padding: "3px 8px", borderRadius: 6 }}>
                    {p.shelf}
                  </span>
                  <Badge text={cfg.label} color={cfg.color} bg={`${cfg.color}22`} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>{p.category}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ color: "#94a3b8" }}>Confidence: <strong style={{color: cfg.color}}>{p.confidence}%</strong></span>
                  <span style={{ color: "#475569" }}>{p.last_seen}</span>
                </div>
                <div style={{ marginTop: 8, height: 3, background: "#1e293b", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${p.confidence}%`, background: cfg.color, borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default ProductsPage;
