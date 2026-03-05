
interface CustomTooltipProps {
    active?: boolean;
    payload?: unknown[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: "10px 14px" }}>
            <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>{label}</p>
            {payload.map((p: unknown, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#e2e8f0", marginBottom: 2 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: (p as { color: string }).color, flexShrink: 0 }} />
                    <span style={{ color: "#94a3b8" }}>{(p as { name: string }).name}:</span>
                    <span style={{ fontWeight: 600 }}>{(p as { value: string }).value}</span>
                </div>
            ))}
        </div>
    );
}

export default CustomTooltip