import React from "react";
import {
  Flame, Package, Factory, ShieldCheck, ArrowRight, Gauge, Warehouse,
  ClipboardList, BarChart3, Truck, CheckCircle2, Users, TrendingUp,
} from "lucide-react";
import { C, heatGradient, fontImports } from "../theme";

function HeatGauge({ percent, label, sub }) {
  return (
    <div>
      {(label || sub) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
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

const roleCards = [
  {
    icon: Package, title: "Customer", accent: C.ember,
    desc: "Place orders, watch every batch move from melt to dispatch, and download invoices without a phone call.",
    points: ["Live order progress", "One-click reorders", "Invoice history"],
  },
  {
    icon: Factory, title: "Manager", accent: C.steelLight,
    desc: "Run the floor — production stages, inventory levels, and the shift roster in a single screen.",
    points: ["Batch-by-batch tracking", "Safety-stock alerts", "Shift scheduling"],
  },
  {
    icon: ShieldCheck, title: "Admin", accent: C.success,
    desc: "Govern the whole platform — users, revenue, and system health, with full audit visibility.",
    points: ["Role & access control", "Revenue analytics", "Activity audit log"],
  },
];

const flowSteps = [
  { label: "Order received", icon: ClipboardList },
  { label: "Melting", icon: Flame },
  { label: "Rolling", icon: Gauge },
  { label: "Quality check", icon: CheckCircle2 },
  { label: "Dispatched", icon: Truck },
];

const stats = [
  { value: "486t", label: "Steel produced this month" },
  { value: "1,204", label: "Orders fulfilled" },
  { value: "99.97%", label: "Platform uptime" },
  { value: "9.4 days", label: "Average lead time" },
];

export default function LandingPage({ onEnter }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "Inter", color: C.text }}>
      <style>{`
        ${fontImports}
        * { box-sizing: border-box; }
        body { margin: 0; }
        .fw-nav-link { color: ${C.textMuted}; text-decoration: none; font-size: 13.5px; }
        .fw-nav-link:hover { color: ${C.text}; }
        .fw-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .fw-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .fw-flow { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        @media (max-width: 860px) {
          .fw-grid-3 { grid-template-columns: 1fr; }
          .fw-grid-4 { grid-template-columns: 1fr 1fr; }
          .fw-flow { flex-wrap: wrap; }
          .fw-hero-title { font-size: 34px !important; }
          .fw-nav-links { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <div style={{ borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.bg, zIndex: 30 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: heatGradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={16} color="#14171A" />
            </div>
            <span style={{ fontFamily: "Oswald", fontSize: 16, letterSpacing: 0.8, fontWeight: 600 }}>FERRUM WORKS</span>
          </div>
          <div className="fw-nav-links" style={{ display: "flex", gap: 28 }}>
            <a href="#roles" className="fw-nav-link">Platform</a>
            <a href="#flow" className="fw-nav-link">How it works</a>
            <a href="#stats" className="fw-nav-link">Results</a>
          </div>
          <button onClick={onEnter} style={{
            padding: "9px 18px", borderRadius: 8, border: "none", cursor: "pointer",
            background: heatGradient, color: "#14171A", fontWeight: 600, fontSize: 13.5,
          }}>
            Sign in
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={{
        background: `radial-gradient(circle at 15% -10%, #1E2831 0%, ${C.bg} 55%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px 64px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 20, background: C.emberSoft, border: `1px solid ${C.ember}44`, marginBottom: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: C.ember }} />
              <span style={{ fontSize: 12, color: C.ember, fontFamily: "Inter", fontWeight: 500 }}>One platform, three roles</span>
            </div>
            <h1 className="fw-hero-title" style={{ fontFamily: "Oswald", fontSize: 48, lineHeight: 1.1, margin: 0, fontWeight: 600, letterSpacing: 0.2 }}>
              From furnace to fabrication — tracked every ton of the way.
            </h1>
            <p style={{ fontSize: 15.5, color: C.textMuted, marginTop: 20, maxWidth: 460, lineHeight: 1.65 }}>
              Ferrum Works gives customers, plant managers, and admins a single, live view of steel production — from the melt shop to the delivery dock.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
              <button onClick={onEnter} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "13px 22px", borderRadius: 10, border: "none",
                cursor: "pointer", background: heatGradient, color: "#14171A", fontWeight: 600, fontSize: 14,
              }}>
                Enter dashboard <ArrowRight size={16} />
              </button>
              <a href="#roles" style={{
                display: "flex", alignItems: "center", padding: "13px 22px", borderRadius: 10,
                border: `1px solid ${C.border}`, color: C.text, fontSize: 14, textDecoration: "none",
              }}>
                See how it works
              </a>
            </div>
          </div>

          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
            <p style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: 1, color: C.textFaint, fontWeight: 600, margin: "0 0 16px" }}>
              Live mill snapshot
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <HeatGauge percent={74} label="Mill capacity" sub="74%" />
              <HeatGauge percent={52} label="Order FW-88231 · Rolling" sub="ETA Aug 2" />
              <HeatGauge percent={90} label="Order FW-88104 · Dispatched" sub="ETA Jul 27" />
              <HeatGauge percent={20} label="Wire Rod 8mm stock" sub="8 tons" />
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.borderSoft}` }}>
              <div>
                <p style={{ fontFamily: "JetBrains Mono", fontSize: 19, margin: 0, fontWeight: 500 }}>486t</p>
                <p style={{ fontSize: 11, color: C.textFaint, margin: "2px 0 0" }}>Output / month</p>
              </div>
              <div>
                <p style={{ fontFamily: "JetBrains Mono", fontSize: 19, margin: 0, fontWeight: 500 }}>6</p>
                <p style={{ fontSize: 11, color: C.textFaint, margin: "2px 0 0" }}>Orders in queue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div id="stats" style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div className="fw-grid-4">
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Oswald", fontSize: 30, margin: 0, fontWeight: 600, color: C.ember }}>{s.value}</p>
              <p style={{ fontSize: 12.5, color: C.textMuted, marginTop: 6 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROLES */}
      <div id="roles" style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Oswald", fontSize: 30, margin: 0, fontWeight: 600 }}>Built for everyone on the floor</h2>
          <p style={{ fontSize: 14.5, color: C.textMuted, marginTop: 10, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            One login, three purpose-built dashboards — each showing exactly what that role needs to move fast.
          </p>
        </div>
        <div className="fw-grid-3">
          {roleCards.map((r, i) => (
            <div key={i} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: r.accent + "22", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <r.icon size={19} color={r.accent} />
              </div>
              <h3 style={{ fontFamily: "Oswald", fontSize: 18, margin: "0 0 8px", fontWeight: 600 }}>{r.title}</h3>
              <p style={{ fontSize: 13.5, color: C.textMuted, lineHeight: 1.6, margin: "0 0 16px" }}>{r.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {r.points.map((pt, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={14} color={r.accent} />
                    <span style={{ fontSize: 12.5, color: C.text }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOW */}
      <div id="flow" style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Oswald", fontSize: 30, margin: 0, fontWeight: 600 }}>Every batch, tracked stage by stage</h2>
          <p style={{ fontSize: 14.5, color: C.textMuted, marginTop: 10 }}>The same heat-gauge you see below powers every progress bar in the platform.</p>
        </div>
        <div className="fw-flow">
          {flowSteps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, minWidth: 96 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: C.panel, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={20} color={i <= 2 ? C.ember : C.textMuted} />
                </div>
                <span style={{ fontSize: 12, color: C.textMuted, textAlign: "center" }}>{s.label}</span>
              </div>
              {i < flowSteps.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < 2 ? heatGradient : C.border, minWidth: 20 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{
          background: `linear-gradient(160deg, #1B2126 0%, #201A17 130%)`, border: `1px solid ${C.border}`,
          borderRadius: 18, padding: "48px 40px", textAlign: "center",
        }}>
          <h2 style={{ fontFamily: "Oswald", fontSize: 28, margin: 0, fontWeight: 600 }}>See it running in under a minute</h2>
          <p style={{ fontSize: 14, color: C.textMuted, marginTop: 10 }}>No sign-up required — this is a live demo with sample data.</p>
          <button onClick={onEnter} style={{
            marginTop: 22, display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 10,
            border: "none", cursor: "pointer", background: heatGradient, color: "#14171A", fontWeight: 600, fontSize: 14,
          }}>
            Enter dashboard <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: heatGradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={12} color="#14171A" />
            </div>
            <span style={{ fontSize: 12.5, color: C.textMuted }}>Ferrum Works — demo frontend, no data is real</span>
          </div>
          <span style={{ fontSize: 12, color: C.textFaint }}>Built with React &amp; Vite</span>
        </div>
      </div>
    </div>
  );
}
