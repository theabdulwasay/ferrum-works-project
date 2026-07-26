import React, { useState, useMemo } from "react";
import {
  Factory, Package, TrendingUp, Users, Settings, LogOut, Bell, Search,
  ChevronRight, Truck, Boxes, ClipboardList, BarChart3, ShieldCheck,
  AlertTriangle, CheckCircle2, Clock, Plus, Flame, Layers, Warehouse,
  UserCog, FileText, ArrowUpRight, ArrowDownRight, X, Menu, Gauge,
  Wrench, HardHat, ClipboardCheck, Mail, Phone, MapPin, Filter, ArrowLeft
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { C, heatGradient, fontImports } from "../theme";

/* ---------------------------------- MOCK DATA ---------------------------------- */
const productCatalog = [
  { id: "SKU-4471", name: "Hot Rolled Coil", grade: "IS 2062", stock: 82, unit: "tons", price: 58500 },
  { id: "SKU-2210", name: "TMT Rebar 12mm", grade: "Fe 500D", stock: 34, unit: "tons", price: 61200 },
  { id: "SKU-9834", name: "MS Angle 50x50", grade: "IS 808", stock: 61, unit: "tons", price: 55800 },
  { id: "SKU-5502", name: "Steel Plate 10mm", grade: "IS 2062", stock: 19, unit: "tons", price: 63400 },
  { id: "SKU-7729", name: "ERW Pipe 4\"", grade: "IS 1239", stock: 47, unit: "tons", price: 59700 },
  { id: "SKU-3391", name: "Wire Rod 8mm", grade: "SAE 1008", stock: 8, unit: "tons", price: 57200 },
];

const orderStatuses = ["Order Received", "Melting", "Rolling", "Quality Check", "Dispatched", "Delivered"];
const statusProgress = { "Order Received": 12, "Melting": 30, "Rolling": 52, "Quality Check": 74, "Dispatched": 90, "Delivered": 100 };

const customerOrders = [
  { id: "FW-88231", product: "Hot Rolled Coil", qty: "12 tons", status: "Rolling", eta: "Aug 2", amount: "₹7,02,000" },
  { id: "FW-88190", product: "TMT Rebar 12mm", qty: "25 tons", status: "Quality Check", eta: "Jul 29", amount: "₹15,30,000" },
  { id: "FW-88104", product: "MS Angle 50x50", qty: "6 tons", status: "Dispatched", eta: "Jul 27", amount: "₹3,34,800" },
  { id: "FW-87996", product: "Steel Plate 10mm", qty: "4 tons", status: "Delivered", eta: "Jul 18", amount: "₹2,53,600" },
];

const allOrders = [
  { id: "FW-88231", customer: "Al-Noor Constructions", product: "Hot Rolled Coil", qty: "12 tons", status: "Rolling", amount: "₹7,02,000" },
  { id: "FW-88190", customer: "Bilal Infra", product: "TMT Rebar 12mm", qty: "25 tons", status: "Quality Check", amount: "₹15,30,000" },
  { id: "FW-88104", customer: "Hassan Fabricators", product: "MS Angle 50x50", qty: "6 tons", status: "Dispatched", amount: "₹3,34,800" },
  { id: "FW-88077", customer: "Rahman Traders", product: "Wire Rod 8mm", qty: "9 tons", status: "Melting", amount: "₹5,14,800" },
  { id: "FW-88051", customer: "Zain Builders", product: "ERW Pipe 4\"", qty: "14 tons", status: "Order Received", amount: "₹8,35,800" },
  { id: "FW-87996", customer: "Al-Noor Constructions", product: "Steel Plate 10mm", qty: "4 tons", status: "Delivered", amount: "₹2,53,600" },
];

const inventoryLevels = productCatalog.map(p => ({ ...p, capacity: Math.min(100, Math.round((p.stock / 90) * 100)) }));

const productionData = [
  { month: "Feb", tons: 410 }, { month: "Mar", tons: 452 }, { month: "Apr", tons: 398 },
  { month: "May", tons: 470 }, { month: "Jun", tons: 512 }, { month: "Jul", tons: 486 },
];

const revenueData = [
  { month: "Feb", revenue: 210 }, { month: "Mar", revenue: 238 }, { month: "Apr", revenue: 221 },
  { month: "May", revenue: 264 }, { month: "Jun", revenue: 298 }, { month: "Jul", revenue: 276 },
];

const shifts = [
  { name: "Ahmed Khan", role: "Furnace Operator", shift: "Morning", status: "On duty" },
  { name: "Fatima Siddiqui", role: "Rolling Mill Lead", shift: "Morning", status: "On duty" },
  { name: "Omar Hassan", role: "QC Inspector", shift: "Evening", status: "Scheduled" },
  { name: "Aisha Rahman", role: "Dispatch Coordinator", shift: "Evening", status: "Scheduled" },
];

const platformUsers = [
  { name: "Al-Noor Constructions", email: "procurement@alnoor.in", role: "Customer", status: "Active", joined: "Jan 2024" },
  { name: "Fatima Siddiqui", email: "fatima.siddiqui@ferrum.works", role: "Manager", status: "Active", joined: "Mar 2022" },
  { name: "Bilal Infra", email: "orders@bilalinfra.com", role: "Customer", status: "Active", joined: "Jun 2023" },
  { name: "Muhammad Ibrar", email: "muhammad.ibrar@ferrum.works", role: "Admin", status: "Active", joined: "Nov 2021" },
  { name: "Rahman Traders", email: "contact@rahmantraders.in", role: "Customer", status: "Suspended", joined: "Sep 2024" },
  { name: "Omar Hassan", email: "omar.hassan@ferrum.works", role: "Manager", status: "Active", joined: "Feb 2023" },
];

const activityLog = [
  { text: "New order FW-88231 placed by Al-Noor Constructions", time: "12 min ago" },
  { text: "Inventory alert: Wire Rod 8mm below safety stock", time: "48 min ago" },
  { text: "Manager Fatima Siddiqui approved dispatch for FW-88104", time: "2 hr ago" },
  { text: "New customer account created: Zain Builders", time: "5 hr ago" },
];

const roleProfiles = {
  Customer: { name: "Bilal Ahmed", email: "bilal.ahmed@alnoor.in", initials: "BA" },
  Manager: { name: "Fatima Siddiqui", email: "fatima.siddiqui@ferrum.works", initials: "FS" },
  Admin: { name: "Muhammad Ibrar", email: "muhammad.ibrar@ferrum.works", initials: "MI" },
};

/* ---------------------------------- SHARED UI ---------------------------------- */
function StatusPill({ status }) {
  const map = {
    "Order Received": C.textMuted, "Melting": C.ember, "Rolling": C.ember,
    "Quality Check": C.warning, "Dispatched": C.steelLight, "Delivered": C.success,
    "Active": C.success, "Suspended": C.danger, "On duty": C.success, "Scheduled": C.textMuted,
  };
  const color = map[status] || C.textMuted;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px",
      borderRadius: 20, fontSize: 12, fontFamily: "Inter", fontWeight: 500,
      color, background: color + "1E", border: `1px solid ${color}44`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {status}
    </span>
  );
}

function HeatGauge({ percent, label, sub }) {
  return (
    <div>
      {(label || sub) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "Inter" }}>
          <span style={{ fontSize: 12.5, color: C.text }}>{label}</span>
          <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "JetBrains Mono" }}>{sub}</span>
        </div>
      )}
      <div style={{ height: 7, borderRadius: 999, background: C.panelAlt, border: `1px solid ${C.borderSoft}`, overflow: "hidden" }}>
        <div style={{ width: `${percent}%`, height: "100%", background: heatGradient, borderRadius: 999 }} />
      </div>
    </div>
  );
}

function Card({ children, style, noPad }) {
  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14,
      padding: noPad ? 0 : "18px 20px", ...style,
    }}>
      {children}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, delta, positive }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontFamily: "Inter", fontSize: 12.5, color: C.textMuted, margin: 0, fontWeight: 500 }}>{label}</p>
          <p style={{ fontFamily: "Oswald", fontSize: 26, color: C.text, margin: "8px 0 4px", fontWeight: 600, letterSpacing: 0.3 }}>{value}</p>
          {delta && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontFamily: "Inter", color: positive ? C.success : C.danger }}>
              {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              {delta}
            </div>
          )}
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: C.emberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={18} color={C.ember} />
        </div>
      </div>
    </Card>
  );
}

function SectionHeader({ title, sub, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
      <div>
        <h2 style={{ fontFamily: "Oswald", fontSize: 19, color: C.text, margin: 0, fontWeight: 600, letterSpacing: 0.3 }}>{title}</h2>
        {sub && <p style={{ fontFamily: "Inter", fontSize: 13, color: C.textMuted, margin: "4px 0 0" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter" }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} style={{
                textAlign: "left", padding: "0 14px 10px", fontSize: 11.5, textTransform: "uppercase",
                letterSpacing: 0.6, color: C.textFaint, fontWeight: 600, borderBottom: `1px solid ${C.border}`,
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.borderSoft}` }}>
              {r.map((cell, j) => (
                <td key={j} style={{ padding: "13px 14px", fontSize: 13.5, color: C.text }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------- LOGIN ---------------------------------- */
function LoginScreen({ onLogin, onExit }) {
  const [role, setRole] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    { key: "Customer", icon: Package, desc: "Track orders & place new ones" },
    { key: "Manager", icon: Factory, desc: "Run production & inventory" },
    { key: "Admin", icon: ShieldCheck, desc: "Govern the whole platform" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: `radial-gradient(circle at 20% -10%, #1E2831 0%, ${C.bg} 55%)`,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "Inter",
    }}>
      <style>{fontImports}</style>
      {onExit && (
        <button onClick={onExit} style={{
          position: "absolute", top: 22, left: 24, display: "flex", alignItems: "center", gap: 6,
          background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 13, fontFamily: "Inter",
        }}>
          <ArrowLeft size={15} /> Back to site
        </button>
      )}
      <div style={{ width: "100%", maxWidth: 920, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, background: C.panel }}>
        {/* hero side */}
        <div style={{
          padding: "48px 42px", background: `linear-gradient(160deg, #171C21 0%, #1B2126 60%, #201A17 130%)`,
          borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 46 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: heatGradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Flame size={18} color="#14171A" />
              </div>
              <span style={{ fontFamily: "Oswald", fontSize: 18, letterSpacing: 1, color: C.text, fontWeight: 600 }}>FERRUM WORKS</span>
            </div>
            <h1 style={{ fontFamily: "Oswald", fontSize: 40, lineHeight: 1.12, color: C.text, fontWeight: 600, margin: 0, letterSpacing: 0.2 }}>
              From furnace<br />to fabrication.
            </h1>
            <p style={{ fontSize: 14.5, color: C.textMuted, marginTop: 16, maxWidth: 320, lineHeight: 1.6 }}>
              Every ton tracked, from the melt shop to your dock. One platform for customers, plant managers, and admins.
            </p>
          </div>
          <div>
            <HeatGauge percent={74} label="Mill capacity today" sub="74%" />
            <div style={{ display: "flex", gap: 22, marginTop: 22 }}>
              <div>
                <p style={{ fontFamily: "JetBrains Mono", fontSize: 20, color: C.text, margin: 0, fontWeight: 500 }}>486t</p>
                <p style={{ fontSize: 11.5, color: C.textFaint, margin: "2px 0 0" }}>Output this month</p>
              </div>
              <div>
                <p style={{ fontFamily: "JetBrains Mono", fontSize: 20, color: C.text, margin: 0, fontWeight: 500 }}>1,204</p>
                <p style={{ fontSize: 11.5, color: C.textFaint, margin: "2px 0 0" }}>Orders fulfilled</p>
              </div>
            </div>
          </div>
        </div>

        {/* form side */}
        <div style={{ padding: "48px 42px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: C.textFaint, fontWeight: 600, margin: "0 0 8px" }}>Sign in as</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {roles.map(r => (
              <button key={r.key} onClick={() => setRole(r.key)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10,
                border: `1px solid ${role === r.key ? C.ember : C.border}`,
                background: role === r.key ? C.emberSoft : "transparent",
                cursor: "pointer", textAlign: "left",
              }}>
                <r.icon size={17} color={role === r.key ? C.ember : C.textMuted} />
                <div>
                  <p style={{ margin: 0, fontSize: 13.5, color: C.text, fontWeight: 500 }}>{r.key}</p>
                  <p style={{ margin: 0, fontSize: 11.5, color: C.textMuted }}>{r.desc}</p>
                </div>
                <ChevronRight size={15} color={C.textFaint} style={{ marginLeft: "auto" }} />
              </button>
            ))}
          </div>

          <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 5, display: "block" }}>Email</label>
          <input
            value={email} onChange={e => setEmail(e.target.value)} placeholder={`${role.toLowerCase()}@ferrum.works`}
            style={{
              width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 9, marginBottom: 14,
              background: C.panelAlt, border: `1px solid ${C.border}`, color: C.text, fontSize: 13.5, outline: "none",
            }}
          />
          <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 5, display: "block" }}>Password</label>
          <input
            value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••"
            style={{
              width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 9, marginBottom: 20,
              background: C.panelAlt, border: `1px solid ${C.border}`, color: C.text, fontSize: 13.5, outline: "none",
            }}
          />
          <button
            onClick={() => onLogin(role)}
            style={{
              width: "100%", padding: "12px", borderRadius: 9, border: "none", cursor: "pointer",
              background: heatGradient, color: "#14171A", fontWeight: 600, fontSize: 14, fontFamily: "Inter",
            }}
          >
            Sign in to {role} dashboard
          </button>
          <p style={{ fontSize: 11.5, color: C.textFaint, marginTop: 14, textAlign: "center" }}>
            Demo only — any email and password will work.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- SHELL ---------------------------------- */
function Sidebar({ role, page, setPage, onLogout, mobileOpen, setMobileOpen }) {
  const navMap = {
    Customer: [
      { key: "overview", label: "Overview", icon: Gauge },
      { key: "orders", label: "My Orders", icon: ClipboardList },
      { key: "place-order", label: "Place Order", icon: Plus },
      { key: "invoices", label: "Invoices", icon: FileText },
    ],
    Manager: [
      { key: "overview", label: "Overview", icon: Gauge },
      { key: "production", label: "Production", icon: Factory },
      { key: "inventory", label: "Inventory", icon: Warehouse },
      { key: "orders", label: "Orders Queue", icon: ClipboardList },
      { key: "staff", label: "Staff", icon: HardHat },
    ],
    Admin: [
      { key: "overview", label: "Overview", icon: Gauge },
      { key: "users", label: "Users", icon: UserCog },
      { key: "orders", label: "All Orders", icon: ClipboardList },
      { key: "analytics", label: "Analytics", icon: BarChart3 },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  };
  const items = navMap[role];

  return (
    <div style={{
      width: 226, background: C.panel, borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column", padding: "20px 14px",
      position: "fixed", top: 0, bottom: 0, left: mobileOpen ? 0 : undefined,
      zIndex: 20,
    }} className="ferrum-sidebar">
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px", marginBottom: 30 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: heatGradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Flame size={15} color="#14171A" />
        </div>
        <span style={{ fontFamily: "Oswald", fontSize: 15, letterSpacing: 0.8, color: C.text, fontWeight: 600 }}>FERRUM WORKS</span>
      </div>

      <p style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 1, color: C.textFaint, fontWeight: 600, margin: "0 0 10px 10px" }}>{role} panel</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {items.map(it => {
          const active = page === it.key;
          return (
            <button key={it.key} onClick={() => { setPage(it.key); setMobileOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 9,
              border: "none", cursor: "pointer", textAlign: "left", width: "100%",
              background: active ? C.emberSoft : "transparent",
              borderLeft: active ? `2px solid ${C.ember}` : "2px solid transparent",
            }}>
              <it.icon size={16} color={active ? C.ember : C.textMuted} />
              <span style={{ fontSize: 13.5, color: active ? C.text : C.textMuted, fontFamily: "Inter", fontWeight: active ? 500 : 400 }}>{it.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "auto" }}>
        <Card style={{ padding: 12, marginBottom: 10 }}>
          <HeatGauge percent={74} label="System load" sub="74%" />
        </Card>
        <button onClick={onLogout} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 9,
          border: `1px solid ${C.border}`, cursor: "pointer", width: "100%", background: "transparent",
        }}>
          <LogOut size={15} color={C.textMuted} />
          <span style={{ fontSize: 13, color: C.textMuted, fontFamily: "Inter" }}>Log out</span>
        </button>
      </div>
    </div>
  );
}

function Topbar({ role, setMobileOpen }) {
  const profile = roleProfiles[role] || { name: role, email: "demo@ferrum.works", initials: role.slice(0, 2).toUpperCase() };
  return (
    <div style={{
      height: 62, borderBottom: `1px solid ${C.border}`, background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => setMobileOpen(true)} className="ferrum-menu-btn" style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}>
          <Menu size={20} color={C.text} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 9, background: C.panel, border: `1px solid ${C.border}`, width: 260 }}>
          <Search size={14} color={C.textFaint} />
          <span style={{ fontSize: 13, color: C.textFaint, fontFamily: "Inter" }}>Search orders, products…</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative" }}>
          <Bell size={18} color={C.textMuted} />
          <span style={{ position: "absolute", top: -3, right: -3, width: 7, height: 7, borderRadius: 999, background: C.ember }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: heatGradient, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter", fontWeight: 600, fontSize: 12, color: "#14171A" }}>
            {profile.initials}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: C.text, fontFamily: "Inter", fontWeight: 500 }}>{profile.name}</p>
            <p style={{ margin: 0, fontSize: 11, color: C.textFaint }}>{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- CUSTOMER PAGES ---------------------------------- */
function CustomerOverview() {
  return (
    <div>
      <SectionHeader title="Welcome back, Bilal Ahmed" sub="Here's where your steel stands today." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        <MetricCard icon={ClipboardList} label="Active orders" value="4" delta="+1 this week" positive />
        <MetricCard icon={Truck} label="In transit" value="1" delta="On schedule" positive />
        <MetricCard icon={TrendingUp} label="Spend (FY)" value="₹42.8L" delta="+8.2%" positive />
        <MetricCard icon={Clock} label="Avg. lead time" value="9.4 days" delta="-1.1 days" positive />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionHeader title="Order progress" sub="Live status across the mill" />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {customerOrders.map(o => (
              <div key={o.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 12.5, color: C.text }}>{o.id}</span>
                  <StatusPill status={o.status} />
                </div>
                <HeatGauge percent={statusProgress[o.status]} sub={`ETA ${o.eta}`} label={o.product} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Reorder favorites" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {productCatalog.slice(0, 4).map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.borderSoft}` }}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, color: C.text }}>{p.name}</p>
                  <p style={{ margin: 0, fontSize: 11.5, color: C.textFaint, fontFamily: "JetBrains Mono" }}>{p.id} · {p.grade}</p>
                </div>
                <button style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.ember, borderRadius: 7, padding: "5px 9px", fontSize: 11.5, cursor: "pointer" }}>Reorder</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function CustomerOrders() {
  return (
    <div>
      <SectionHeader title="My orders" sub="All orders placed with Ferrum Works" />
      <Card noPad>
        <Table
          columns={["Order ID", "Product", "Quantity", "Status", "ETA", "Amount"]}
          rows={customerOrders.map(o => [
            <span style={{ fontFamily: "JetBrains Mono" }}>{o.id}</span>,
            o.product, o.qty, <StatusPill status={o.status} />, o.eta,
            <span style={{ fontFamily: "JetBrains Mono" }}>{o.amount}</span>,
          ])}
        />
      </Card>
    </div>
  );
}

function CustomerPlaceOrder() {
  const [qty, setQty] = useState(5);
  const [selected, setSelected] = useState(productCatalog[0].id);
  const product = productCatalog.find(p => p.id === selected);
  return (
    <div>
      <SectionHeader title="Place a new order" sub="Choose a product and quantity — our mill will confirm within 24 hours." />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        <Card>
          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, fontFamily: "Inter" }}>Select product</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {productCatalog.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{
                textAlign: "left", padding: 12, borderRadius: 10, cursor: "pointer",
                border: `1px solid ${selected === p.id ? C.ember : C.border}`,
                background: selected === p.id ? C.emberSoft : "transparent",
              }}>
                <p style={{ margin: 0, fontSize: 13, color: C.text }}>{p.name}</p>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: C.textFaint, fontFamily: "JetBrains Mono" }}>{p.grade} · ₹{p.price.toLocaleString()}/ton</p>
              </button>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Quantity (tons)</p>
          <input type="range" min="1" max="50" value={qty} onChange={e => setQty(Number(e.target.value))} style={{ width: "100%", accentColor: C.ember }} />
          <p style={{ fontFamily: "JetBrains Mono", fontSize: 13, color: C.text, marginTop: 6 }}>{qty} tons</p>
        </Card>
        <Card>
          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>Order summary</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13.5 }}>
            <span style={{ color: C.textMuted }}>Product</span><span style={{ color: C.text }}>{product.name}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13.5 }}>
            <span style={{ color: C.textMuted }}>Quantity</span><span style={{ color: C.text }}>{qty} tons</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 13.5, borderTop: `1px solid ${C.borderSoft}`, paddingTop: 12 }}>
            <span style={{ color: C.textMuted }}>Estimated total</span>
            <span style={{ color: C.ember, fontFamily: "JetBrains Mono", fontWeight: 600 }}>₹{(product.price * qty).toLocaleString()}</span>
          </div>
          <button style={{ width: "100%", padding: 12, borderRadius: 9, border: "none", background: heatGradient, color: "#14171A", fontWeight: 600, cursor: "pointer" }}>
            Submit order request
          </button>
        </Card>
      </div>
    </div>
  );
}

function CustomerInvoices() {
  return (
    <div>
      <SectionHeader title="Invoices" sub="Download or review past billing" />
      <Card noPad>
        <Table
          columns={["Invoice", "Order", "Date", "Status", "Amount", ""]}
          rows={customerOrders.map((o, i) => [
            <span style={{ fontFamily: "JetBrains Mono" }}>INV-{9000 + i}</span>,
            <span style={{ fontFamily: "JetBrains Mono" }}>{o.id}</span>,
            o.eta, <StatusPill status={o.status === "Delivered" ? "Delivered" : "Order Received"} />, o.amount,
            <span style={{ color: C.ember, fontSize: 12.5, cursor: "pointer" }}>Download</span>,
          ])}
        />
      </Card>
    </div>
  );
}

/* ---------------------------------- MANAGER PAGES ---------------------------------- */
function ManagerOverview() {
  return (
    <div>
      <SectionHeader title="Plant overview" sub="Bhilai unit · Shift: Morning" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        <MetricCard icon={Factory} label="Output today" value="18.4t" delta="+3.1% vs avg" positive />
        <MetricCard icon={Warehouse} label="Inventory value" value="₹2.1Cr" delta="-4.6%" positive={false} />
        <MetricCard icon={ClipboardList} label="Orders in queue" value="6" delta="2 urgent" positive={false} />
        <MetricCard icon={Gauge} label="Mill capacity" value="74%" delta="+2 pts" positive />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <SectionHeader title="Monthly output (tons)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={productionData}>
              <defs>
                <linearGradient id="prodFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.ember} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={C.ember} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderSoft} vertical={false} />
              <XAxis dataKey="month" stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={{ stroke: C.border }} />
              <YAxis stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.text }} />
              <Area type="monotone" dataKey="tons" stroke={C.ember} fill="url(#prodFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionHeader title="Today's shift" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {shifts.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, color: C.text }}>{s.name}</p>
                  <p style={{ margin: 0, fontSize: 11.5, color: C.textFaint }}>{s.role}</p>
                </div>
                <StatusPill status={s.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Inventory pulse" sub="Stock relative to safety capacity" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {inventoryLevels.map(p => (
            <HeatGauge key={p.id} percent={p.capacity} label={p.name} sub={`${p.stock}t`} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function ManagerProduction() {
  return (
    <div>
      <SectionHeader title="Production line" sub="Current batch status across stages" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 22 }}>
        {orderStatuses.slice(0, 5).map((s, i) => (
          <Card key={s} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 11.5, color: C.textMuted, margin: "0 0 8px" }}>{s}</p>
            <p style={{ fontFamily: "Oswald", fontSize: 22, color: C.text, margin: 0, fontWeight: 600 }}>{[3, 2, 4, 2, 1][i]}</p>
            <p style={{ fontSize: 11, color: C.textFaint, margin: "2px 0 0" }}>batches</p>
          </Card>
        ))}
      </div>
      <Card noPad>
        <div style={{ padding: "18px 20px 0" }}>
          <SectionHeader title="Active batches" />
        </div>
        <Table
          columns={["Batch", "Product", "Stage", "Progress", "Line"]}
          rows={allOrders.map((o, i) => [
            <span style={{ fontFamily: "JetBrains Mono" }}>{o.id}</span>,
            o.product,
            <StatusPill status={o.status} />,
            <div style={{ width: 140 }}><HeatGauge percent={statusProgress[o.status]} /></div>,
            `Line ${(i % 3) + 1}`,
          ])}
        />
      </Card>
    </div>
  );
}

function ManagerInventory() {
  return (
    <div>
      <SectionHeader title="Inventory" sub="Raw and finished stock across the warehouse" action={
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${C.border}`, color: C.text, padding: "8px 12px", borderRadius: 8, fontSize: 12.5, cursor: "pointer" }}>
          <Plus size={14} /> Add stock entry
        </button>
      } />
      <Card noPad>
        <Table
          columns={["SKU", "Product", "Grade", "Stock", "Capacity", "Price / ton"]}
          rows={inventoryLevels.map(p => [
            <span style={{ fontFamily: "JetBrains Mono" }}>{p.id}</span>,
            p.name, p.grade, `${p.stock} tons`,
            <div style={{ width: 150 }}><HeatGauge percent={p.capacity} /></div>,
            <span style={{ fontFamily: "JetBrains Mono" }}>₹{p.price.toLocaleString()}</span>,
          ])}
        />
      </Card>
    </div>
  );
}

function ManagerOrdersQueue() {
  return (
    <div>
      <SectionHeader title="Orders queue" sub="Orders awaiting production action" />
      <Card noPad>
        <Table
          columns={["Order", "Customer", "Product", "Qty", "Status", "Amount"]}
          rows={allOrders.map(o => [
            <span style={{ fontFamily: "JetBrains Mono" }}>{o.id}</span>,
            o.customer, o.product, o.qty, <StatusPill status={o.status} />,
            <span style={{ fontFamily: "JetBrains Mono" }}>{o.amount}</span>,
          ])}
        />
      </Card>
    </div>
  );
}

function ManagerStaff() {
  return (
    <div>
      <SectionHeader title="Staff roster" sub="Shift assignments for the plant floor" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {shifts.map((s, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: C.panelAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: C.steelLight }}>
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13.5, color: C.text }}>{s.name}</p>
                  <p style={{ margin: 0, fontSize: 11.5, color: C.textFaint }}>{s.role} · {s.shift} shift</p>
                </div>
              </div>
              <StatusPill status={s.status} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- ADMIN PAGES ---------------------------------- */
function AdminOverview() {
  const roleCounts = [
    { name: "Customers", value: platformUsers.filter(u => u.role === "Customer").length },
    { name: "Managers", value: platformUsers.filter(u => u.role === "Manager").length },
    { name: "Admins", value: platformUsers.filter(u => u.role === "Admin").length },
  ];
  const pieColors = [C.ember, C.steel, C.steelLight];
  return (
    <div>
      <SectionHeader title="Platform overview" sub="System-wide status across Ferrum Works" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        <MetricCard icon={Users} label="Total users" value={platformUsers.length} delta="+2 this month" positive />
        <MetricCard icon={ClipboardList} label="Orders (all time)" value="1,204" delta="+64" positive />
        <MetricCard icon={TrendingUp} label="Revenue (FY)" value="₹18.6Cr" delta="+11.2%" positive />
        <MetricCard icon={ShieldCheck} label="System uptime" value="99.97%" delta="Stable" positive />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <SectionHeader title="Revenue trend (₹L)" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderSoft} vertical={false} />
              <XAxis dataKey="month" stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={{ stroke: C.border }} />
              <YAxis stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.text }} />
              <Bar dataKey="revenue" fill={C.steel} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionHeader title="User mix" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={roleCounts} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {roleCounts.map((r, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 4 }}>
            {roleCounts.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: pieColors[i] }} />
                <span style={{ fontSize: 11.5, color: C.textMuted }}>{r.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Recent activity" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {activityLog.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: C.ember, marginTop: 6, flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontSize: 13, color: C.text }}>{a.text}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11.5, color: C.textFaint }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AdminUsers() {
  return (
    <div>
      <SectionHeader title="Users" sub="Everyone with access to Ferrum Works" action={
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: heatGradient, border: "none", color: "#14171A", padding: "8px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> Invite user
        </button>
      } />
      <Card noPad>
        <Table
          columns={["Name", "Email", "Role", "Status", "Joined", ""]}
          rows={platformUsers.map(u => [
            u.name,
            <span style={{ color: C.textMuted }}>{u.email}</span>,
            <span style={{ fontSize: 12, color: C.steelLight }}>{u.role}</span>,
            <StatusPill status={u.status} />,
            u.joined,
            <span style={{ color: C.ember, fontSize: 12.5, cursor: "pointer" }}>Manage</span>,
          ])}
        />
      </Card>
    </div>
  );
}

function AdminAnalytics() {
  return (
    <div>
      <SectionHeader title="Analytics" sub="Production and revenue side by side" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <SectionHeader title="Output (tons)" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderSoft} vertical={false} />
              <XAxis dataKey="month" stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={{ stroke: C.border }} />
              <YAxis stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.text }} />
              <Line type="monotone" dataKey="tons" stroke={C.ember} strokeWidth={2} dot={{ fill: C.ember, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionHeader title="Revenue (₹L)" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.steel} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={C.steel} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderSoft} vertical={false} />
              <XAxis dataKey="month" stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={{ stroke: C.border }} />
              <YAxis stroke={C.textFaint} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.text }} />
              <Area type="monotone" dataKey="revenue" stroke={C.steel} fill="url(#revFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Capacity by product" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {inventoryLevels.map(p => <HeatGauge key={p.id} percent={p.capacity} label={p.name} sub={`${p.capacity}%`} />)}
        </div>
      </Card>
    </div>
  );
}

function AdminSettings() {
  const rows = [
    { label: "Platform name", value: "Ferrum Works" },
    { label: "Primary mill location", value: "Bhilai, Chhattisgarh" },
    { label: "Default currency", value: "INR (₹)" },
    { label: "Order approval threshold", value: "₹5,00,000" },
    { label: "Notification channel", value: "Email + SMS" },
  ];
  return (
    <div>
      <SectionHeader title="Settings" sub="Platform-wide configuration" />
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < rows.length - 1 ? `1px solid ${C.borderSoft}` : "none" }}>
              <span style={{ fontSize: 13.5, color: C.textMuted }}>{r.label}</span>
              <span style={{ fontSize: 13.5, color: C.text, fontFamily: "JetBrains Mono" }}>{r.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------- DASHBOARD APP ---------------------------------- */
export default function Dashboard({ onExit }) {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogin = (role) => { setUser(role); setPage("overview"); };
  const handleLogout = () => { setUser(null); setPage("overview"); };

  const pageMap = useMemo(() => ({
    Customer: {
      overview: <CustomerOverview />, orders: <CustomerOrders />,
      "place-order": <CustomerPlaceOrder />, invoices: <CustomerInvoices />,
    },
    Manager: {
      overview: <ManagerOverview />, production: <ManagerProduction />,
      inventory: <ManagerInventory />, orders: <ManagerOrdersQueue />, staff: <ManagerStaff />,
    },
    Admin: {
      overview: <AdminOverview />, users: <AdminUsers />, orders: <ManagerOrdersQueue />,
      analytics: <AdminAnalytics />, settings: <AdminSettings />,
    },
  }), []);

  if (!user) return <LoginScreen onLogin={handleLogin} onExit={onExit} />;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Inter" }}>
      <style>{`
        ${fontImports}
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 8px; }
        @media (max-width: 860px) {
          .ferrum-sidebar { transform: translateX(-100%); transition: transform 0.2s ease; }
          .ferrum-sidebar.open { transform: translateX(0); }
          .ferrum-content { margin-left: 0 !important; }
          .ferrum-menu-btn { display: block !important; }
        }
      `}</style>
      <Sidebar role={user} page={page} setPage={setPage} onLogout={handleLogout} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="ferrum-content" style={{ marginLeft: 226 }}>
        <Topbar role={user} setMobileOpen={setMobileOpen} />
        <div style={{ padding: "26px 30px" }}>
          {pageMap[user][page]}
        </div>
      </div>
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "#00000080", zIndex: 15 }} />
      )}
    </div>
  );
}
