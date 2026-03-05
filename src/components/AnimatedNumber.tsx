import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}
const AnimatedNumber = ({ value, suffix = "" }: AnimatedNumberProps) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Number(value);
    const duration = 800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{!Number.isInteger(value) ? value.toFixed(1) : display}{suffix}</span>;
}

export default AnimatedNumber