import { useEffect, useRef, useState } from "react";
import type { Alert } from "../types/types";
import KPICard from "../components/KPICard";
import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import CustomTooltip from "../components/CustomTooltip";
import { MOCK_ALERTS, MOCK_CLASSIFICATION, MOCK_HOURLY, MOCK_KPI, MOCK_RADAR, MOCK_TREND } from "../data/data";
import { ALERT_TYPE_ICONS, SEVERITY_CONFIG, timeAgo } from "../utils/config";
import Badge from "../components/Badge";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, CartesianGrid, XAxis, YAxis, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface DashboardPageProps {
    onAlert?: (alert: Alert) => void;
}
const DashboardPage = ({ onAlert }: DashboardPageProps) => {
    const [liveAlerts, setLiveAlerts] = useState<Alert[]>(MOCK_ALERTS);
    const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const types = ["empty_shelf", "low_stock", "overstock", "refill_needed"];
        const sevs: Array<"critical" | "high" | "medium" | "low"> = ["critical", "high", "medium"];
        const names = ["Sprite 500ml", "Kit Kat 45g", "Red Bull 250ml", "Heinz Ketchup", "Pringles 150g"];
        const shelves = ["S-A01", "S-B02", "S-C04", "S-D06", "S-E03"];

        tickRef.current = setInterval(() => {
            const alert: Alert = {
                alert_id: `live-${Date.now()}`,
                alert_type: types[Math.floor(Math.random() * types.length)],
                severity: sevs[Math.floor(Math.random() * sevs.length)],
                product_name: names[Math.floor(Math.random() * names.length)],
                shelf_id: shelves[Math.floor(Math.random() * shelves.length)],
                triggered_at: new Date().toISOString(),
                acknowledged: false,
                message: "",
            };
            alert.message = `${ALERT_TYPE_ICONS[alert.alert_type] || "⚠️"} ${alert.product_name} on shelf ${alert.shelf_id}`;
            setLiveAlerts(prev => [alert, ...prev.slice(0, 4)]);
            if (onAlert) { onAlert(alert); }
        }, 8000);
        return () => {
            if (tickRef.current) clearInterval(tickRef.current);
        };
    }, [onAlert]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
                <KPICard title="Total Products" value={MOCK_KPI.total_products} icon="📦" color="#3b82f6" trend={2.3} subtitle="Monitored shelves" />
                <KPICard title="Empty Shelves" value={MOCK_KPI.empty_count} icon="📭" color="#ef4444" trend={-14.2} subtitle="Need immediate refill" />
                <KPICard title="Low Stock" value={MOCK_KPI.low_count} icon="⚠️" color="#f59e0b" trend={8.1} subtitle="Approaching empty" />
                <KPICard title="Overstock" value={MOCK_KPI.overstock_count} icon="📈" color="#6366f1" trend={-3.5} subtitle="Excess inventory" />
                <KPICard title="Active Alerts" value={MOCK_KPI.alert_count} icon="🔔" color="#ec4899" trend={5.7} subtitle="Unacknowledged" />
                <KPICard title="Proper Stock %" value={MOCK_KPI.proper_pct} suffix="%" icon="✅" color="#22c55e" trend={1.2} subtitle="Stock health score" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
                <Card>
                    <SectionHeader title="Stock Distribution" subtitle="Last 24 hours" />
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={MOCK_CLASSIFICATION} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                                dataKey="value" paddingAngle={3}>
                                {MOCK_CLASSIFICATION.map((d, i) => (
                                    <Cell key={i} fill={d.color} stroke="transparent" />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                        {MOCK_CLASSIFICATION.map(d => (
                            <div key={d.name} style={{
                                display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
                                background: `${d.color}11`, borderRadius: 8, border: `1px solid ${d.color}22`
                            }}>
                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: d.color }}>{d.value}</div>
                                    <div style={{ fontSize: 10, color: "#64748b" }}>{d.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <SectionHeader title="Stock Classification Trend" subtitle="14-day history" />
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={MOCK_TREND}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#475569" }} interval={1} />
                            <YAxis tick={{ fontSize: 10, fill: "#475569" }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                            <Line type="monotone" dataKey="proper" stroke="#22c55e" strokeWidth={2} dot={false} name="Proper" />
                            <Line type="monotone" dataKey="low" stroke="#f59e0b" strokeWidth={2} dot={false} name="Low Stock" />
                            <Line type="monotone" dataKey="empty" stroke="#ef4444" strokeWidth={2} dot={false} name="Empty" />
                            <Line type="monotone" dataKey="overstock" stroke="#6366f1" strokeWidth={2} dot={false} name="Overstock" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Card>
                    <SectionHeader title="Hourly Detection Activity" subtitle="Today's detection pattern" />
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={MOCK_HOURLY}>
                            <defs>
                                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                            <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "#475569" }} interval={3} />
                            <YAxis tick={{ fontSize: 9, fill: "#475569" }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                            <Area type="monotone" dataKey="detections" stroke="#3b82f6" fill="url(#grad1)" name="Detections" />
                            <Area type="monotone" dataKey="alerts" stroke="#ef4444" fill="url(#grad2)" name="Alerts" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                <Card>
                    <SectionHeader title="Category Performance" subtitle="Stock health by category" />
                    <ResponsiveContainer width="100%" height={220}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_RADAR}>
                            <PolarGrid stroke="#1e293b" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 10 }} />
                            <PolarRadiusAxis tick={{ fill: "#475569", fontSize: 8 }} />
                            <Radar name="Proper" dataKey="proper" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
                            <Radar name="Low" dataKey="low" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {liveAlerts.length > 0 && (
                <Card style={{ border: "1px solid rgba(239,68,68,0.3)" }}>
                    <SectionHeader title="🔴 Live Alert Stream" subtitle="Real-time WebSocket feed" />
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {liveAlerts.map((a, i) => (
                            <div key={a.alert_id} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                                background: `${SEVERITY_CONFIG[a.severity].bg}`,
                                border: `1px solid ${SEVERITY_CONFIG[a.severity].color}33`,
                                borderRadius: 10, animation: i === 0 ? "slideIn 0.3s ease" : "",
                            }}>
                                <span style={{ fontSize: 20 }}>{ALERT_TYPE_ICONS[a.alert_type]}</span>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: 13, color: "#e2e8f0" }}>{a.message}</span>
                                </div>
                                <Badge text={a.severity} color={SEVERITY_CONFIG[a.severity].color} bg={SEVERITY_CONFIG[a.severity].bg} />
                                <span style={{ fontSize: 11, color: "#475569" }}>{timeAgo(a.triggered_at)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}

export default DashboardPage;
