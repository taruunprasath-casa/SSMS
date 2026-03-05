interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card = ({ children, style = {} }: CardProps) => {
  return (
    <div style={{
      background: "rgba(15,23,42,0.7)",
      border: "1px solid #1e293b",
      borderRadius: 16,
      padding: 24,
      backdropFilter: "blur(10px)",
      ...style
    }}>
      {children}
    </div>
  );
}

export default Card;