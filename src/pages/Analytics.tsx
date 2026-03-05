import { useState } from "react";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { MOCK_FAST_MOVERS, MOCK_FORECAST, MOCK_HOURLY, MOCK_PRODUCTS, MOCK_RADAR, MOCK_REFILL, MOCK_SLOW_MOVERS, MOCK_TREND } from "../data/data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../components/CustomTooltip";
import { SEVERITY_CONFIG } from "../utils/config";
import Badge from "../components/Badge";

const AnalyticsPage =() =>  {
  const [selectedProduct, setSelectedProduct] = useState<string>("p1");
  const [activeTab, setActiveTab] = useState<string>("movers");
  const [heatmapData] = useState(() => 
    Array.from({ length: 35 }, (_, i) => {
      const seed = (i + 1) * 12345;
      return Math.floor(((Math.sin(seed) + 1) / 2) * 20);
    }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, background: "rgba(15,23,42,0.8)", border: "1px solid #1e293b", borderRadius: 12, padding: 4, width: "fit-content" }}>
        {["movers","trends","forecast","heatmap"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "8px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: activeTab === tab ? "#1e40af" : "transparent",
            color: activeTab === tab ? "#fff" : "#64748b",
            transition: "all 0.2s",
          }}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
      </div>

      {activeTab === "movers" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Fast Movers */}
          <Card>
            <SectionHeader title="🚀 Fast Movers" subtitle="Highest stock depletion rate (7 days)" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {MOCK_FAST_MOVERS.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                  background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", width: 20, textAlign: "center" }}>#{i+1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{p.product_name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{p.category} · {p.empty_incidents} empty incidents</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#ef4444" }}>{p.depletion_rate_pct}%</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>depletion rate</div>
                  </div>
                  <div style={{ width: 60 }}>
                    <div style={{ height: 4, background: "#1e293b", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${p.depletion_rate_pct}%`, background: "#ef4444", borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="🐌 Slow Movers" subtitle="Highest overstock rate (7 days)" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {MOCK_SLOW_MOVERS.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                  background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", width: 20, textAlign: "center" }}>#{i+1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{p.product_name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{p.category}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#6366f1" }}>{p.overstock_rate_pct}%</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>overstock rate</div>
                  </div>
                  <div style={{ width: 60 }}>
                    <div style={{ height: 4, background: "#1e293b", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${p.overstock_rate_pct}%`, background: "#6366f1", borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", marginBottom: 8 }}>💡 AI Suggestions</div>
              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
                • Consider running a <strong style={{color:"#e2e8f0"}}>promotion on Organic Quinoa</strong> — 91% overstock rate this week.<br/>
                • <strong style={{color:"#e2e8f0"}}>Reduce Almond Milk reorder quantity</strong> by 40% — persistently overstocked.<br/>
                • Conduct a <strong style={{color:"#e2e8f0"}}>shelf-space reallocation</strong>: shift space from Grains to Beverages.
              </div>
            </div>
          </Card>
          <Card style={{ gridColumn: "1 / -1" }}>
            <SectionHeader title="Top 8 Products by Depletion Events" subtitle="Low stock + empty detections combined" />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={MOCK_FAST_MOVERS} layout="vertical" margin={{ left: 130 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#475569" }} />
                <YAxis dataKey="product_name" type="category" tick={{ fontSize: 11, fill: "#94a3b8" }} width={130} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="depletion_rate_pct" name="Depletion %" radius={[0,6,6,0]}>
                  {MOCK_FAST_MOVERS.map((_, i) => (
                    <Cell key={i} fill={`hsl(${10 + i*12}, 85%, ${60-i*3}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === "trends" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <SectionHeader title="Stock Trend by Product" subtitle="Select a product to view its 14-day classification trend" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {MOCK_PRODUCTS.slice(0,6).map(p => (
                <button key={p.product_id} onClick={() => setSelectedProduct(p.product_id)} style={{
                  padding: "6px 14px", borderRadius: 20, border: `1px solid ${selectedProduct===p.product_id?"#3b82f6":"#1e293b"}`,
                  background: selectedProduct===p.product_id ? "rgba(59,130,246,0.2)" : "transparent",
                  color: selectedProduct===p.product_id ? "#60a5fa" : "#64748b",
                  fontSize: 12, cursor: "pointer", transition: "all 0.2s",
                }}>{p.name}</button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={MOCK_TREND}>
                <defs>
                  {[["proper","#22c55e"],["low","#f59e0b"],["empty","#ef4444"],["overstock","#6366f1"]].map(([k,c]) => (
                    <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="10%" stopColor={c} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={c} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#475569" }} />
                <YAxis tick={{ fontSize: 10, fill: "#475569" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                {[["proper","#22c55e","Proper"],["low","#f59e0b","Low Stock"],["empty","#ef4444","Empty"],["overstock","#6366f1","Overstock"]].map(([k,c,n]) => (
                  <Area key={k} type="monotone" dataKey={k} stroke={c} fill={`url(#g-${k})`} name={n} strokeWidth={2} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Card>
              <SectionHeader title="Detection Volume by Hour" subtitle="Average across last 7 days" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MOCK_HOURLY.filter((_,i)=>i%2===0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                  <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "#475569" }} />
                  <YAxis tick={{ fontSize: 9, fill: "#475569" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="detections" name="Detections" fill="#3b82f6" radius={[4,4,0,0]} />
                  <Bar dataKey="empty"      name="Empty"      fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionHeader title="Category Health Overview" />
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={MOCK_RADAR}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 10 }} />
                  <PolarRadiusAxis tick={{ fill: "#475569", fontSize: 8 }} />
                  <Radar name="Proper"    dataKey="proper"    stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} />
                  <Radar name="Overstock" dataKey="overstock" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "forecast" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <SectionHeader title="7-Day Demand Forecast" subtitle="Moving average model with confidence bands" />
            <div style={{ padding: "12px 16px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 10, marginBottom: 20, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
              📊 Model: <strong style={{color:"#60a5fa"}}>7-day moving average</strong> with ±1.5σ confidence bands.
              For production, upgrade to <strong style={{color:"#60a5fa"}}>Facebook Prophet</strong> or <strong style={{color:"#60a5fa"}}>LSTM</strong> for seasonality-aware forecasting.
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={MOCK_FORECAST}>
                <defs>
                  <linearGradient id="gUp"  x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#475569" }} />
                <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                <Area type="monotone" dataKey="upper"    stroke="#6366f1" fill="url(#gLow)" name="Upper Bound" strokeDasharray="5 5" strokeWidth={1} />
                <Area type="monotone" dataKey="forecast" stroke="#3b82f6" fill="url(#gUp)"  name="Forecast"    strokeWidth={3} />
                <Area type="monotone" dataKey="lower"    stroke="#6366f1" fill="transparent" name="Lower Bound" strokeDasharray="5 5" strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <SectionHeader title="🔄 Refill Recommendations" subtitle="Ranked by urgency — generated by prediction engine" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {MOCK_REFILL.map((r) => {
                const sev = SEVERITY_CONFIG[r.risk_level] || SEVERITY_CONFIG.low;
                return (
                  <div key={r.product_id} style={{
                    padding: "14px 16px", borderRadius: 12,
                    background: sev.bg, border: `1px solid ${sev.color}33`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <Badge text={r.risk_level} color={sev.color} bg={`${sev.color}22`} />
                      <span style={{ fontSize: 11, color: "#475569" }}>{r.shelf_id}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{r.product_name}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>
                      {r.hours_to_stockout === 0 ? "⚡ ALREADY EMPTY" : `Stockout in ~${r.hours_to_stockout}h`}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: sev.color }}>{r.reorder_quantity}</div>
                        <div style={{ fontSize: 10, color: "#475569" }}>units to reorder</div>
                      </div>
                      <button style={{
                        padding: "6px 14px", borderRadius: 8, border: "none",
                        background: sev.color, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
                      }}>Order Now</button>
                    </div>
                    <div style={{ marginTop: 10, height: 4, background: "#1e293b", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${r.depletion_rate}%`, background: sev.color, borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: 10, color: "#475569", marginTop: 3 }}>Depletion rate: {r.depletion_rate}%</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "heatmap" && (
        <Card>
          <SectionHeader title="Empty Shelf Incident Calendar" subtitle="Daily empty/low stock incidents across all shelves" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#475569", paddingBottom: 6 }}>{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const val = heatmapData[i];
              const intensity = val / 20;
              const color = intensity > 0.7 ? "#ef4444" : intensity > 0.4 ? "#f59e0b" : intensity > 0.1 ? "#22c55e" : "#1e293b";
              return (
                <div key={i} title={`${val} incidents`} style={{
                  height: 40, borderRadius: 8, background: color,
                  opacity: intensity > 0.1 ? 0.3 + intensity * 0.7 : 0.2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "#fff", fontWeight: 600, cursor: "pointer",
                  transition: "opacity 0.2s",
                }}>{val > 0 ? val : ""}</div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 12, color: "#64748b", justifyContent: "flex-end" }}>
            <span>Low ← Severity → High:</span>
            {[["No incidents","#1e293b"],["Low (1-3)","#22c55e"],["Medium (4-10)","#f59e0b"],["High (11+)","#ef4444"]].map(([l,c]) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: c, opacity: 0.7, display: "inline-block" }} />{l}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default AnalyticsPage;