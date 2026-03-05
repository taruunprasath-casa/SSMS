import type { Alert, Product } from "../types/types";

export const MOCK_KPI = {
  total_products: 142,
  empty_count: 7,
  low_count: 23,
  overstock_count: 12,
  proper_count: 100,
  alert_count: 18,
  proper_pct: 70.4,
  avg_confidence: 94.2,
};

export const MOCK_CLASSIFICATION = [
  { name: "Proper Stock", value: 100, color: "#22c55e" },
  { name: "Low Stock",    value: 23,  color: "#f59e0b" },
  { name: "Empty",        value: 7,   color: "#ef4444" },
  { name: "Overstock",    value: 12,  color: "#6366f1" },
];

export const MOCK_TREND = (() => {
  const data = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    data.push({
      day: label,
      proper: Math.floor(80 + Math.random() * 30),
      low:    Math.floor(10 + Math.random() * 20),
      empty:  Math.floor(2  + Math.random() * 10),
      overstock: Math.floor(5 + Math.random() * 12),
    });
  }
  return data;
})();

export const MOCK_FAST_MOVERS = [
  { product_name: "Coca-Cola 500ml",    category: "Beverages",  depletion_rate_pct: 87.3, empty_incidents: 12 },
  { product_name: "Lay's Chips 150g",   category: "Snacks",     depletion_rate_pct: 81.5, empty_incidents: 9  },
  { product_name: "Minute Maid 1L",     category: "Beverages",  depletion_rate_pct: 76.2, empty_incidents: 8  },
  { product_name: "Bread Loaf 500g",    category: "Bakery",     depletion_rate_pct: 72.1, empty_incidents: 7  },
  { product_name: "Nestle Water 1L",    category: "Beverages",  depletion_rate_pct: 69.8, empty_incidents: 6  },
  { product_name: "Oreo Cookies 200g",  category: "Snacks",     depletion_rate_pct: 65.4, empty_incidents: 5  },
  { product_name: "Tropicana OJ 1L",    category: "Beverages",  depletion_rate_pct: 61.2, empty_incidents: 4  },
  { product_name: "Greek Yogurt 500g",  category: "Dairy",      depletion_rate_pct: 57.9, empty_incidents: 4  },
];

export const MOCK_SLOW_MOVERS = [
  { product_name: "Organic Quinoa 1kg",  category: "Grains",    overstock_rate_pct: 91.2 },
  { product_name: "Almond Milk 1L",      category: "Dairy Alt", overstock_rate_pct: 83.5 },
  { product_name: "Chia Seeds 500g",     category: "Health",    overstock_rate_pct: 78.3 },
  { product_name: "Tahini Paste 400g",   category: "Condiments",overstock_rate_pct: 72.1 },
  { product_name: "Buckwheat 800g",      category: "Grains",    overstock_rate_pct: 68.4 },
];

export const MOCK_ALERTS: Alert[] = [
  { alert_id:"a1", alert_type:"empty_shelf",   severity:"critical", product_name:"Coca-Cola 500ml",   shelf_id:"S-A01", message:"Shelf S-A01 is EMPTY for Coca-Cola 500ml",              triggered_at:"2025-01-15T14:32:00Z", acknowledged:false },
  { alert_id:"a2", alert_type:"low_stock",     severity:"high",     product_name:"Lay's Chips 150g",  shelf_id:"S-B03", message:"Low stock detected for Lay's Chips on shelf S-B03",      triggered_at:"2025-01-15T14:28:00Z", acknowledged:false },
  { alert_id:"a3", alert_type:"refill_needed", severity:"critical", product_name:"Bread Loaf 500g",   shelf_id:"S-C02", message:"URGENT: Bread Loaf has been empty for 22 minutes",       triggered_at:"2025-01-15T14:10:00Z", acknowledged:false },
  { alert_id:"a4", alert_type:"overstock",     severity:"medium",   product_name:"Organic Quinoa 1kg",shelf_id:"S-D05", message:"Overstock detected: Quinoa has been overstocked 4h+",   triggered_at:"2025-01-15T13:55:00Z", acknowledged:true  },
  { alert_id:"a5", alert_type:"low_stock",     severity:"high",     product_name:"Minute Maid 1L",    shelf_id:"S-A04", message:"Low stock: Minute Maid 1L on shelf S-A04",               triggered_at:"2025-01-15T13:40:00Z", acknowledged:false },
  { alert_id:"a6", alert_type:"empty_shelf",   severity:"critical", product_name:"Nestle Water 1L",   shelf_id:"S-E01", message:"EMPTY: Nestle Water 1L — shelf S-E01 needs refill",      triggered_at:"2025-01-15T13:22:00Z", acknowledged:true  },
  { alert_id:"a7", alert_type:"low_stock",     severity:"high",     product_name:"Greek Yogurt 500g", shelf_id:"S-F02", message:"Low stock: Greek Yogurt 500g on shelf S-F02",            triggered_at:"2025-01-15T12:58:00Z", acknowledged:false },
  { alert_id:"a8", alert_type:"overstock",     severity:"medium",   product_name:"Almond Milk 1L",    shelf_id:"S-D07", message:"Overstock: Almond Milk 1L has been overstocked for 5h+", triggered_at:"2025-01-15T12:30:00Z", acknowledged:false },
];

export const MOCK_REFILL = [
  { product_id:"p1", product_name:"Coca-Cola 500ml",   shelf_id:"S-A01", risk_level:"critical", hours_to_stockout:0,   reorder_quantity:48, depletion_rate: 87 },
  { product_id:"p2", product_name:"Bread Loaf 500g",   shelf_id:"S-C02", risk_level:"critical", hours_to_stockout:0,   reorder_quantity:24, depletion_rate: 72 },
  { product_id:"p3", product_name:"Nestle Water 1L",   shelf_id:"S-E01", risk_level:"high",     hours_to_stockout:1.5, reorder_quantity:36, depletion_rate: 69 },
  { product_id:"p4", product_name:"Lay's Chips 150g",  shelf_id:"S-B03", risk_level:"high",     hours_to_stockout:2.8, reorder_quantity:30, depletion_rate: 81 },
  { product_id:"p5", product_name:"Minute Maid 1L",    shelf_id:"S-A04", risk_level:"medium",   hours_to_stockout:5.2, reorder_quantity:18, depletion_rate: 61 },
  { product_id:"p6", product_name:"Greek Yogurt 500g", shelf_id:"S-F02", risk_level:"medium",   hours_to_stockout:8.7, reorder_quantity:20, depletion_rate: 57 },
];

export const MOCK_FORECAST = (() => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    const base = 18 + Math.sin(i * 0.8) * 6;
    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      forecast: Math.round(base),
      upper: Math.round(base + 5 + Math.random() * 3),
      lower: Math.round(Math.max(0, base - 5 - Math.random() * 3)),
    });
  }
  return data;
})();

export const MOCK_HOURLY = (() => {
  const data = [];
  for (let h = 0; h < 24; h++) {
    data.push({
      hour: `${h.toString().padStart(2,"0")}:00`,
      detections: Math.floor(10 + Math.sin(h / 3) * 15 + Math.random() * 20),
      alerts:     Math.floor(Math.random() * 5),
      empty:      Math.floor(Math.random() * 3),
    });
  }
  return data;
})();

export const MOCK_RADAR = [
  { subject: "Beverages", proper: 88, low: 45, overstock: 20 },
  { subject: "Snacks",    proper: 72, low: 60, overstock: 15 },
  { subject: "Dairy",     proper: 65, low: 50, overstock: 30 },
  { subject: "Bakery",    proper: 55, low: 70, overstock: 10 },
  { subject: "Grains",    proper: 40, low: 25, overstock: 80 },
  { subject: "Vegetables",proper: 90, low: 30, overstock: 25 },
];

export const MOCK_PRODUCTS: Product[] = [
  { product_id:"p1",  name:"Coca-Cola 500ml",      category:"Beverages",  status:"empty",    shelf:"S-A01", confidence:96.2, last_seen:"2 min ago" },
  { product_id:"p2",  name:"Pepsi 500ml",           category:"Beverages",  status:"proper",   shelf:"S-A02", confidence:94.8, last_seen:"1 min ago" },
  { product_id:"p3",  name:"Lay's Chips 150g",      category:"Snacks",     status:"low",      shelf:"S-B03", confidence:91.5, last_seen:"3 min ago" },
  { product_id:"p4",  name:"Doritos 200g",          category:"Snacks",     status:"proper",   shelf:"S-B04", confidence:93.1, last_seen:"1 min ago" },
  { product_id:"p5",  name:"Bread Loaf 500g",       category:"Bakery",     status:"empty",    shelf:"S-C02", confidence:97.3, last_seen:"5 min ago" },
  { product_id:"p6",  name:"Croissant x6",          category:"Bakery",     status:"low",      shelf:"S-C03", confidence:88.7, last_seen:"4 min ago" },
  { product_id:"p7",  name:"Organic Quinoa 1kg",    category:"Grains",     status:"overstock",shelf:"S-D05", confidence:92.4, last_seen:"2 min ago" },
  { product_id:"p8",  name:"Greek Yogurt 500g",     category:"Dairy",      status:"low",      shelf:"S-F02", confidence:89.6, last_seen:"6 min ago" },
  { product_id:"p9",  name:"Nestle Water 1L",       category:"Beverages",  status:"empty",    shelf:"S-E01", confidence:98.1, last_seen:"1 min ago" },
  { product_id:"p10", name:"Minute Maid OJ 1L",     category:"Beverages",  status:"low",      shelf:"S-A04", confidence:90.3, last_seen:"3 min ago" },
  { product_id:"p11", name:"Almond Milk 1L",        category:"Dairy Alt",  status:"overstock",shelf:"S-D07", confidence:87.9, last_seen:"7 min ago" },
  { product_id:"p12", name:"Oreo Cookies 200g",     category:"Snacks",     status:"proper",   shelf:"S-B06", confidence:95.7, last_seen:"2 min ago" },
];

