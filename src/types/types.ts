interface Alert {
  alert_id: string;
  alert_type: string;
  severity: "critical" | "high" | "medium" | "low";
  product_name: string;
  shelf_id: string;
  message: string;
  triggered_at: string;
  acknowledged: boolean;
  acknowledged_by?: string;
}

interface Product {
  product_id: string;
  name: string;
  category: string;
  status: "proper" | "low" | "empty" | "overstock";
  shelf: string;
  confidence: number;
  last_seen: string;
}

interface User {
  name: string;
  email: string;
  role: string;
}

interface Notification extends Alert {
  id: number;
}

export type { Alert, Product, User, Notification };