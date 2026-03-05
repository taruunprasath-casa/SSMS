interface BadgeProps {
  text: string;
  color: string;
  bg: string;
}

const Badge = ({ text, color, bg }: BadgeProps) => {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
      color: color, background: bg, textTransform: "uppercase", letterSpacing: 0.5
    }}>{text}</span>
  );
}
export default Badge;