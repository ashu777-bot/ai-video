import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --blue: #6366f1; --violet: #8b5cf6; --rose: #E11D48; --amber: #D97706; --green: #059669;
  --ff: 'DM Sans', sans-serif; --ff2: 'Syne', sans-serif;
}
[data-theme="dark"] {
  --bg: linear-gradient(135deg, #050510 0%, #0b0924 50%, #1e113a 100%);
  --surface: rgba(10,10,20,0.45); --surface-hover: rgba(15,15,30,0.7);
  --border: rgba(99,102,241,0.15); --border-strong: rgba(168,85,247,0.25);
  --text: #ffffff; --text-body: #cbd5e1; --text-muted: #a5b4fc;
  --input-bg: rgba(5,5,12,0.7); --card-bg: rgba(255,255,255,0.02);
  --tag-bg: linear-gradient(135deg,rgba(99,102,241,0.15),rgba(236,72,153,0.15));
  --tag-color: #c7d2fe; --tag-border: rgba(99,102,241,0.3);
  --nav-bg: rgba(5,5,16,0.6);
  --badge-bg: linear-gradient(135deg,rgba(99,102,241,0.2),rgba(236,72,153,0.15));
  --badge-border: rgba(99,102,241,0.4); --grid-line: rgba(99,102,241,0.04);
  --glow1: rgba(99,102,241,0.25); --glow2: rgba(236,72,153,0.2);
  --pill-bg: rgba(255,255,255,0.04); --pill-border: rgba(99,102,241,0.2); --pill-text: #a5b4fc;
  --input-border: rgba(99,102,241,0.25); --input-text: #ffffff; --placeholder: #475569;
  --drop-border: #a855f7; --drop-bg: linear-gradient(135deg,rgba(5,5,15,0.5),rgba(30,17,58,0.3));
  --tabs-bg: rgba(0,0,0,0.4); --tab-inactive: #94a3b8;
  --exp-bg: linear-gradient(135deg,rgba(255,255,255,0.03),rgba(99,102,241,0.05));
  --exp-border: rgba(139,92,246,0.25);
  --hero-border: rgba(99,102,241,0.25); --sline: rgba(139,92,246,0.3);
  --danger-bg: rgba(225,29,72,0.07); --danger-border: rgba(225,29,72,0.22);
  --success-bg: rgba(5,150,105,0.1); --success-border: rgba(5,150,105,0.3);
  --m-card-bg: rgba(255,255,255,0.03); --m-card-border: rgba(99,102,241,0.18);
  --m-card-border-hover: rgba(99,102,241,0.4); --m-divider: rgba(99,102,241,0.18);
  --m-eyebrow-bg: rgba(99,102,241,0.12); --m-eyebrow-border: rgba(99,102,241,0.22);
  --m-step-tag-bg: rgba(99,102,241,0.12); --m-step-tag-color: #a5b4fc;
  --m-pill-blue-bg: rgba(99,102,241,0.12); --m-pill-blue-color: #a5b4fc;
  --m-pill-violet-bg: rgba(139,92,246,0.12); --m-pill-violet-color: #c4b5fd;
  --m-pill-pink-bg: rgba(236,72,153,0.12); --m-pill-pink-color: #f9a8d4;
  --m-illus-card-bg: rgba(255,255,255,0.03);
  --m-stat-val-from: #a5b4fc; --m-stat-val-to: #f9a8d4;
  --heat-empty: rgba(16,185,129,0.08);
  --streak-bg: rgba(5,150,105,0.12); --streak-border: rgba(5,150,105,0.3);
  --chat-user-bg: linear-gradient(135deg,#6366f1,#8b5cf6);
  --chat-ai-bg: rgba(255,255,255,0.03); --chat-ai-border: rgba(99,102,241,0.2);
  --perf-card-bg: rgba(255,255,255,0.03); --perf-card-border: rgba(99,102,241,0.18);
}
[data-theme="light"] {
  --bg: linear-gradient(135deg,#f5f3ff 0%,#fdf2f8 40%,#e0e7ff 100%);
  --surface: rgba(255,255,255,0.45); --surface-hover: rgba(255,255,255,0.75);
  --border: rgba(99,102,241,0.12); --border-strong: rgba(99,102,241,0.2);
  --text: #0f172a; --text-body: #1e1b4b; --text-muted: #4f46e5;
  --input-bg: rgba(255,255,255,0.85); --card-bg: rgba(255,255,255,0.6);
  --tag-bg: linear-gradient(135deg,rgba(99,102,241,0.08),rgba(236,72,153,0.08));
  --tag-color: #4f46e5; --tag-border: rgba(99,102,241,0.15);
  --nav-bg: rgba(245,243,255,0.6);
  --badge-bg: linear-gradient(135deg,rgba(99,102,241,0.12),rgba(236,72,153,0.12));
  --badge-border: rgba(99,102,241,0.25); --grid-line: rgba(99,102,241,0.05);
  --glow1: rgba(99,102,241,0.35); --glow2: rgba(236,72,153,0.3);
  --pill-bg: rgba(255,255,255,0.8); --pill-border: rgba(99,102,241,0.15); --pill-text: #4f46e5;
  --input-border: rgba(99,102,241,0.2); --input-text: #0f172a; --placeholder: #94a3b8;
  --drop-border: #8b5cf6;
  --tabs-bg: rgba(99,102,241,0.08); --tab-inactive: #4f46e5;
  --exp-bg: linear-gradient(135deg,rgba(255,255,255,0.7),rgba(245,243,255,0.7));
  --exp-border: rgba(99,102,241,0.2);
  --hero-border: rgba(99,102,241,0.15); --sline: rgba(99,102,241,0.2);
  --danger-bg: rgba(225,29,72,0.06); --danger-border: rgba(225,29,72,0.2);
  --success-bg: rgba(5,150,105,0.08); --success-border: rgba(5,150,105,0.25);
  --m-card-bg: rgba(255,255,255,0.7); --m-card-border: rgba(99,102,241,0.14);
  --m-card-border-hover: rgba(99,102,241,0.35); --m-divider: rgba(99,102,241,0.15);
  --m-eyebrow-bg: rgba(99,102,241,0.08); --m-eyebrow-border: rgba(99,102,241,0.18);
  --m-step-tag-bg: rgba(99,102,241,0.08); --m-step-tag-color: #4f46e5;
  --m-pill-blue-bg: rgba(99,102,241,0.08); --m-pill-blue-color: #4338ca;
  --m-pill-violet-bg: rgba(139,92,246,0.08); --m-pill-violet-color: #6d28d9;
  --m-pill-pink-bg: rgba(236,72,153,0.08); --m-pill-pink-color: #be185d;
  --m-illus-card-bg: rgba(255,255,255,0.5);
  --m-stat-val-from: #6366f1; --m-stat-val-to: #ec4899;
  --heat-empty: rgba(16,185,129,0.08);
  --streak-bg: rgba(5,150,105,0.08); --streak-border: rgba(5,150,105,0.25);
  --chat-user-bg: linear-gradient(135deg,#6366f1,#8b5cf6);
  --chat-ai-bg: rgba(255,255,255,0.7); --chat-ai-border: rgba(99,102,241,0.15);
  --perf-card-bg: rgba(255,255,255,0.7); --perf-card-border: rgba(99,102,241,0.14);
}
html,body,#root { height:100%; width:100%; font-family:var(--ff); background:var(--bg); color:var(--text-body); -webkit-font-smoothing:antialiased; overflow-x:hidden; transition:background 0.45s ease,color 0.3s ease; }
.bg-grid { position:fixed; inset:0; z-index:0; pointer-events:none; background-image:linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px); background-size:60px 60px; }
.bg-glow,.bg-glow2 { position:fixed; border-radius:50%; z-index:0; pointer-events:none; filter:blur(60px); }
.bg-glow { width:700px; height:700px; background:radial-gradient(circle,var(--glow1) 0%,transparent 70%); top:-10%; right:-10%; }
.bg-glow2 { width:500px; height:500px; background:radial-gradient(circle,var(--glow2) 0%,transparent 70%); bottom:-10%; left:-10%; }
.app-wrap { position:relative; z-index:1; min-height:100vh; display:flex; flex-direction:column; }
.nav { display:flex; align-items:center; justify-content:space-between; padding:14px 28px; border-bottom:1px solid var(--border); position:sticky; top:0; z-index:100; background:var(--nav-bg); backdrop-filter:blur(30px); }
.nav-brand { font-family:var(--ff2); font-size:20px; font-weight:800; color:var(--text); letter-spacing:-0.5px; cursor:pointer; }
.nav-brand em { font-style:normal; color:var(--blue); }
.nav-right { display:flex; align-items:center; gap:10px; }
.nav-link { padding:6px 12px; border-radius:8px; border:1px solid var(--border); background:transparent; font-family:var(--ff); font-size:12px; font-weight:500; color:var(--text-muted); cursor:pointer; }
.nav-link:hover { border-color:var(--blue); color:var(--text); }
.nav-link.active { background:rgba(99,102,241,0.15); border-color:rgba(99,102,241,0.4); color:#a5b4fc; }
.avatar-circle { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#fff; cursor:pointer; }
.powered-badge { display:flex; align-items:center; gap:6px; padding:4px 10px; border-radius:20px; border:1px solid var(--badge-border); background:var(--badge-bg); font-size:10px; font-weight:500; color:var(--blue); }
.powered-dot { width:6px; height:6px; border-radius:50%; background:var(--blue); animation:pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
.theme-toggle-btn { width:36px; height:36px; border-radius:10px; border:1px solid var(--border); background:var(--surface); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; }

/* AUTH */
.auth-page { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 20px; }
.auth-card { width:100%; max-width:420px; background:var(--surface); border:1px solid var(--border-strong); border-radius:22px; padding:36px 32px; backdrop-filter:blur(30px); box-shadow:0 24px 60px rgba(0,0,0,0.3); }
.auth-logo { text-align:center; margin-bottom:24px; }
.auth-logo-text { font-family:var(--ff2); font-size:28px; font-weight:800; color:var(--text); }
.auth-logo-text em { font-style:normal; color:var(--blue); }
.auth-tagline { font-size:13px; color:var(--text-muted); margin-top:4px; }
.auth-tabs { display:flex; gap:4px; background:rgba(0,0,0,0.4); border-radius:10px; padding:4px; margin-bottom:24px; }
.auth-tab { flex:1; padding:8px; border-radius:7px; border:none; background:transparent; font-family:var(--ff); font-size:13px; font-weight:500; color:#94a3b8; cursor:pointer; }
.auth-tab.active { background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; }
.form-group { margin-bottom:14px; }
.form-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--text-body); opacity:0.8; margin-bottom:6px; display:block; }
.form-input { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:11px 14px; font-family:var(--ff); font-size:14px; color:var(--input-text); outline:none; }
.form-input::placeholder { color:var(--placeholder); }
.form-input:focus { border-color:rgba(99,102,241,0.6); }
.auth-btn { width:100%; padding:13px; border:none; border-radius:11px; margin-top:6px; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:14px; font-weight:600; cursor:pointer; }
.auth-error { background:var(--danger-bg); border:1px solid var(--danger-border); border-radius:9px; padding:10px 12px; font-size:12px; color:#fb7185; margin-bottom:12px; }
.auth-success { background:var(--success-bg); border:1px solid var(--success-border); border-radius:9px; padding:10px 12px; font-size:12px; color:#34d399; margin-bottom:12px; }
.admin-hint { text-align:center; font-size:11px; color:var(--text-muted); margin-top:12px; opacity:0.7; }

/* MAIN */
.main-content { flex:1; display:flex; flex-direction:column; align-items:center; padding:32px 20px 80px; max-width:1200px; width:100%; margin:0 auto; }

/* HERO */
.hero { width:100%; display:flex; flex-direction:column; align-items:center; }
.hero-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; border:1px solid var(--badge-border); background:var(--badge-bg); font-size:11px; font-weight:500; color:var(--blue); margin-bottom:16px; }
.hero-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--blue); }
.hero-title { font-family:var(--ff2); font-size:42px; font-weight:800; line-height:1.15; color:var(--text); letter-spacing:-1.5px; margin-bottom:8px; text-align:center; }
.hero-title .grad1 { background:linear-gradient(135deg,#6366f1,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hero-title .grad2 { background:linear-gradient(135deg,#8b5cf6,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hero-sub { font-size:15px; line-height:1.6; color:var(--text-body); opacity:0.85; margin-bottom:28px; text-align:center; max-width:580px; }
.input-card { width:100%; max-width:680px; background:var(--surface); border:1px solid var(--border-strong); border-radius:20px; padding:24px; backdrop-filter:blur(30px); box-shadow:0 20px 40px rgba(0,0,0,0.15); }
.tab-row { display:flex; gap:4px; margin-bottom:20px; background:var(--tabs-bg); border-radius:12px; padding:4px; }
.tab-btn { flex:1; padding:9px; border-radius:8px; border:none; background:transparent; font-family:var(--ff); font-size:13px; font-weight:500; color:var(--tab-inactive); cursor:pointer; }
.tab-btn.active { background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; }
.input-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--text-body); opacity:0.8; margin-bottom:8px; }
.url-wrap { display:flex; align-items:center; gap:10px; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:12px; padding:12px 14px; margin-bottom:12px; }
.url-wrap:focus-within { border-color:rgba(99,102,241,0.6); }
.url-icon { font-size:14px; color:var(--text-muted); }
.url-input { flex:1; background:transparent; border:none; outline:none; font-family:var(--ff); font-size:14px; color:var(--input-text); width:100%; }
.url-input::placeholder { color:var(--placeholder); }
.tag-row { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:16px; }
.tag { padding:3px 8px; border-radius:6px; background:var(--tag-bg); border:1px solid var(--tag-border); font-size:10px; font-weight:600; color:var(--tag-color); }
.drop-zone { border:1.5px dashed var(--drop-border); border-radius:14px; background:var(--drop-bg); text-align:center; padding:40px 16px; cursor:pointer; position:relative; margin-bottom:16px; }
.drop-zone input { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; }
.dz-icon { font-size:28px; margin-bottom:8px; display:block; }
.dz-txt { font-size:13px; font-weight:600; color:var(--text); margin-bottom:4px; }
.dz-sub { font-size:11px; color:var(--text-body); opacity:0.8; }
.analyze-btn { width:100%; padding:13px; border:none; border-radius:12px; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; }
.analyze-btn:disabled { opacity:0.6; cursor:not-allowed; }
.error-box { background:var(--danger-bg); border:1px solid var(--danger-border); border-radius:10px; padding:12px; margin-bottom:12px; font-size:12px; color:#fb7185; }
.loading-overlay { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:40px; text-align:center; backdrop-filter:blur(20px); width:100%; max-width:680px; }
.spinner { width:32px; height:32px; border-radius:50%; border:2px solid var(--border); border-top-color:var(--blue); animation:spin .7s linear infinite; margin:0 auto 14px; }
@keyframes spin { to { transform:rotate(360deg); } }
.loading-title { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); }
.loading-sub { font-size:12px; color:var(--text-body); opacity:0.85; margin-top:4px; }

/* RESULTS */
.results-page { width:100%; max-width:780px; }
.results-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; gap:12px; flex-wrap:wrap; }
.results-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.back-btn { display:inline-flex; align-items:center; gap:6px; padding:6px 12px; border-radius:8px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff); font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; backdrop-filter:blur(10px); }
.source-chip { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:20px; background:var(--badge-bg); border:1px solid var(--badge-border); font-size:11px; font-weight:600; color:var(--text-body); margin-bottom:20px; max-width:100%; overflow:hidden; }
.source-chip-text { max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--text); }
.action-row { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
.act-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border-radius:8px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff); font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; }
.act-btn:disabled { opacity:0.5; cursor:not-allowed; }
.act-btn.copied { background:rgba(5,150,105,.15); border-color:rgba(5,150,105,.4); color:#34d399; }
.act-btn.ppt-btn { background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(99,102,241,0.1)); border-color:rgba(139,92,246,0.4); color:#c4b5fd; }
.act-btn.pdf-btn { background:linear-gradient(135deg,rgba(225,29,72,0.12),rgba(239,68,68,0.08)); border-color:rgba(225,29,72,0.35); color:#fca5a5; }
.act-btn.chat-btn { background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.1)); border-color:rgba(16,185,129,0.4); color:#34d399; }
.act-btn.scenario-btn { background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(217,119,6,0.1)); border-color:rgba(245,158,11,0.4); color:#fcd34d; }
.summary-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; margin-bottom:20px; }
.summary-card .md h1 { font-family:var(--ff2); font-size:16px; font-weight:800; color:var(--text); margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--border); }
.summary-card .md h2 { font-family:var(--ff2); font-size:12px; font-weight:700; color:var(--blue); text-transform:uppercase; letter-spacing:.06em; margin:18px 0 8px; display:flex; align-items:center; gap:8px; }
.summary-card .md h2::before { content:''; display:block; flex:1; height:1px; background:var(--sline); }
.summary-card .md p { font-size:13.5px; line-height:1.65; color:var(--text-body); margin-bottom:10px; }
.summary-card .md li { font-size:13px; line-height:1.6; color:var(--text-body); margin-bottom:6px; padding-left:14px; position:relative; list-style:none; }
.summary-card .md li::before { content:'→'; position:absolute; left:0; color:var(--blue); font-weight:700; }
.quiz-cta { background:rgba(255,255,255,0.02); border:1px solid var(--border-strong); border-radius:16px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.qcta-title { font-family:var(--ff2); font-size:15px; font-weight:800; color:var(--text); }
.qcta-sub { font-size:12px; color:var(--text-body); opacity:0.85; margin-top:2px; }
.quiz-cta-btn { padding:10px 22px; border-radius:11px; border:none; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }
.scenario-cta { background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.25); border-radius:16px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-top:12px; }
.scenario-cta-btn { padding:10px 22px; border-radius:11px; border:none; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }

/* PPT MODAL */
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:999; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(6px); }
.modal-card { background:#0b0924; border:1px solid var(--border-strong); border-radius:22px; padding:32px; width:100%; max-width:480px; box-shadow:0 40px 80px rgba(0,0,0,0.5); }
.modal-title { font-family:var(--ff2); font-size:20px; font-weight:800; color:var(--text); margin-bottom:6px; }
.modal-sub { font-size:13px; color:var(--text-body); opacity:0.85; margin-bottom:24px; }
.slide-count-input { background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:10px 14px; font-family:var(--ff); font-size:14px; color:var(--input-text); outline:none; width:80px; text-align:center; }
.modal-btns { display:flex; gap:10px; }
.modal-btn { flex:1; padding:12px; border-radius:11px; font-family:var(--ff2); font-size:13px; font-weight:600; cursor:pointer; }
.modal-btn.primary { background:linear-gradient(135deg,var(--blue),var(--violet)); border:none; color:#fff; }
.modal-btn.secondary { background:transparent; border:1px solid var(--border-strong); color:var(--text-muted); }
.ppt-progress-bar { height:4px; border-radius:4px; background:var(--border); overflow:hidden; margin:16px 0 8px; }
.ppt-progress-fill { height:100%; background:linear-gradient(90deg,var(--blue),var(--violet)); transition:width 0.4s ease; }

/* PPT EDITOR */
.ppt-editor-page { width:100%; max-width:1000px; }
.ppt-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.ppt-title-h { font-family:var(--ff2); font-size:22px; font-weight:800; color:var(--text); }
.ppt-toolbar { display:flex; gap:8px; flex-wrap:wrap; }
.toolbar-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border-radius:8px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff); font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; }
.toolbar-btn.primary { background:linear-gradient(135deg,var(--blue),var(--violet)); border:none; color:#fff; }
.toolbar-btn:disabled { opacity:0.5; cursor:not-allowed; }
.slides-list { display:flex; gap:10px; overflow-x:auto; padding-bottom:12px; margin-bottom:20px; }
.slide-thumb { width:130px; flex-shrink:0; border:2px solid transparent; border-radius:10px; background:var(--surface); cursor:pointer; padding:8px; transition:all .2s; }
.slide-thumb.active { border-color:var(--blue); }
.slide-thumb-num { font-size:9px; color:var(--text-muted); margin-bottom:4px; font-family:var(--ff2); }
.slide-thumb-preview { font-size:10px; color:var(--text-body); line-height:1.3; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; }
.slide-editor { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; }
.slide-editor-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--blue); margin-bottom:8px; }
.slide-title-input { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:10px 14px; font-family:var(--ff2); font-size:16px; font-weight:700; color:var(--input-text); outline:none; margin-bottom:14px; }
.slide-title-input:focus { border-color:rgba(99,102,241,0.6); }
.slide-content-input { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:12px 14px; font-family:var(--ff); font-size:13px; color:var(--input-text); outline:none; min-height:150px; resize:vertical; line-height:1.6; }
.slide-content-input:focus { border-color:rgba(99,102,241,0.6); }
.slide-canvas-wrap { margin-top:20px; border-radius:14px; overflow:hidden; border:2px solid rgba(99,102,241,0.3); box-shadow:0 20px 60px rgba(0,0,0,0.5); aspect-ratio:16/9; position:relative; }
.slide-canvas { width:100%; height:100%; position:relative; display:flex; flex-direction:column; }
.slide-canvas.type-title { background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%); }
.slide-canvas.type-overview { background:linear-gradient(135deg,#0a0a1a 0%,#1a1a3e 100%); }
.slide-canvas.type-content { background:linear-gradient(135deg,#050510 0%,#0d0d20 100%); }
.slide-canvas.type-highlight { background:linear-gradient(135deg,#0d0922 0%,#1a0d40 60%,#2d0d52 100%); }
.slide-canvas.type-conclusion { background:linear-gradient(135deg,#0f0c29 0%,#1e113a 50%,#2d1b4e 100%); }
.slide-top-bar { height:4px; width:100%; flex-shrink:0; }
.slide-num-badge { position:absolute; top:16px; right:16px; font-size:10px; font-family:var(--ff2); color:rgba(255,255,255,0.3); font-weight:700; letter-spacing:2px; }
.slide-corner-decoration { position:absolute; width:120px; height:120px; border-radius:50%; opacity:0.08; }
.slide-body { flex:1; display:flex; flex-direction:column; justify-content:center; padding:32px 40px; position:relative; z-index:1; }
.slide-tag { display:inline-block; font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:3px 10px; border-radius:20px; margin-bottom:12px; }
.slide-main-title { font-family:var(--ff2); font-size:clamp(16px,3.5vw,28px); font-weight:800; color:#fff; line-height:1.2; margin-bottom:10px; text-shadow:0 2px 20px rgba(0,0,0,0.4); }
.slide-main-title.large { font-size:clamp(22px,5vw,38px); }
.slide-divider { width:40px; height:3px; border-radius:3px; margin-bottom:16px; }
.slide-bullets { list-style:none; display:flex; flex-direction:column; gap:8px; }
.slide-bullet-item { display:flex; align-items:flex-start; gap:10px; }
.slide-bullet-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; margin-top:6px; }
.slide-bullet-text { font-size:clamp(10px,1.8vw,14px); color:rgba(255,255,255,0.85); line-height:1.5; font-family:var(--ff); }
.slide-footer { display:flex; align-items:center; justify-content:space-between; padding:12px 40px; border-top:1px solid rgba(255,255,255,0.06); flex-shrink:0; }
.slide-footer-brand { font-family:var(--ff2); font-size:9px; font-weight:800; color:rgba(255,255,255,0.25); letter-spacing:1px; text-transform:uppercase; }
.slide-footer-progress { display:flex; gap:3px; }
.slide-footer-dot { width:16px; height:2px; border-radius:2px; }
.slide-grid-2col { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:4px; }
.slide-grid-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; }
.slide-grid-card-title { font-family:var(--ff2); font-size:clamp(9px,1.5vw,12px); font-weight:700; color:rgba(255,255,255,0.9); margin-bottom:4px; }
.slide-grid-card-text { font-size:clamp(8px,1.3vw,11px); color:rgba(255,255,255,0.6); line-height:1.4; }
.slide-subtitle { font-size:clamp(10px,1.8vw,14px); color:rgba(255,255,255,0.6); font-family:var(--ff); margin-bottom:20px; }

/* HISTORY PAGE */
.history-page { width:100%; max-width:780px; }
.history-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.history-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.history-empty { text-align:center; padding:60px 20px; color:var(--text-muted); }
.history-empty-icon { font-size:3rem; display:block; margin-bottom:12px; }
.history-empty-txt { font-size:15px; font-weight:600; color:var(--text); margin-bottom:6px; }
.history-list { display:flex; flex-direction:column; gap:12px; margin-bottom:32px; }
.history-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px 20px; cursor:pointer; transition:all .2s; backdrop-filter:blur(20px); }
.history-card:hover { border-color:var(--border-strong); transform:translateY(-2px); }
.history-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:8px; }
.history-card-source { font-size:12px; color:var(--text-muted); word-break:break-all; flex:1; }
.history-card-date { font-size:11px; color:#64748b; white-space:nowrap; }
.history-card-preview { font-size:13px; color:var(--text-body); line-height:1.5; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.history-card-footer { display:flex; gap:6px; margin-top:10px; }
.history-tag { padding:2px 8px; border-radius:5px; font-size:10px; font-weight:600; background:var(--tag-bg); border:1px solid var(--tag-border); color:var(--tag-color); }
.delete-btn { margin-left:auto; padding:3px 8px; border-radius:5px; border:none; background:var(--danger-bg); color:#fb7185; font-size:11px; cursor:pointer; }

/* HEATMAP */
.heatmap-section { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:22px; margin-bottom:20px; backdrop-filter:blur(20px); }
.heatmap-title { font-family:var(--ff2); font-size:14px; font-weight:700; color:var(--text); margin-bottom:4px; }
.heatmap-sub { font-size:11px; color:var(--text-muted); margin-bottom:16px; }
.heatmap-grid { display:flex; gap:3px; overflow-x:auto; padding-bottom:4px; }
.heatmap-week { display:flex; flex-direction:column; gap:3px; }
.heatmap-cell { width:12px; height:12px; border-radius:2px; cursor:default; transition:transform .15s,box-shadow .15s; }
.heatmap-cell:hover { transform:scale(1.4); }
.heatmap-cell.empty { background:var(--heat-empty); }
.heatmap-cell.low   { background:#4ade80; box-shadow:0 0 4px rgba(74,222,128,0.4); }
.heatmap-cell.mid   { background:#22c55e; box-shadow:0 0 5px rgba(34,197,94,0.5); }
.heatmap-cell.high  { background:#16a34a; box-shadow:0 0 6px rgba(22,163,74,0.55); }
.heatmap-cell.full  { background:#15803d; box-shadow:0 0 8px rgba(21,128,61,0.7); }
.heatmap-cell.today-active { outline:2px solid #4ade80; outline-offset:1px; }
.heatmap-legend { display:flex; align-items:center; gap:6px; margin-top:10px; font-size:10px; color:var(--text-muted); }
.heatmap-legend-cell { width:10px; height:10px; border-radius:2px; }
.heatmap-legend-cell.empty { background:var(--heat-empty); }
.heatmap-legend-cell.low  { background:#4ade80; }
.heatmap-legend-cell.mid  { background:#22c55e; }
.heatmap-legend-cell.high { background:#16a34a; }
.heatmap-legend-cell.full { background:#15803d; }
.streak-badges { display:flex; gap:10px; flex-wrap:wrap; margin-top:14px; }
.streak-badge { display:flex; align-items:center; gap:7px; padding:8px 14px; border-radius:10px; background:var(--streak-bg); border:1px solid var(--streak-border); }
.streak-badge-val { font-family:var(--ff2); font-size:18px; font-weight:800; color:#10b981; }
.streak-badge-label { font-size:11px; color:var(--text-muted); font-weight:500; }

/* IMPROVEMENT GRAPH */
.improvement-section { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:22px; margin-bottom:28px; backdrop-filter:blur(20px); }
.improvement-title { font-family:var(--ff2); font-size:14px; font-weight:700; color:var(--text); margin-bottom:2px; }
.improvement-sub { font-size:11px; color:var(--text-muted); margin-bottom:18px; }
.graph-tabs { display:flex; gap:4px; margin-bottom:16px; }
.graph-tab { padding:4px 12px; border-radius:6px; border:1px solid var(--border); background:transparent; font-family:var(--ff); font-size:11px; font-weight:600; color:var(--text-muted); cursor:pointer; }
.graph-tab.active { background:rgba(16,185,129,0.15); border-color:rgba(16,185,129,0.4); color:#10b981; }
.line-graph-wrap { position:relative; width:100%; height:160px; }
.line-graph-wrap svg { width:100%; height:100%; overflow:visible; }
.graph-tooltip { position:absolute; background:rgba(0,0,0,0.85); border:1px solid rgba(16,185,129,0.4); border-radius:8px; padding:6px 10px; font-size:11px; color:#fff; pointer-events:none; white-space:nowrap; transform:translate(-50%,-100%); margin-top:-8px; z-index:10; }
.graph-x-labels { display:flex; justify-content:space-between; margin-top:4px; padding:0 2px; }
.graph-x-label { font-size:9px; color:var(--text-muted); font-family:var(--ff2); text-align:center; }
.graph-stats-row { display:flex; gap:16px; flex-wrap:wrap; margin-top:14px; padding-top:14px; border-top:1px solid var(--border); }
.graph-stat { flex:1; min-width:80px; }
.graph-stat-val { font-family:var(--ff2); font-size:20px; font-weight:800; color:#10b981; }
.graph-stat-label { font-size:10px; color:var(--text-muted); margin-top:2px; }

/* ── PERFORMANCE PAGE ── */
.performance-page { width:100%; max-width:820px; }
.perf-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.perf-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.perf-stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:12px; margin-bottom:20px; }
.perf-stat-card { background:var(--perf-card-bg); border:1px solid var(--perf-card-border); border-radius:14px; padding:16px; display:flex; align-items:center; gap:12px; backdrop-filter:blur(20px); }
.perf-stat-icon { font-size:22px; }
.perf-stat-val { font-family:var(--ff2); font-size:22px; font-weight:800; color:#10b981; }
.perf-stat-label { font-size:11px; color:var(--text-muted); margin-top:2px; }
.perf-panel-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
@media(max-width:600px){ .perf-panel-grid { grid-template-columns:1fr; } }
.perf-panel { background:var(--perf-card-bg); border:1px solid var(--perf-card-border); border-radius:16px; padding:20px; backdrop-filter:blur(20px); }
.perf-panel-title { font-family:var(--ff2); font-size:13px; font-weight:700; color:var(--text); margin-bottom:4px; }
.perf-panel-sub { font-size:11px; color:var(--text-muted); margin-bottom:14px; }
.topic-bar-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.topic-name { font-size:12px; color:var(--text-body); min-width:120px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.topic-bar-bg { flex:1; height:8px; background:var(--border); border-radius:4px; overflow:hidden; }
.topic-bar-fill { height:100%; border-radius:4px; }
.topic-count { font-size:11px; color:var(--text-muted); min-width:24px; text-align:right; }
.quiz-score-summary { display:flex; gap:16px; margin-bottom:14px; }
.qss-item { flex:1; text-align:center; }
.qss-val { font-family:var(--ff2); font-size:20px; font-weight:800; }
.qss-label { font-size:10px; color:var(--text-muted); margin-top:2px; }
.quiz-history-bars { display:flex; gap:3px; align-items:flex-end; height:70px; margin-bottom:6px; }
.qh-bar { flex:1; border-radius:3px 3px 0 0; min-height:4px; cursor:default; transition:opacity .15s; }
.qh-bar:hover { opacity:0.75; }
.chat-stat-big { font-family:var(--ff2); font-size:30px; font-weight:800; color:#10b981; margin-bottom:4px; }
.chat-stat-label { font-size:12px; color:var(--text-muted); margin-bottom:14px; }
.chat-daily-bars { display:flex; gap:3px; align-items:flex-end; height:50px; }
.cdb-bar { flex:1; border-radius:3px 3px 0 0; background:rgba(16,185,129,0.5); min-height:4px; }
.milestone-badges { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
.milestone-badge { display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:10px; font-size:11px; font-weight:600; }
.milestone-badge.locked { background:rgba(255,255,255,0.04); border:1px solid var(--border); color:var(--text-muted); opacity:0.6; }
.milestone-badge.earned { background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); color:#10b981; }
.milestone-badge.gold { background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#f59e0b; }
.weekly-chart-wrap { display:flex; gap:4px; align-items:flex-end; height:80px; }
.wcw-group { flex:1; display:flex; flex-direction:column; gap:2px; align-items:center; justify-content:flex-end; }
.wcw-bar-quiz { width:100%; border-radius:3px 3px 0 0; background:rgba(99,102,241,0.6); min-height:0; }
.wcw-bar-chat { width:100%; background:rgba(16,185,129,0.55); min-height:0; }
.wcw-label { font-size:9px; color:var(--text-muted); margin-top:4px; font-family:var(--ff2); }
.weekly-legend { display:flex; gap:14px; margin-top:10px; font-size:11px; color:var(--text-muted); }
.wl-dot { width:10px; height:10px; border-radius:2px; display:inline-block; margin-right:4px; }
.perf-panel-full { background:var(--perf-card-bg); border:1px solid var(--perf-card-border); border-radius:16px; padding:20px; backdrop-filter:blur(20px); margin-bottom:20px; }

/* ADMIN */
.admin-page { width:100%; max-width:1000px; }
.admin-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
.admin-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.admin-badge { padding:4px 10px; border-radius:20px; background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(236,72,153,0.1)); border:1px solid rgba(245,158,11,0.4); font-size:11px; font-weight:600; color:#fbbf24; }
.stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-bottom:28px; }
.stat-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px; backdrop-filter:blur(20px); }
.stat-val { font-family:var(--ff2); font-size:28px; font-weight:800; margin-bottom:4px; background:linear-gradient(135deg,#a5b4fc,#f9a8d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.stat-label { font-size:11px; color:var(--text-body); font-weight:600; opacity:0.85; }
.users-table { background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden; backdrop-filter:blur(20px); margin-bottom:28px; }
.table-header { padding:16px 20px; border-bottom:1px solid var(--border); font-family:var(--ff2); font-size:13px; font-weight:700; color:var(--text); }
.table-row { display:flex; align-items:center; padding:14px 20px; border-bottom:1px solid rgba(99,102,241,0.08); gap:12px; }
.table-row:last-child { border-bottom:none; }
.table-row:hover { background:rgba(99,102,241,0.04); }
.user-avatar { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; flex-shrink:0; }
.user-info { flex:1; min-width:0; }
.user-name { font-size:14px; font-weight:600; color:var(--text); margin-bottom:2px; }
.user-email { font-size:11px; color:var(--text-muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.user-meta { text-align:right; flex-shrink:0; }
.user-count { font-size:12px; color:var(--text-body); font-weight:600; }
.user-date { font-size:11px; color:#64748b; }
.user-role-badge { display:inline-block; padding:3px 8px; border-radius:5px; font-size:10px; font-weight:700; }
.user-role-badge.admin { background:rgba(245,158,11,0.15); color:#fbbf24; border:1px solid rgba(245,158,11,0.3); }
.user-role-badge.user { background:rgba(99,102,241,0.12); color:#a5b4fc; border:1px solid rgba(99,102,241,0.25); }
.view-history-btn { padding:4px 10px; border-radius:6px; border:1px solid var(--border); background:transparent; font-size:11px; color:var(--text-muted); cursor:pointer; }
.user-detail-row { cursor:pointer; }

/* QUIZ */
.quiz-page { width:100%; max-width:680px; }
.qprogress-bar { height:3px; border-radius:3px; background:var(--border-strong); margin-bottom:16px; overflow:hidden; }
.qprogress-fill { height:100%; background:linear-gradient(90deg,var(--blue),var(--violet)); transition:width .3s ease; }
.question-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; }
.q-text { font-family:var(--ff2); font-size:17px; font-weight:700; color:var(--text); line-height:1.4; margin-bottom:20px; }
.options-list { display:flex; flex-direction:column; gap:8px; }
.opt-btn { display:flex; align-items:flex-start; gap:10px; padding:12px 14px; border-radius:12px; border:1.5px solid var(--border-strong); background:var(--card-bg); font-family:var(--ff); font-size:13.5px; line-height:1.45; color:var(--text-body); cursor:pointer; text-align:left; }
.opt-btn.correct { background:rgba(34,197,94,.15); border-color:rgba(34,197,94,.5); color:#4ade80; }
.opt-btn.wrong { background:rgba(239,68,68,.15); border-color:rgba(239,68,68,.5); color:#f87171; }
.opt-letter { width:24px; height:24px; border-radius:6px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:var(--ff2); font-size:10px; font-weight:700; background:var(--badge-bg); border:1px solid var(--border-strong); color:#a5b4fc; }
.opt-letter.correct { background:rgba(34,197,94,.25); color:#4ade80; }
.opt-letter.wrong { background:rgba(239,68,68,.22); color:#f87171; }
.explanation-box { margin-top:16px; padding:14px; border-radius:12px; background:var(--exp-bg); border:1px solid var(--exp-border); }
.explanation-box p { font-size:12.5px; line-height:1.6; color:var(--text-body); margin-bottom:12px; }
.next-btn { float:right; padding:10px 18px; border-radius:9px; border:none; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:12px; font-weight:700; cursor:pointer; }
.score-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:20px; padding:48px 20px; text-align:center; }
.score-emoji { font-size:3rem; display:block; margin-bottom:12px; }
.score-title { font-family:var(--ff2); font-size:22px; font-weight:800; color:var(--text); margin-bottom:4px; }
.score-actions { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:20px; }
.sa-btn { padding:12px 24px; border-radius:12px; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }
.sa-btn.primary { background:linear-gradient(135deg,var(--blue),var(--violet)); border:none; color:#fff; }
.sa-btn.secondary { background:transparent; border:1px solid var(--border-strong); color:var(--text-muted); }

/* ── SCENARIO / DESCRIPTIVE QUESTIONS ── */
.scenario-page { width:100%; max-width:740px; }
.scenario-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.scenario-title-h { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.sq-progress-bar { height:3px; border-radius:3px; background:var(--border-strong); margin-bottom:20px; overflow:hidden; }
.sq-progress-fill { height:100%; background:linear-gradient(90deg,#f59e0b,#d97706); transition:width .3s ease; }
.sq-type-badge { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; margin-bottom:12px; }
.sq-type-badge.scenario { background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.35); color:#fcd34d; }
.sq-type-badge.descriptive { background:rgba(139,92,246,0.15); border:1px solid rgba(139,92,246,0.35); color:#c4b5fd; }
.sq-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; margin-bottom:16px; }
.sq-context-box { background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.2); border-radius:10px; padding:12px 14px; margin-bottom:16px; font-size:13px; color:var(--text-body); line-height:1.6; }
.sq-context-label { font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#f59e0b; margin-bottom:6px; }
.sq-question-text { font-family:var(--ff2); font-size:17px; font-weight:700; color:var(--text); line-height:1.4; margin-bottom:16px; }
.sq-criteria-list { display:flex; flex-direction:column; gap:4px; margin-bottom:18px; }
.sq-criteria-item { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:var(--text-muted); line-height:1.5; }
.sq-criteria-dot { width:5px; height:5px; border-radius:50%; background:var(--blue); flex-shrink:0; margin-top:5px; }
.sq-answer-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--blue); margin-bottom:8px; }
.sq-textarea { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:12px; padding:14px; font-family:var(--ff); font-size:14px; color:var(--input-text); outline:none; min-height:130px; resize:vertical; line-height:1.65; }
.sq-textarea:focus { border-color:rgba(99,102,241,0.5); }
.sq-textarea::placeholder { color:var(--placeholder); }
.sq-submit-row { display:flex; justify-content:flex-end; margin-top:12px; gap:10px; }
.sq-submit-btn { padding:11px 24px; border:none; border-radius:11px; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }
.sq-submit-btn:disabled { opacity:0.5; cursor:not-allowed; }
.sq-skip-btn { padding:11px 18px; border-radius:11px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff2); font-size:13px; font-weight:600; color:var(--text-muted); cursor:pointer; }

/* Feedback card */
.sq-feedback-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:22px; margin-top:16px; }
.sq-feedback-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px; }
.sq-score-display { display:flex; align-items:center; gap:10px; }
.sq-score-circle { width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:var(--ff2); font-size:18px; font-weight:800; flex-shrink:0; }
.sq-score-circle.excellent { background:rgba(16,185,129,0.15); border:2px solid rgba(16,185,129,0.4); color:#10b981; }
.sq-score-circle.good { background:rgba(99,102,241,0.15); border:2px solid rgba(99,102,241,0.4); color:#a5b4fc; }
.sq-score-circle.satisfactory { background:rgba(245,158,11,0.15); border:2px solid rgba(245,158,11,0.4); color:#fcd34d; }
.sq-score-circle.needs { background:rgba(239,68,68,0.15); border:2px solid rgba(239,68,68,0.4); color:#f87171; }
.sq-grade-text { font-family:var(--ff2); font-size:15px; font-weight:800; color:var(--text); }
.sq-grade-sub { font-size:12px; color:var(--text-muted); margin-top:2px; }
.sq-feedback-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; }
@media(max-width:560px) { .sq-feedback-grid { grid-template-columns:1fr; } }
.sq-fb-section { border-radius:10px; padding:12px 14px; }
.sq-fb-section.strengths { background:rgba(16,185,129,0.07); border:1px solid rgba(16,185,129,0.2); }
.sq-fb-section.improvements { background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.18); }
.sq-fb-section-title { font-size:11px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; margin-bottom:8px; }
.sq-fb-section.strengths .sq-fb-section-title { color:#10b981; }
.sq-fb-section.improvements .sq-fb-section-title { color:#f87171; }
.sq-fb-item { display:flex; align-items:flex-start; gap:7px; font-size:12.5px; color:var(--text-body); line-height:1.5; margin-bottom:5px; }
.sq-fb-bullet { font-size:14px; flex-shrink:0; margin-top:1px; }
.sq-detailed-feedback { background:var(--exp-bg); border:1px solid var(--exp-border); border-radius:10px; padding:12px 14px; font-size:13px; line-height:1.65; color:var(--text-body); margin-bottom:14px; }
.sq-sample-toggle { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; background:transparent; border:none; padding:0; margin-bottom:10px; }
.sq-sample-toggle:hover { color:var(--text); }
.sq-sample-answer { background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.2); border-radius:10px; padding:12px 14px; font-size:13px; line-height:1.65; color:var(--text-body); margin-bottom:14px; }
.sq-sample-label { font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--blue); margin-bottom:6px; }
.sq-next-btn { width:100%; padding:12px; border:none; border-radius:11px; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }

/* Scenario summary */
.sq-summary-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:20px; padding:40px 24px; text-align:center; }
.sq-summary-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px; margin:24px 0; }
.sq-summary-stat { background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:12px; padding:14px; }
.sq-summary-val { font-family:var(--ff2); font-size:22px; font-weight:800; color:#f59e0b; }
.sq-summary-label { font-size:11px; color:var(--text-muted); margin-top:3px; }

/* CHATBOT */
.chatbot-page { width:100%; max-width:680px; }
.chat-container { background:var(--surface); border:1px solid var(--border-strong); border-radius:18px; overflow:hidden; backdrop-filter:blur(30px); }
.chat-header-bar { display:flex; align-items:center; gap:12px; padding:16px 20px; border-bottom:1px solid var(--border); }
.chat-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(5,150,105,0.15)); border:1px solid rgba(16,185,129,0.3); display:flex; align-items:center; justify-content:center; font-size:18px; }
.chat-header-info .chat-name { font-family:var(--ff2); font-size:14px; font-weight:700; color:var(--text); }
.chat-header-info .chat-status { font-size:11px; color:#10b981; margin-top:1px; }
.quick-prompts { display:flex; gap:6px; flex-wrap:wrap; padding:12px 16px; border-bottom:1px solid var(--border); }
.quick-prompt-chip { padding:5px 10px; border-radius:20px; border:1px solid var(--border-strong); background:var(--card-bg); font-size:11px; color:var(--text-muted); cursor:pointer; transition:all .15s; white-space:nowrap; }
.quick-prompt-chip:hover { border-color:rgba(16,185,129,0.4); color:#10b981; }
.chat-messages-area { height:420px; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; }
.chat-messages-area::-webkit-scrollbar { width:4px; }
.chat-messages-area::-webkit-scrollbar-track { background:transparent; }
.chat-messages-area::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; }
.chat-msg-wrap { display:flex; flex-direction:column; }
.chat-msg-wrap.user { align-items:flex-end; }
.chat-msg-wrap.ai { align-items:flex-start; }
.chat-msg-label { font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; margin-bottom:4px; font-family:var(--ff2); }
.chat-msg-wrap.ai .chat-msg-label { color:#10b981; }
.chat-msg-wrap.user .chat-msg-label { color:#a5b4fc; }
.chat-bubble { max-width:82%; padding:11px 14px; border-radius:14px; font-size:13px; line-height:1.65; }
.chat-bubble.ai { background:var(--chat-ai-bg); border:1px solid var(--chat-ai-border); color:var(--text-body); border-bottom-left-radius:4px; }
.chat-bubble.user { background:var(--chat-user-bg); color:#fff; border-bottom-right-radius:4px; }
.chat-typing { display:flex; gap:4px; align-items:center; padding:10px 14px; background:var(--chat-ai-bg); border:1px solid var(--chat-ai-border); border-radius:14px; border-bottom-left-radius:4px; width:fit-content; }
.typing-dot { width:6px; height:6px; border-radius:50%; background:#10b981; opacity:0.4; animation:typingPulse 1.2s ease-in-out infinite; }
.typing-dot:nth-child(2) { animation-delay:.2s; }
.typing-dot:nth-child(3) { animation-delay:.4s; }
@keyframes typingPulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
.chat-input-row { display:flex; gap:8px; padding:12px 14px; border-top:1px solid var(--border); align-items:flex-end; }
.chat-textarea { flex:1; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:10px 12px; font-family:var(--ff); font-size:13px; color:var(--input-text); outline:none; resize:none; min-height:42px; max-height:100px; line-height:1.5; }
.chat-textarea:focus { border-color:rgba(16,185,129,0.5); }
.chat-send-btn { width:42px; height:42px; border-radius:10px; border:none; background:linear-gradient(135deg,#10b981,#059669); color:#fff; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.chat-send-btn:disabled { opacity:0.5; cursor:not-allowed; }
.chat-context-note { font-size:11px; color:var(--text-muted); margin-top:8px; text-align:center; padding:0 4px; }

/* MARKETING */
.marketing-section { width:100%; max-width:900px; margin:40px auto 0; text-align:left; padding:0 16px; }
.m-title { font-family:var(--ff2); font-size:clamp(26px,5vw,38px); font-weight:800; color:var(--text); margin-bottom:12px; text-align:center; letter-spacing:-0.5px; }
.m-sub { font-size:clamp(13px,2vw,15px); color:var(--text-body); opacity:0.8; margin-bottom:40px; text-align:center; max-width:620px; margin-left:auto; margin-right:auto; line-height:1.5; }
.m-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; margin-bottom:48px; }
.m-card { background:var(--m-card-bg); border:1px solid var(--m-card-border); border-radius:18px; padding:24px 20px 20px; position:relative; overflow:hidden; transition:transform 0.25s ease,border-color 0.25s ease; backdrop-filter:blur(10px); }
.m-card:hover { transform:translateY(-4px); border-color:var(--m-card-border-hover); }
.m-card-accent { position:absolute; top:0; left:0; right:0; height:3px; border-radius:18px 18px 0 0; }
.m-card-icon-wrap { width:46px; height:46px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:14px; border:1px solid var(--border); }
.m-card-title { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); margin-bottom:7px; }
.m-card-desc { font-size:13px; color:var(--text-body); opacity:0.9; line-height:1.55; }
.steps-section { margin-bottom:52px; }
.step-item { display:flex; gap:16px; background:var(--m-card-bg); border:1px solid var(--m-card-border); border-radius:16px; padding:18px 20px; align-items:flex-start; backdrop-filter:blur(10px); margin-bottom:10px; }
.step-left { display:flex; flex-direction:column; align-items:center; }
.step-connector { width:2px; height:22px; background:rgba(99,102,241,0.2); margin:4px 0; }
.step-num { width:38px; height:38px; border-radius:50%; flex-shrink:0; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-weight:800; font-size:14px; display:flex; align-items:center; justify-content:center; }
.step-content { flex:1; padding-top:4px; }
.step-title { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); margin-bottom:4px; }
.step-desc { font-size:13px; color:var(--text-body); opacity:0.85; line-height:1.5; }
.step-tag { display:inline-block; margin-top:7px; font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; padding:3px 8px; border-radius:5px; background:var(--m-step-tag-bg); color:var(--m-step-tag-color); }
.roles-section { margin-bottom:40px; }
.roles-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.role-card { border-left:3px solid var(--blue); background:var(--m-card-bg); padding:20px 18px; border-radius:0 16px 16px 0; border-top:1px solid var(--m-card-border); border-right:1px solid var(--m-card-border); border-bottom:1px solid var(--m-card-border); backdrop-filter:blur(10px); }
.role-card.violet-l { border-left-color:var(--violet); }
.role-card.rose-l { border-left-color:var(--rose); }
.role-header { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.role-icon { font-size:20px; }
.role-name { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); }
.role-desc { font-size:13px; color:var(--text-body); opacity:0.85; line-height:1.5; margin-bottom:10px; }
.role-pill { display:inline-block; font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; padding:3px 9px; border-radius:5px; }
.role-pill.blue { background:var(--m-pill-blue-bg); color:var(--m-pill-blue-color); }
.role-pill.violet { background:var(--m-pill-violet-bg); color:var(--m-pill-violet-color); }
.role-pill.pink { background:var(--m-pill-pink-bg); color:var(--m-pill-pink-color); }
.m-illus-banner { background:var(--m-illus-card-bg); border:1px solid var(--border-strong); border-radius:20px; padding:clamp(24px,5vw,40px); display:flex; flex-direction:column; gap:18px; margin-bottom:48px; backdrop-filter:blur(20px); overflow:hidden; }
.m-illus-eyebrow { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.09em; color:var(--blue); margin-bottom:10px; }
.m-illus-heading { font-family:var(--ff2); font-size:clamp(24px,4vw,34px); font-weight:800; color:var(--text); line-height:1.2; margin-bottom:12px; }
.m-illus-body { font-size:14px; color:var(--text-body); line-height:1.6; opacity:0.95; margin-bottom:24px; }
.m-banner-points { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; width:100%; }
.m-point-item { display:flex; gap:12px; align-items:flex-start; }
.m-point-bullet { color:var(--blue); font-size:16px; flex-shrink:0; padding-top:1px; }
.m-point-text strong { display:block; font-family:var(--ff2); font-size:13.5px; font-weight:700; color:var(--text); margin-bottom:2px; }
.m-point-text p { font-size:12.5px; color:var(--text-body); opacity:0.85; line-height:1.45; }
.m-eyebrow-wrap { text-align:center; margin-bottom:14px; }
.m-eyebrow { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--blue); background:var(--m-eyebrow-bg); border:1px solid var(--m-eyebrow-border); padding:4px 13px; border-radius:20px; }
.m-eyebrow-dot { width:5px; height:5px; border-radius:50%; background:var(--blue); }
.m-stat-strip { display:flex; flex-wrap:wrap; background:var(--m-card-bg); border:1px solid var(--m-card-border); border-radius:16px; overflow:hidden; margin-top:2rem; backdrop-filter:blur(10px); }
.m-stat-cell { flex:1; min-width:100px; text-align:center; padding:20px 8px; border-right:1px solid var(--m-card-border); }
.m-stat-cell:last-child { border-right:none; }
.m-stat-val { font-family:var(--ff2); font-size:clamp(20px,4vw,26px); font-weight:800; margin-bottom:4px; background:linear-gradient(135deg,var(--m-stat-val-from),var(--m-stat-val-to)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.m-stat-label { font-size:11px; color:var(--text-body); font-weight:600; opacity:0.85; }
@media (max-width:480px) {
  .m-stat-cell { border-right:none; border-bottom:1px solid var(--m-card-border); }
  .m-stat-cell:last-child { border-bottom:none; }
  .step-item { flex-direction:column; text-align:center; }
  .table-row { flex-wrap:wrap; }
  .slide-body { padding:20px 24px; }
  .perf-stat-grid { grid-template-columns:repeat(2,1fr); }
}
`;

// ─── LOCAL STORAGE DB ──────────────────────────────────────────────────────────────
const DB = {
  getUsers:       () => JSON.parse(localStorage.getItem("noteai_users") || "[]"),
  saveUsers:      (u) => localStorage.setItem("noteai_users", JSON.stringify(u)),
  getHistory:     (uid) => JSON.parse(localStorage.getItem(`noteai_hist_${uid}`) || "[]"),
  saveHistory:    (uid, h) => localStorage.setItem(`noteai_hist_${uid}`, JSON.stringify(h)),
  getSession:     () => JSON.parse(localStorage.getItem("noteai_session") || "null"),
  saveSession:    (s) => localStorage.setItem("noteai_session", JSON.stringify(s)),
  clearSession:   () => localStorage.removeItem("noteai_session"),
  getActivity:    (uid) => JSON.parse(localStorage.getItem(`noteai_activity_${uid}`) || "{}"),
  saveActivity:   (uid, a) => localStorage.setItem(`noteai_activity_${uid}`, JSON.stringify(a)),
  getTopics:      (uid) => JSON.parse(localStorage.getItem(`noteai_topics_${uid}`) || "{}"),
  saveTopics:     (uid, t) => localStorage.setItem(`noteai_topics_${uid}`, JSON.stringify(t)),
  getQuizScores:  (uid) => JSON.parse(localStorage.getItem(`noteai_quizscores_${uid}`) || "[]"),
  saveQuizScores: (uid, s) => localStorage.setItem(`noteai_quizscores_${uid}`, JSON.stringify(s)),
  getChatCount:   (uid) => parseInt(localStorage.getItem(`noteai_chatcount_${uid}`) || "0"),
  saveChatCount:  (uid, n) => localStorage.setItem(`noteai_chatcount_${uid}`, String(n)),
  getDailyChats:  (uid) => JSON.parse(localStorage.getItem(`noteai_dailychats_${uid}`) || "{}"),
  saveDailyChats: (uid, d) => localStorage.setItem(`noteai_dailychats_${uid}`, JSON.stringify(d)),
};

if (!DB.getUsers().length) {
  DB.saveUsers([{
    id: "admin-001", username: "Admin", email: "admin@noteai.com",
    password: "admin123", role: "admin",
    joined: new Date().toISOString(), analysisCount: 0
  }]);
}

function renderMd(text) {
  if (!text) return "";
  return text
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^[*•-] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, m => `<ul>${m}</ul>`)
    .replace(/<\/ul>\s*<ul>/g, "")
    .replace(/\n\n+/g, "</p><p>");
}

const TAGS = ["YouTube","Instagram","TikTok","Facebook","Twitter","Wikipedia","News","Blogs"];
const PLATFORMS = [
  { icon: "🔴", label: "YouTube" }, { icon: "📸", label: "Instagram" },
  { icon: "🎵", label: "TikTok" },  { icon: "📘", label: "Facebook" },
  { icon: "🐦", label: "Twitter" }, { icon: "🌐", label: "Any URL" },
];
const avatarColors = ["#6366f1","#8b5cf6","#ec4899","#14b8a6","#f59e0b","#10b981"];
const acColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

const typeConfig = {
  title:      { bar:"linear-gradient(90deg,#6366f1,#818cf8)", tag:"rgba(99,102,241,0.25)",  tagColor:"#a5b4fc", tagText:"Title Slide",   dot:"#6366f1", divider:"#6366f1" },
  overview:   { bar:"linear-gradient(90deg,#8b5cf6,#a78bfa)", tag:"rgba(139,92,246,0.25)", tagColor:"#c4b5fd", tagText:"Overview",      dot:"#8b5cf6", divider:"#8b5cf6" },
  content:    { bar:"linear-gradient(90deg,#14b8a6,#2dd4bf)", tag:"rgba(20,184,166,0.2)",   tagColor:"#5eead4", tagText:"Content",       dot:"#14b8a6", divider:"#14b8a6" },
  highlight:  { bar:"linear-gradient(90deg,#f59e0b,#fbbf24)", tag:"rgba(245,158,11,0.2)",   tagColor:"#fcd34d", tagText:"Key Highlight", dot:"#f59e0b", divider:"#f59e0b" },
  conclusion: { bar:"linear-gradient(90deg,#ec4899,#f9a8d4)", tag:"rgba(236,72,153,0.2)",   tagColor:"#f9a8d4", tagText:"Conclusion",    dot:"#ec4899", divider:"#ec4899" },
};

function extractTopic(summary) {
  if (!summary) return "General";
  const h1 = summary.match(/^# (.+)$/m);
  if (h1) return h1[1].replace(/\*\*/g,"").trim().slice(0,50);
  const h2 = summary.match(/^## (.+)$/m);
  if (h2) return h2[1].replace(/\*\*/g,"").trim().slice(0,50);
  const bold = summary.match(/\*\*(.+?)\*\*/);
  if (bold) return bold[1].trim().slice(0,50);
  const firstLine = summary.split("\n").find(l => l.trim().length > 5);
  if (!firstLine) return "General";
  return firstLine
    .replace(/[#*]/g, "")
    .replace(/^(this video|this content|in this video|in this tutorial|this tutorial|the video|the content)\s+(is\s+)?(about|explains?|covers?|discusses?|shows?|teaches?|tutorials? on|on how to|on)\s+/i, "")
    .trim()
    .slice(0, 50) || "General";
}

// ─── PPTX GENERATOR ────────────────────────────────────────────────────────────
async function generatePptxBlob(slides) {
  return new Promise((resolve, reject) => {
    if (window.PptxGenJS) { buildPptx(slides, resolve, reject); return; }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js";
    script.onload = () => buildPptx(slides, resolve, reject);
    script.onerror = () => reject(new Error("Failed to load PptxGenJS"));
    document.head.appendChild(script);
  });
}

function buildPptx(slides, resolve, reject) {
  try {
    const PptxGenJS = window.PptxGenJS;
    const pres = new PptxGenJS();
    pres.layout = "LAYOUT_16x9";
    pres.author = "NoteAI";
    pres.title = slides[0]?.title || "NoteAI Presentation";
    const PALETTE = {
      title:      { bg:"0f0c29", accent:"6366f1", accent2:"818cf8", tagText:"a5b4fc", tagBg:"1e1b4e" },
      overview:   { bg:"0a0a1a", accent:"8b5cf6", accent2:"a78bfa", tagText:"c4b5fd", tagBg:"1a0d40" },
      content:    { bg:"050510", accent:"14b8a6", accent2:"2dd4bf", tagText:"5eead4", tagBg:"0d2020" },
      highlight:  { bg:"0d0922", accent:"f59e0b", accent2:"fbbf24", tagText:"fcd34d", tagBg:"2a1a00" },
      conclusion: { bg:"0f0c29", accent:"ec4899", accent2:"f9a8d4", tagText:"f9a8d4", tagBg:"2d0d20" },
    };
    slides.forEach((slide, idx) => {
      const cfg = PALETTE[slide.type] || PALETTE.content;
      const s = pres.addSlide();
      s.background = { color: cfg.bg };
      s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:"100%", h:0.07, fill:{ color:cfg.accent }, line:{ color:cfg.accent, width:0 } });
      s.addShape(pres.shapes.OVAL, { x:8.2, y:-0.8, w:2.5, h:2.5, fill:{ color:cfg.accent, transparency:88 }, line:{ color:cfg.accent, width:0 } });
      s.addText(`${String(idx+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`, { x:8.5, y:0.18, w:1.3, h:0.25, fontSize:8, fontFace:"Trebuchet MS", bold:true, color:"4a4a7a", align:"right" });
      const bullets = slide.content ? slide.content.split("\n").map(l => l.replace(/^[•*-]\s*/,"").trim()).filter(Boolean) : [];
      const isTitle = slide.type === "title";
      const isConclusion = slide.type === "conclusion";
      const useGrid = bullets.length >= 4 && !isTitle && !isConclusion;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x:0.5, y:0.8, w:1.4, h:0.22, fill:{ color:cfg.tagBg }, line:{ color:cfg.accent, width:0.5 }, rectRadius:0.06 });
      const TAG_LABELS = { title:"TITLE SLIDE", overview:"OVERVIEW", content:"CONTENT", highlight:"KEY HIGHLIGHT", conclusion:"CONCLUSION" };
      s.addText(TAG_LABELS[slide.type] || "CONTENT", { x:0.5, y:0.8, w:1.4, h:0.22, fontSize:6.5, fontFace:"Trebuchet MS", bold:true, color:cfg.tagText, align:"center", valign:"middle", charSpacing:1.2 });
      if (isTitle) {
        s.addText(slide.title, { x:0.5, y:1.25, w:9, h:1.8, fontSize:36, fontFace:"Arial Black", bold:true, color:"FFFFFF", align:"left", valign:"middle" });
        s.addShape(pres.shapes.RECTANGLE, { x:0.5, y:3.15, w:0.5, h:0.04, fill:{ color:cfg.accent }, line:{ color:cfg.accent, width:0 } });
        if (bullets[0]) s.addText(bullets[0], { x:0.5, y:3.3, w:7, h:0.5, fontSize:14, fontFace:"Calibri", color:"9999cc", align:"left" });
        ["AI-Powered","Auto-Generated","NoteAI"].forEach((label,i) => {
          s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x:0.5+i*1.5, y:3.95, w:1.35, h:0.28, fill:{ color:"FFFFFF", transparency:90 }, line:{ color:"FFFFFF", width:0.5, transparency:75 }, rectRadius:0.07 });
          s.addText(label, { x:0.5+i*1.5, y:3.95, w:1.35, h:0.28, fontSize:8, fontFace:"Trebuchet MS", bold:true, color:"aaaacc", align:"center", valign:"middle" });
        });
      } else if (useGrid) {
        s.addText(slide.title, { x:0.5, y:1.2, w:9, h:0.85, fontSize:22, fontFace:"Arial Black", bold:true, color:"FFFFFF", align:"left", valign:"middle" });
        s.addShape(pres.shapes.RECTANGLE, { x:0.5, y:2.1, w:0.4, h:0.035, fill:{ color:cfg.accent }, line:{ color:cfg.accent, width:0 } });
        bullets.slice(0,4).forEach((b,i) => {
          const col=i%2, row=Math.floor(i/2);
          const gx=0.5+col*4.7, gy=2.25+row*1.45;
          s.addShape(pres.shapes.RECTANGLE, { x:gx, y:gy, w:4.4, h:1.3, fill:{ color:"FFFFFF", transparency:94 }, line:{ color:"FFFFFF", width:0.3, transparency:86 } });
          s.addText(`0${i+1}`, { x:gx+0.12, y:gy+0.1, w:0.5, h:0.22, fontSize:9, fontFace:"Trebuchet MS", bold:true, color:cfg.tagText });
          s.addText(b, { x:gx+0.12, y:gy+0.32, w:4.15, h:0.88, fontSize:10.5, fontFace:"Calibri", color:"ccccee", valign:"top", wrap:true });
        });
      } else if (isConclusion) {
        s.addText(slide.title, { x:0.5, y:1.2, w:9, h:0.85, fontSize:24, fontFace:"Arial Black", bold:true, color:"FFFFFF", align:"left", valign:"middle" });
        s.addShape(pres.shapes.RECTANGLE, { x:0.5, y:2.1, w:0.4, h:0.035, fill:{ color:cfg.accent }, line:{ color:cfg.accent, width:0 } });
        if (bullets.length > 0) {
          s.addText(bullets.slice(0,3).map((b,i) => ({ text:"→  "+b, options:{ breakLine:i < Math.min(bullets.length,3)-1 } })), { x:0.5, y:2.25, w:8.5, h:1.5, fontSize:12, fontFace:"Calibri", color:"ccccee", lineSpacingMultiple:1.4 });
        }
        s.addShape(pres.shapes.RECTANGLE, { x:0.5, y:4.0, w:2.2, h:0.4, fill:{ color:cfg.accent, transparency:85 }, line:{ color:cfg.accent, width:0.8 } });
        s.addText("Thank You", { x:0.5, y:4.0, w:2.2, h:0.4, fontSize:12, fontFace:"Arial Black", bold:true, color:cfg.tagText, align:"center", valign:"middle" });
      } else {
        s.addText(slide.title, { x:0.5, y:1.2, w:9, h:0.85, fontSize:22, fontFace:"Arial Black", bold:true, color:"FFFFFF", align:"left", valign:"middle" });
        s.addShape(pres.shapes.RECTANGLE, { x:0.5, y:2.1, w:0.4, h:0.035, fill:{ color:cfg.accent }, line:{ color:cfg.accent, width:0 } });
        bullets.slice(0,5).forEach((b,i) => {
          const by=2.25+i*0.58;
          s.addShape(pres.shapes.OVAL, { x:0.5, y:by+0.1, w:0.09, h:0.09, fill:{ color:cfg.accent }, line:{ color:cfg.accent, width:0 } });
          s.addText(b, { x:0.7, y:by, w:8.8, h:0.5, fontSize:12, fontFace:"Calibri", color:"ddddee", wrap:true, valign:"middle" });
        });
      }
      s.addShape(pres.shapes.RECTANGLE, { x:0, y:5.32, w:"100%", h:0.01, fill:{ color:"FFFFFF", transparency:92 }, line:{ color:"FFFFFF", width:0.2, transparency:85 } });
      s.addText("NoteAI", { x:0.4, y:5.34, w:1.5, h:0.2, fontSize:7, fontFace:"Trebuchet MS", bold:true, color:"44447a", charSpacing:1 });
      slides.forEach((_,di) => {
        const dotW = di===idx ? 0.22 : 0.14;
        s.addShape(pres.shapes.RECTANGLE, { x:9.5-slides.length*0.18+di*0.18, y:5.38, w:dotW, h:0.03, fill:{ color:di===idx ? cfg.accent : "333366" }, line:{ color:di===idx ? cfg.accent : "333366", width:0 } });
      });
    });
    pres.write({ outputType:"blob" }).then(blob => resolve(blob)).catch(reject);
  } catch (err) { reject(err); }
}

// ─── PDF GENERATOR ─────────────────────────────────────────────────────────────
async function generatePdfBlob(summary, source) {
  return new Promise((resolve, reject) => {
    if (window.jspdf) { buildPdf(summary, source, resolve, reject); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => buildPdf(summary, source, resolve, reject);
    script.onerror = () => reject(new Error("Failed to load jsPDF"));
    document.head.appendChild(script);
  });
}

function buildPdf(summary, source, resolve, reject) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 18, contentW = pageW - margin * 2;
    doc.setFillColor(99,102,241); doc.rect(0,0,pageW,18,"F");
    doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(14);
    doc.text("NoteAI",margin,12); doc.setFontSize(8); doc.setFont("helvetica","normal");
    doc.text("Smart Notes",margin+22,12); doc.setFontSize(7);
    doc.text(new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),pageW-margin,12,{align:"right"});
    let y = 28;
    if (source) {
      doc.setFillColor(239,246,255); doc.setDrawColor(99,102,241); doc.roundedRect(margin,y-4,contentW,9,2,2,"FD");
      doc.setTextColor(67,56,202); doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.text("SOURCE",margin+3,y+1);
      doc.setFont("helvetica","normal"); doc.setFontSize(7);
      const srcTrunc = source.length > 90 ? source.slice(0,87)+"..." : source;
      doc.setTextColor(30,27,75); doc.text(srcTrunc,margin+20,y+1); y += 14;
    }
    doc.setTextColor(15,12,41); doc.setFont("helvetica","bold"); doc.setFontSize(18); doc.text("Smart Notes",margin,y); y+=4;
    doc.setDrawColor(99,102,241); doc.setLineWidth(0.8); doc.line(margin,y,margin+30,y); y+=8;
    const lines = summary.split("\n");
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) { y+=3; continue; }
      if (y > pageH-30) { doc.addPage(); doc.setFillColor(99,102,241); doc.rect(0,0,pageW,8,"F"); y=16; }
      if (line.startsWith("# ")) {
        const text = line.replace(/^# /,"").replace(/\*\*/g,"");
        doc.setFont("helvetica","bold"); doc.setFontSize(14); doc.setTextColor(15,12,41);
        const wrapped = doc.splitTextToSize(text,contentW); doc.text(wrapped,margin,y); y+=wrapped.length*6+3;
        doc.setDrawColor(200,200,220); doc.setLineWidth(0.2); doc.line(margin,y,margin+contentW,y); y+=4;
      } else if (line.startsWith("## ")) {
        const text = line.replace(/^## /,"").replace(/\*\*/g,"");
        if (y > pageH-40) { doc.addPage(); doc.setFillColor(99,102,241); doc.rect(0,0,pageW,8,"F"); y=16; }
        doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.setTextColor(79,70,229);
        const wrapped = doc.splitTextToSize(text.toUpperCase(),contentW-5);
        doc.setFillColor(245,243,255); doc.rect(margin,y-3,contentW,wrapped.length*5+3,"F");
        doc.text(wrapped,margin+3,y+1); y+=wrapped.length*5+5;
      } else if (/^[*•-] /.test(line)) {
        const text = line.replace(/^[*•-] /,"").replace(/\*\*(.*?)\*\*/g,"$1");
        doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(30,27,75);
        const wrapped = doc.splitTextToSize(text,contentW-12);
        doc.setFillColor(99,102,241); doc.circle(margin+2,y-1,0.8,"F");
        doc.text(wrapped,margin+6,y); y+=wrapped.length*5+2;
      } else {
        const text = line.replace(/\*\*(.*?)\*\*/g,"$1");
        doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(30,27,75);
        const wrapped = doc.splitTextToSize(text,contentW); doc.text(wrapped,margin,y); y+=wrapped.length*5+2;
      }
    }
    doc.setFillColor(240,240,250); doc.rect(0,pageH-10,pageW,10,"F");
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(100,100,150);
    doc.text("Generated by NoteAI • Powered by Gemini AI",pageW/2,pageH-4,{align:"center"});
    resolve(doc.output("blob"));
  } catch (err) { reject(err); }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(() => DB.getSession());
  const [view, setView] = useState("home");
  const [adminSubView, setAdminSubView] = useState(null);
  const [summary, setSummary] = useState("");
  const [source, setSource] = useState("");
  const [pptSlides, setPptSlides] = useState(null);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("noteai-theme") || "dark"; } catch { return "dark"; } });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("noteai-theme", theme); } catch { /* localStorage may be blocked. */ }
  }, [theme]);

  const login = (user) => { DB.saveSession(user); setSession(user); setView("home"); };
  const logout = () => { DB.clearSession(); setSession(null); setView("home"); setSummary(""); setSource(""); setPptSlides(null); };

  const recordActivity = (uid) => {
    const today = new Date().toISOString().split("T")[0];
    const activity = DB.getActivity(uid);
    activity[today] = (activity[today] || 0) + 1;
    DB.saveActivity(uid, activity);
  };

  const saveToHistory = (uid, item) => {
    const hist = DB.getHistory(uid);
    hist.unshift({ ...item, id: Date.now(), date: new Date().toISOString() });
    DB.saveHistory(uid, hist.slice(0,50));
    const users = DB.getUsers();
    const idx = users.findIndex(u => u.id === uid);
    if (idx >= 0) { users[idx].analysisCount = (users[idx].analysisCount || 0) + 1; DB.saveUsers(users); }
    recordActivity(uid);
    const topic = item.source
      ? item.source
          .replace(/^https?:\/\/(www\.)?/i, "")
          .split(/[/?#]/)[0]
      : extractTopic(item.summary);
    const topics = DB.getTopics(uid);
    topics[topic] = (topics[topic] || 0) + 1;
    DB.saveTopics(uid, topics);
  };

  const saveQuizScore = (uid, score, total) => {
    const scores = DB.getQuizScores(uid);
    scores.push({ score, total, date: new Date().toISOString() });
    DB.saveQuizScores(uid, scores.slice(-100));
  };

  const recordChatMessage = (uid) => {
    const count = DB.getChatCount(uid) + 1;
    DB.saveChatCount(uid, count);
    const today = new Date().toISOString().split("T")[0];
    const daily = DB.getDailyChats(uid);
    daily[today] = (daily[today] || 0) + 1;
    DB.saveDailyChats(uid, daily);
  };

  return (
    <div style={{ position:"relative", minHeight:"100vh", width:"100%" }}>
      <style dangerouslySetInnerHTML={{ __html: FONTS + CSS }} />
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-glow2" />
      <div className="app-wrap">
        <nav className="nav">
          <div className="nav-brand" onClick={() => session && setView("home")}>Note<em>AI</em></div>
          <div className="nav-right">
            {session ? (
              <>
                <button className={`nav-link ${view==="home"?"active":""}`} onClick={() => setView("home")}>✨ Analyze</button>
                <button className={`nav-link ${view==="history"?"active":""}`} onClick={() => setView("history")}>📋 History</button>
                <button className={`nav-link ${view==="performance"?"active":""}`} onClick={() => setView("performance")}>📊 Progress</button>
                {session.role === "admin" && (
                  <button className={`nav-link ${view==="admin"?"active":""}`} onClick={() => setView("admin")}>⚙️ Admin</button>
                )}
                <button className="theme-toggle-btn" onClick={() => setTheme(t => t==="dark"?"light":"dark")}>
                  {theme==="dark"?"☀️":"🌙"}
                </button>
                <div className="avatar-circle" title={`${session.username} — click to log out`} onClick={logout}
                  style={{ background: acColor(session.username) }}>
                  {session.username[0].toUpperCase()}
                </div>
              </>
            ) : (
              <>
                <div className="powered-badge"><div className="powered-dot" />Gemini AI</div>
                <button className="theme-toggle-btn" onClick={() => setTheme(t => t==="dark"?"light":"dark")}>
                  {theme==="dark"?"☀️":"🌙"}
                </button>
              </>
            )}
          </div>
        </nav>

        {!session && <AuthPage onLogin={login} />}
        {session && (
          <div className="main-content">
            {view==="home" && (
              <HomeView session={session} onResult={(sum,src) => {
                setSummary(sum); setSource(src);
                saveToHistory(session.id, { summary:sum, source:src });
                setView("results");
              }} />
            )}
            {view==="results" && (
              <ResultsView summary={summary} source={source}
                onBack={() => setView("home")}
                onQuiz={() => setView("quiz")}
                onScenario={() => setView("scenario")}
                onChat={() => setView("chat")}
                onPptReady={(slides) => { setPptSlides(slides); setView("ppt"); }} />
            )}
            {view==="quiz" && (
              <QuizView summary={summary} onBack={() => setView("results")}
                onFinish={(score,total) => saveQuizScore(session.id, score, total)} />
            )}
            {view==="scenario" && (
              <ScenarioQuizView summary={summary} onBack={() => setView("results")} />
            )}
            {view==="chat" && (
              <ChatbotView summary={summary} onBack={() => setView("results")}
                onMessage={() => recordChatMessage(session.id)} />
            )}
            {view==="ppt" && pptSlides && (
              <PptEditorPage slides={pptSlides} setSlides={setPptSlides} onBack={() => setView("results")} summary={summary} />
            )}
            {view==="history" && (
              <HistoryPage session={session} onViewItem={(item) => { setSummary(item.summary); setSource(item.source); setView("results"); }} />
            )}
            {view==="performance" && (
              <PerformancePage session={session} />
            )}
            {view==="admin" && session.role==="admin" && (
              <AdminPage onViewUserHistory={(uid,uname) => { setAdminSubView({uid,uname}); setView("admin-history"); }} />
            )}
            {view==="admin-history" && adminSubView && (
              <AdminUserHistory uid={adminSubView.uid} uname={adminSubView.uname} onBack={() => setView("admin")} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AUTH PAGE ─────────────────────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = () => {
    setError("");
    const users = DB.getUsers();
    const user = users.find(u => (u.email===form.email || u.username===form.email) && u.password===form.password);
    if (!user) { setError("Invalid email/username or password."); return; }
    onLogin(user);
  };

  const handleSignup = () => {
    setError("");
    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) { setError("All fields are required."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const users = DB.getUsers();
    if (users.find(u => u.email===form.email)) { setError("Email already registered."); return; }
    const newUser = { id:"user-"+Date.now(), username:form.username.trim(), email:form.email.trim(), password:form.password, role:"user", joined:new Date().toISOString(), analysisCount:0 };
    DB.saveUsers([...users, newUser]);
    setSuccess("Account created! You can now log in.");
    setTab("login"); setForm({ username:"", email:newUser.email, password:"" });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-text">Note<em>AI</em></div>
          <div className="auth-tagline">Turn any content into smart notes & quizzes</div>
        </div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab==="login"?"active":""}`} onClick={() => { setTab("login"); setError(""); setSuccess(""); }}>Log In</button>
          <button className={`auth-tab ${tab==="signup"?"active":""}`} onClick={() => { setTab("signup"); setError(""); setSuccess(""); }}>Sign Up</button>
        </div>
        {error && <div className="auth-error">⚠️ {error}</div>}
        {success && <div className="auth-success">✅ {success}</div>}
        {tab==="login" ? (
          <>
            <div className="form-group"><label className="form-label">Email or Username</label>
              <input className="form-input" type="text" placeholder="admin@noteai.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} onKeyDown={e => e.key==="Enter" && handleLogin()} /></div>
            <div className="form-group"><label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form,password:e.target.value})} onKeyDown={e => e.key==="Enter" && handleLogin()} /></div>
            <button className="auth-btn" onClick={handleLogin}>Log In →</button>
            <div className="admin-hint">Demo admin: admin@noteai.com / admin123</div>
          </>
        ) : (
          <>
            <div className="form-group"><label className="form-label">Username</label>
              <input className="form-input" type="text" placeholder="Your name" value={form.username} onChange={e => setForm({...form,username:e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({...form,password:e.target.value})} /></div>
            <button className="auth-btn" onClick={handleSignup}>Create Account →</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── HOME VIEW ─────────────────────────────────────────────────────────────────
function HomeView({ session, onResult }) {
  const [tab, setTab] = useState("link");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (tab==="link" && !url.trim()) { setError("Please paste a URL first."); return; }
    if (tab==="upload" && !file) { setError("Please select a video file."); return; }
    setLoading(true); setError("");
    const src = tab==="link" ? url.trim() : file.name;
    const fd = new FormData();
    let endpoint = "http://127.0.0.1:8000/api/summarize";
    if (tab==="link") { fd.append("url",url.trim()); endpoint="http://127.0.0.1:8000/api/summarize-link"; }
    else { fd.append("file",file); }
    try {
      const res = await fetch(endpoint, { method:"POST", body:fd, headers:{ Accept:"application/json" } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server error.");
      onResult(data.summary, src);
    } catch (e) {
      console.warn("Backend unavailable, using fallback.", e.message);
      setTimeout(() => {
        const fallback = `# AI Content Summary\n\n## Overview\nThis content provides a comprehensive look at key topics relevant to the subject matter. The analysis covers main themes, supporting points, and actionable conclusions.\n\n## Key Topics\n- **Core Concept 1:** Foundation principles underpinning the main subject\n- **Core Concept 2:** Contextual analysis and supporting frameworks\n- **Core Concept 3:** Practical applications and real-world implications\n- **Core Concept 4:** Future outlook and emerging trends\n\n## Main Takeaways\n- Understanding the subject requires examining multiple perspectives simultaneously\n- Key metrics and data points reinforce the central thesis effectively\n- Implementation strategies should be adapted to specific contexts\n- Continuous iteration leads to the most impactful outcomes\n\n## Conclusion\nThis content delivers clear, structured insights that can be applied immediately. The knowledge extracted here provides a strong foundation for further exploration and practical application.`;
        onResult(fallback, src);
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="hero">
      <div style={{ maxWidth:680, width:"100%", textAlign:"center" }}>
        <div className="hero-badge"><div className="hero-badge-dot" />Universal Content Analyzer</div>
        <h1 className="hero-title">Turn Any Content Into<br /><span className="grad1">Smart Notes</span> & <span className="grad2">Quiz</span></h1>
        <p className="hero-sub">Paste a video link or upload a file — NoteAI transcribes, summarizes, and builds quiz questions in seconds. Welcome back, <strong>{session.username}</strong>!</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center", marginBottom:20 }}>
          {PLATFORMS.map(p => (
            <div key={p.label} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:20, border:"1px solid var(--pill-border)", background:"var(--pill-bg)", fontSize:11, fontWeight:500, color:"var(--pill-text)" }}>
              <span>{p.icon}</span> {p.label}
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-overlay">
          <div className="spinner" />
          <div className="loading-title">Analyzing content…</div>
          <div className="loading-sub">Extracting context & building your notes</div>
        </div>
      ) : (
        <div className="input-card">
          <div className="tab-row">
            <button className={`tab-btn ${tab==="link"?"active":""}`} onClick={() => setTab("link")}>🔗 Paste URL</button>
            <button className={`tab-btn ${tab==="upload"?"active":""}`} onClick={() => setTab("upload")}>📁 Upload Video</button>
          </div>
          {tab==="link" ? (
            <>
              <div className="input-label">Content Link Source</div>
              <div className="url-wrap">
                <span className="url-icon">🔗</span>
                <input className="url-input" type="url" placeholder="https://youtube.com/watch?v=..." value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key==="Enter" && handleAnalyze()} />
              </div>
              <div className="tag-row">{TAGS.map(t => <span key={t} className="tag">{t}</span>)}</div>
            </>
          ) : (
            <div className="drop-zone">
              <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
              {file ? (<><span className="dz-icon">✅</span><div className="dz-txt">{file.name}</div></>) : (<><span className="dz-icon">🎬</span><div className="dz-txt">Click or drag video file</div><div className="dz-sub">MP4 · MOV · WEBM</div></>)}
            </div>
          )}
          {error && <div className="error-box">⚠️ {error}</div>}
          <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>✨ Analyze &amp; Generate Notes</button>
        </div>
      )}

      <div className="marketing-section">
        <hr style={{ border:"0", height:"1px", background:"var(--m-divider)", marginBottom:"40px" }} />
        <div className="m-illus-banner">
          <div>
            <div className="m-illus-eyebrow">✦ Powered by Gemini AI</div>
            <div className="m-illus-heading">From video to knowledge in seconds</div>
            <div className="m-illus-body">NoteAI transcribes, summarizes, and creates quiz-ready notes from any video content — no manual effort required.</div>
            <div className="m-banner-points">
              {[["⏱️","Automatic Time-Stamping","Jump directly to critical video chapters without scrubbing through hours of timelines manually."],["🧠","Core Concept Extraction","AI flags complex terminology, data metrics, and technical definitions instantly as you process."],["🃏","Interactive Flashcard Arrays","Convert blocks of summary descriptions into retention checkpoints to optimize your memory loop."]].map(([b,h,d]) => (
                <div key={h} className="m-point-item"><span className="m-point-bullet">{b}</span><div className="m-point-text"><strong>{h}</strong><p>{d}</p></div></div>
              ))}
            </div>
          </div>
        </div>
        <div className="m-eyebrow-wrap"><div className="m-eyebrow"><div className="m-eyebrow-dot" />What it does</div></div>
        <h2 className="m-title">Three tools. <span style={{ background:"linear-gradient(135deg,#6366f1,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>One workflow.</span></h2>
        <p className="m-sub">Paste a link, get structured notes and quiz questions — ready to study from, instantly.</p>
        <div className="m-grid">
          {[{accent:"linear-gradient(90deg,#6366f1,#8b5cf6)",iconBg:"rgba(99,102,241,0.1)",icon:"🎙️",title:"Smart Transcription",desc:"Converts spoken audio to clean, readable text — with or without native subtitles."},{accent:"linear-gradient(90deg,#8b5cf6,#ec4899)",iconBg:"rgba(139,92,246,0.1)",icon:"📝",title:"AI Summarization",desc:"Distills hour-long videos into structured, scannable notes with key takeaways highlighted."},{accent:"linear-gradient(90deg,#ec4899,#f43f5e)",iconBg:"rgba(236,72,153,0.1)",icon:"🌐",title:"Multilingual Support",desc:"Handles subtitles across 30+ languages and converts them into English notes in a single click."}].map(f => (
            <div key={f.title} className="m-card"><div className="m-card-accent" style={{ background:f.accent }} /><div className="m-card-icon-wrap" style={{ background:f.iconBg }}>{f.icon}</div><div className="m-card-title">{f.title}</div><div className="m-card-desc">{f.desc}</div></div>
          ))}
        </div>
        <div className="steps-section">
          <h2 className="m-title" style={{ marginBottom:24 }}>How it works</h2>
          {[{n:1,title:"Drop your link or file",desc:"Paste any YouTube, TikTok, Instagram or web URL — or upload an MP4 / MOV file directly.",tag:"2 seconds",conn:true},{n:2,title:"AI extracts and analyzes",desc:"NoteAI fetches the transcript, runs it through Gemini AI, and structures the content into clean notes.",tag:"~15 seconds",conn:true},{n:3,title:"Review, quiz, export & chat",desc:"Read your smart notes, take an AI-generated quiz, tackle scenario questions, chat with AI, or export a PDF / PowerPoint.",tag:"Instant",conn:false}].map(s => (
            <div key={s.n} className="step-item"><div className="step-left"><div className="step-num">{s.n}</div>{s.conn && <div className="step-connector" />}</div><div className="step-content"><div className="step-title">{s.title}</div><div className="step-desc">{s.desc}</div><div className="step-tag">{s.tag}</div></div></div>
          ))}
        </div>
        <div className="roles-section">
          <h2 className="m-title" style={{ marginBottom:24 }}>Made for every kind of learner</h2>
          <div className="roles-grid">
            <div className="role-card"><div className="role-header"><span className="role-icon">🎓</span><div className="role-name">Students</div></div><div className="role-desc">Turn lecture recordings into condensed revision notes.</div><span className="role-pill blue">Study smarter</span></div>
            <div className="role-card violet-l"><div className="role-header"><span className="role-icon">💼</span><div className="role-name">Professionals</div></div><div className="role-desc">Extract action items from recorded meetings without tedious note-taking.</div><span className="role-pill violet">Save hours</span></div>
            <div className="role-card rose-l"><div className="role-header"><span className="role-icon">🔬</span><div className="role-name">Researchers</div></div><div className="role-desc">Catalog and skim video sources without manually seeking through timelines.</div><span className="role-pill pink">Stay organized</span></div>
          </div>
        </div>
        <div className="m-stat-strip">
          {[{val:"1000+",label:"Sites supported"},{val:"~15s",label:"Average speed"},{val:"30+",label:"Languages"},{val:"Free",label:"To get started"}].map(s => (
            <div key={s.label} className="m-stat-cell"><div className="m-stat-val">{s.val}</div><div className="m-stat-label">{s.label}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS VIEW ───────────────────────────────────────────────────────────────
function ResultsView({ summary, source, onBack, onQuiz, onScenario, onChat, onPptReady }) {
  const [copied, setCopied] = useState(false);
  const [showPptModal, setShowPptModal] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const downloadTxt = () => {
    const b = new Blob([summary], { type:"text/plain" });
    const a = document.createElement("a"); a.href=URL.createObjectURL(b); a.download="notes.txt"; a.click();
  };

  const downloadPdf = async () => {
    setPdfLoading(true);
    try { const blob = await generatePdfBlob(summary, source); downloadBlob(blob,"noteai-notes.pdf"); }
    catch (e) { alert("PDF generation failed: "+e.message); }
    setPdfLoading(false);
  };

  if (!summary) return (
    <div className="results-page" style={{ textAlign:"center", paddingTop:60 }}>
      <div style={{ fontSize:"2rem" }}>📋</div>
      <p style={{ marginTop:8, fontSize:13 }}>Analyze a content source first.</p>
      <button className="back-btn" style={{ margin:"12px auto 0" }} onClick={onBack}>← Go back</button>
    </div>
  );

  return (
    <div className="results-page">
      <div className="results-header">
        <h1 className="results-title">📋 Smart Notes</h1>
        <button className="back-btn" onClick={onBack}>← Analyze Another</button>
      </div>
      {source && <div className="source-chip">🔗 <span className="source-chip-text">{source}</span></div>}
      <div className="action-row">
        <button className={`act-btn ${copied?"copied":""}`} onClick={() => { navigator.clipboard.writeText(summary); setCopied(true); setTimeout(()=>setCopied(false),2000); }}>
          {copied ? "✓ Copied!" : "⎘ Copy"}
        </button>
        <button className="act-btn" onClick={downloadTxt}>↓ .txt</button>
        <button className="act-btn pdf-btn" onClick={downloadPdf} disabled={pdfLoading}>
          {pdfLoading ? "⏳ Generating…" : "📄 Download PDF"}
        </button>
        <button className="act-btn ppt-btn" onClick={() => setShowPptModal(true)}>🎯 Create Presentation</button>
        <button className="act-btn chat-btn" onClick={onChat}>💬 Ask AI About This</button>
      </div>
      <div className="summary-card">
        <div className="md" dangerouslySetInnerHTML={{ __html: renderMd(summary) }} />
      </div>

      {/* Multiple choice quiz CTA */}
      <div className="quiz-cta">
        <div>
          <div className="qcta-title">🎯 Multiple Choice Quiz</div>
          <div className="qcta-sub">Test your understanding with 5 AI-generated questions.</div>
        </div>
        <button className="quiz-cta-btn" onClick={onQuiz}>Start Quiz →</button>
      </div>

      {/* Scenario & Descriptive Questions CTA */}
      <div className="scenario-cta">
        <div>
          <div className="qcta-title">🧠 Scenario &amp; Descriptive Questions</div>
          <div className="qcta-sub">6 in-depth questions — real-world scenarios + analytical answers, evaluated by AI.</div>
        </div>
        <button className="scenario-cta-btn" onClick={onScenario}>Try Deep Questions →</button>
      </div>

      {showPptModal && <PptModal summary={summary} onClose={() => setShowPptModal(false)} onReady={(slides) => { setShowPptModal(false); onPptReady(slides); }} />}
    </div>
  );
}

// ─── PPT MODAL ─────────────────────────────────────────────────────────────────
function PptModal({ summary, onClose, onReady }) {
  const [count, setCount] = useState(6);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");

  const generate = async () => {
    if (count < 2 || count > 20) return;
    setGenerating(true); setProgress(10); setStatusMsg("Structuring content…");
    try {
      const fd = new FormData();
      fd.append("summary_text", summary);
      fd.append("slide_count", String(count));
      let slides;
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate-ppt", { method:"POST", body:fd, headers:{ Accept:"application/json" } });
        if (!res.ok) throw new Error("PPT endpoint failed");
        const data = await res.json();
        slides = data.slides;
      } catch {
        setProgress(50); setStatusMsg("Generating slides from summary…");
        const lines = summary.split("\n").filter(l => l.trim());
        const types = ["title","overview","content","content","highlight","conclusion"];
        const slideSize = Math.ceil(lines.length / count);
        slides = Array.from({ length:count }, (_,i) => {
          const chunk = lines.slice(i*slideSize,(i+1)*slideSize);
          const title = chunk.find(l => l.startsWith("#"))?.replace(/^#+\s*/,"") || (i===0 ? "Presentation Title" : `Topic ${i+1}`);
          const bullets = chunk.filter(l => !l.startsWith("#")).slice(0,5).map(l => l.replace(/^[*•-]\s*/,"").replace(/\*\*/g,"").trim()).filter(Boolean);
          return { title, content:bullets.join("\n") || "Key insight from this section", type:types[Math.min(i,types.length-1)] };
        });
      }
      setProgress(100); setStatusMsg("Done!");
      setTimeout(() => onReady(slides), 400);
    } catch { setGenerating(false); setProgress(0); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-title">🎯 Create Presentation</div>
        <div className="modal-sub">AI will generate professional slides from your summary content.</div>
        {!generating ? (
          <>
            <div style={{ marginBottom:20 }}>
              <label className="form-label" style={{ display:"block", marginBottom:10 }}>How many slides? (2–20)</label>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <input className="slide-count-input" type="number" min="2" max="20" value={count} onChange={e => setCount(parseInt(e.target.value)||6)} />
                <span style={{ fontSize:13, color:"var(--text-muted)" }}>slides</span>
                <div style={{ display:"flex", gap:6, marginLeft:"auto" }}>
                  {[4,6,8,10].map(n => (
                    <button key={n} onClick={() => setCount(n)} style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${count===n?"var(--blue)":"var(--border)"}`, background:count===n?"rgba(99,102,241,0.15)":"transparent", color:count===n?"#a5b4fc":"var(--text-muted)", fontSize:12, cursor:"pointer" }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-btns">
              <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
              <button className="modal-btn primary" onClick={generate}>✨ Generate {count} Slides</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div className="spinner" />
            <div style={{ fontFamily:"var(--ff2)", fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:4 }}>Building your presentation…</div>
            <div className="ppt-progress-bar"><div className="ppt-progress-fill" style={{ width:`${progress}%` }} /></div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>{statusMsg}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SLIDE PREVIEW ──────────────────────────────────────────────────────────────
function SlidePreview({ slide, index, total }) {
  const cfg = typeConfig[slide.type] || typeConfig.content;
  const bullets = slide.content ? slide.content.split("\n").filter(l=>l.trim()).map(l=>l.replace(/^[•*-]\s*/,"").trim()).filter(Boolean) : [];
  const isTitle = slide.type === "title";
  const isConclusion = slide.type === "conclusion";
  const useGrid = bullets.length >= 4 && !isTitle && !isConclusion;

  return (
    <div className="slide-canvas-wrap">
      <div className={`slide-canvas type-${slide.type}`}>
        <div className="slide-corner-decoration" style={{ background:cfg.dot, top:-30, right:-30 }} />
        <div className="slide-corner-decoration" style={{ background:cfg.dot, bottom:-40, left:-20, width:80, height:80 }} />
        <div className="slide-top-bar" style={{ background:cfg.bar }} />
        <div className="slide-num-badge">{String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>
        <div className="slide-body">
          <div className="slide-tag" style={{ background:cfg.tag, color:cfg.tagColor }}>{cfg.tagText}</div>
          {isTitle ? (
            <>
              <div className="slide-main-title large">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              {bullets[0] && <div className="slide-subtitle">{bullets[0]}</div>}
              <div style={{ display:"flex", gap:8, marginTop:16, flexWrap:"wrap" }}>
                {["AI-Powered","Auto-Generated","NoteAI"].map(l => (
                  <span key={l} style={{ padding:"4px 12px", borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", fontSize:"clamp(8px,1.4vw,11px)", color:"rgba(255,255,255,0.7)", fontFamily:"var(--ff2)", fontWeight:600 }}>{l}</span>
                ))}
              </div>
            </>
          ) : isConclusion ? (
            <>
              <div className="slide-main-title">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              {bullets.length > 0 && (
                <ul className="slide-bullets">
                  {bullets.slice(0,3).map((b,i) => (
                    <li key={i} className="slide-bullet-item"><div className="slide-bullet-dot" style={{ background:cfg.dot }} /><span className="slide-bullet-text">{b}</span></li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop:20, padding:"10px 16px", borderRadius:8, background:"rgba(255,255,255,0.06)", border:`1px solid ${cfg.dot}40`, display:"inline-block" }}>
                <span style={{ fontFamily:"var(--ff2)", fontSize:"clamp(10px,1.8vw,14px)", color:cfg.tagColor, fontWeight:700 }}>Thank You</span>
              </div>
            </>
          ) : useGrid ? (
            <>
              <div className="slide-main-title">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              <div className="slide-grid-2col">
                {bullets.slice(0,4).map((b,i) => (
                  <div key={i} className="slide-grid-card">
                    <div className="slide-grid-card-title" style={{ color:cfg.tagColor }}>0{i+1}</div>
                    <div className="slide-grid-card-text">{b}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="slide-main-title">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              <ul className="slide-bullets">
                {bullets.slice(0,5).map((b,i) => (
                  <li key={i} className="slide-bullet-item"><div className="slide-bullet-dot" style={{ background:cfg.dot }} /><span className="slide-bullet-text">{b}</span></li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="slide-footer">
          <div className="slide-footer-brand">NoteAI</div>
          <div className="slide-footer-progress">
            {Array.from({ length:total }).map((_,i) => (
              <div key={i} className="slide-footer-dot" style={{ background:i===index ? cfg.dot : "rgba(255,255,255,0.2)", width:i===index ? 24 : 16 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PPT EDITOR ─────────────────────────────────────────────────────────────────
function PptEditorPage({ slides, setSlides, onBack, summary }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showPptModal, setShowPptModal] = useState(false);
  const [exportMsg, setExportMsg] = useState("");
  const [pptxLoading, setPptxLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const updateSlide = (field,value) => setSlides(slides.map((s,i) => i===activeIdx ? {...s,[field]:value} : s));
  const addSlide = () => {
    const next = [...slides, { title:"New Slide", content:"Key point one\nKey point two\nKey point three", type:"content" }];
    setSlides(next); setActiveIdx(next.length-1);
  };
  const deleteSlide = (i) => {
    if (slides.length <= 1) return;
    const next = slides.filter((_,idx) => idx!==i);
    setSlides(next); setActiveIdx(Math.min(activeIdx,next.length-1));
  };

  const exportPptx = async () => {
    setPptxLoading(true); setExportMsg("");
    try { const blob = await generatePptxBlob(slides); downloadBlob(blob,"noteai-presentation.pptx"); setExportMsg("✅ PowerPoint downloaded!"); }
    catch (e) { setExportMsg("⚠️ PPTX export failed: "+e.message); }
    setPptxLoading(false); setTimeout(() => setExportMsg(""), 6000);
  };

  const exportPdf = async () => {
    setPdfLoading(true); setExportMsg("");
    try {
      const slideText = slides.map((s,i) => `# Slide ${i+1}: ${s.title}\n\n${s.content||""}`).join("\n\n---\n\n");
      const blob = await generatePdfBlob(slideText, `Presentation — ${slides.length} slides`);
      downloadBlob(blob,"noteai-presentation.pdf"); setExportMsg("✅ PDF downloaded!");
    } catch (e) { setExportMsg("⚠️ PDF export failed: "+e.message); }
    setPdfLoading(false); setTimeout(() => setExportMsg(""), 4000);
  };

  const active = slides[activeIdx] || slides[0];
  const cfg = typeConfig[active?.type] || typeConfig.content;

  return (
    <div className="ppt-editor-page">
      <div className="ppt-header">
        <h1 className="ppt-title-h">🎨 Presentation Editor</h1>
        <div className="ppt-toolbar">
          <button className="toolbar-btn" onClick={onBack}>← Back</button>
          <button className="toolbar-btn" onClick={() => setShowPptModal(true)}>🔄 Regenerate</button>
          <button className="toolbar-btn" onClick={exportPdf} disabled={pdfLoading} style={{ background:"linear-gradient(135deg,rgba(225,29,72,0.15),rgba(239,68,68,0.1))", borderColor:"rgba(225,29,72,0.4)", color:"#fca5a5" }}>
            {pdfLoading ? "⏳ PDF…" : "📄 Export PDF"}
          </button>
          <button className="toolbar-btn primary" onClick={exportPptx} disabled={pptxLoading}>
            {pptxLoading ? "⏳ Building…" : "⬇ Export .pptx"}
          </button>
        </div>
      </div>
      {exportMsg && <div className={exportMsg.startsWith("⚠️") ? "auth-error" : "auth-success"} style={{ marginBottom:14 }}>{exportMsg}</div>}
      <div className="slides-list">
        {slides.map((s,i) => {
          const c = typeConfig[s.type] || typeConfig.content;
          return (
            <div key={i} className={`slide-thumb ${activeIdx===i?"active":""}`} onClick={() => setActiveIdx(i)}>
              <div className="slide-thumb-num" style={{ color:c.dot }}>Slide {i+1} · {s.type}</div>
              <div className="slide-thumb-preview"><strong>{s.title}</strong><br />{s.content?.split("\n")[0]}</div>
            </div>
          );
        })}
        <div className="slide-thumb" style={{ display:"flex", alignItems:"center", justifyContent:"center", minWidth:80 }} onClick={addSlide}>
          <span style={{ fontSize:20, color:"#a5b4fc" }}>＋</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:20, alignItems:"start" }}>
        <div className="slide-editor">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div className="slide-editor-label">Slide {activeIdx+1} of {slides.length}</div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <select value={active.type} onChange={e => updateSlide("type",e.target.value)}
                style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", borderRadius:7, padding:"4px 10px", color:cfg.dot, fontSize:12, cursor:"pointer", outline:"none" }}>
                {["title","overview","content","highlight","conclusion"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {slides.length > 1 && (
                <button onClick={() => deleteSlide(activeIdx)} style={{ padding:"4px 10px", borderRadius:7, border:"1px solid var(--danger-border)", background:"var(--danger-bg)", color:"#fb7185", fontSize:12, cursor:"pointer" }}>🗑</button>
              )}
            </div>
          </div>
          <div className="slide-editor-label">Slide Title</div>
          <input className="slide-title-input" type="text" value={active.title} onChange={e => updateSlide("title",e.target.value)} placeholder="Slide title…" />
          <div className="slide-editor-label">Content (one point per line)</div>
          <textarea className="slide-content-input" value={active.content} onChange={e => updateSlide("content",e.target.value)} placeholder={"Point one\nPoint two\nPoint three"} />
          <div style={{ marginTop:12, padding:"10px 12px", borderRadius:9, background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.15)", fontSize:11, color:"var(--text-muted)" }}>
            💡 <strong style={{ color:"var(--text)" }}>Tip:</strong> 4+ bullet points auto-layout as a 2×2 grid card view.
          </div>
        </div>
        <div>
          <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:8, fontWeight:600, textTransform:"uppercase", letterSpacing:".04em" }}>Live Preview — 16:9</div>
          <SlidePreview slide={active} index={activeIdx} total={slides.length} />
        </div>
      </div>
      {showPptModal && (
        <PptModal summary={summary} onClose={() => setShowPptModal(false)}
          onReady={(newSlides) => { setSlides(newSlides); setActiveIdx(0); setShowPptModal(false); }} />
      )}
    </div>
  );
}

// ─── SCENARIO / DESCRIPTIVE QUIZ VIEW ──────────────────────────────────────────
function ScenarioQuizView({ summary, onBack }) {
  const [phase, setPhase] = useState("loading"); // loading | answering | done
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});         // { idx: string }
  const [feedbacks, setFeedbacks] = useState({});     // { idx: feedbackObj }
  const [evaluating, setEvaluating] = useState(false);
  const [showSample, setShowSample] = useState({});   // { idx: bool }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate-scenario-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ summary_text: summary }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to generate questions");
        setQuestions(data.questions || []);
        setPhase("answering");
      } catch {
        // Fallback questions
        setQuestions([
          { questionNumber:1, type:"scenario", question:"You are a project manager and your team is struggling to apply these concepts. How would you guide them?", context:"Your team has just learned about the core topics in this content but is unsure how to practically implement them in an ongoing project.", sampleAnswer:"I would first assess which specific concepts are unclear, then organize a focused workshop breaking down each concept with real examples from our project context. I'd create action items tied directly to our current tasks, assign mentors for follow-up, and set checkpoints to measure understanding over the next two weeks.", evaluationCriteria:["Identifies root cause of confusion","Proposes concrete steps","Considers follow-up and accountability","Ties back to practical application"] },
          { questionNumber:2, type:"descriptive", question:"Explain the most important concept from this content and why it matters.", context:"", sampleAnswer:"The most important concept is the central theme discussed throughout the material. It matters because it directly influences outcomes in real-world contexts, provides a framework for decision-making, and builds on foundational knowledge that learners need to progress. Understanding it deeply allows practitioners to apply it flexibly across different situations.", evaluationCriteria:["Clearly identifies the concept","Explains the significance","Connects to real-world application","Demonstrates depth of understanding"] },
          { questionNumber:3, type:"scenario", question:"A stakeholder challenges the approach described in this content. How would you defend or critique it?", context:"In a meeting, a senior stakeholder argues that the methods described are outdated and should be replaced with a newer approach they read about.", sampleAnswer:"I would acknowledge the stakeholder's perspective respectfully, then present evidence from the content that supports the current approach, including its proven effectiveness, implementation maturity, and fit for our specific context. I'd also explore what the newer approach offers and propose a structured comparison or pilot to evaluate both objectively rather than dismissing either perspective.", evaluationCriteria:["Shows balanced critical thinking","Uses evidence from the content","Proposes constructive resolution","Demonstrates communication skill"] },
          { questionNumber:4, type:"descriptive", question:"Compare and contrast two key ideas presented in this content.", context:"", sampleAnswer:"Two key ideas from the content are related but distinct in their focus and application. The first idea emphasizes foundational principles and systematic thinking, while the second focuses on adaptive implementation and contextual flexibility. Together they form a complementary framework where the first provides structure and the second enables practical agility. Understanding both helps practitioners avoid being too rigid or too chaotic in their approach.", evaluationCriteria:["Identifies two distinct ideas","Explains similarities","Explains differences","Shows how they relate to each other"] },
          { questionNumber:5, type:"scenario", question:"What would happen if the key principles from this content were ignored?", context:"An organization decides to skip implementing the core recommendations from this content due to time and budget pressures.", sampleAnswer:"Ignoring the key principles would likely lead to short-term efficiency but long-term problems. Without the foundational framework, teams would make inconsistent decisions, accumulate technical or process debt, and face increasing difficulty scaling. The lack of structure would result in rework, communication breakdowns, and reduced quality. Ultimately, the organization would spend more time and money correcting avoidable mistakes than the initial investment would have cost.", evaluationCriteria:["Identifies short vs long-term consequences","Shows causal reasoning","Provides specific impacts","Demonstrates understanding of content's value"] },
          { questionNumber:6, type:"descriptive", question:"How would you apply the knowledge from this content in your own field or role?", context:"", sampleAnswer:"I would apply this knowledge by first identifying where the core concepts map to existing challenges in my role. I would create a prioritized list of improvements grounded in the content's frameworks, then pilot changes in a low-risk area before broader rollout. I would document outcomes, gather feedback from stakeholders, and iterate. This approach ensures the knowledge is translated into measurable impact rather than remaining theoretical.", evaluationCriteria:["Personalizes to specific role","Shows structured implementation thinking","Mentions feedback and iteration","Connects knowledge to measurable outcomes"] },
        ]);
        setPhase("answering");
      }
    };
    fetchQuestions();
  }, [summary]);

  const currentQ = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(feedbacks).length;

  const handleSubmitAnswer = async () => {
    const answer = (answers[currentIdx] || "").trim();
    if (!answer) return;
    setEvaluating(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQ.question,
          context: currentQ.context || "",
          sampleAnswer: currentQ.sampleAnswer,
          evaluationCriteria: currentQ.evaluationCriteria,
          userAnswer: answer,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Evaluation failed");
      setFeedbacks(prev => ({ ...prev, [currentIdx]: data.feedback }));
    } catch {
      // Fallback evaluation
      const wordCount = answer.split(/\s+/).filter(Boolean).length;
      const score = Math.min(10, Math.max(1, Math.round(wordCount / 10)));
      const grade = score >= 8 ? "Excellent" : score >= 6 ? "Good" : score >= 4 ? "Satisfactory" : "Needs Improvement";
      setFeedbacks(prev => ({ ...prev, [currentIdx]: {
        score, grade,
        strengths: ["Shows attempt to engage with the question", "Provides some relevant information"],
        improvements: ["Add more specific details and examples", "Connect your answer more directly to the key concepts"],
        detailedFeedback: "Your answer demonstrates basic understanding of the topic. To improve, try to be more specific and provide concrete examples that illustrate the concepts. Make sure to address all parts of the question and connect your response to the core ideas from the content."
      }}));
    }
    setEvaluating(false);
  };

  const handleNext = () => {
    if (currentIdx + 1 < totalQ) {
      setCurrentIdx(i => i + 1);
    } else {
      setPhase("done");
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const getScoreClass = (score) => {
    if (score >= 8) return "excellent";
    if (score >= 6) return "good";
    if (score >= 4) return "satisfactory";
    return "needs";
  };

  const avgScore = answeredCount > 0
    ? Math.round(Object.values(feedbacks).reduce((s, f) => s + f.score, 0) / answeredCount * 10) / 10
    : 0;

  if (phase === "loading") return (
    <div className="scenario-page">
      <div className="loading-overlay" style={{ marginTop:40 }}>
        <div className="spinner" style={{ borderTopColor:"#f59e0b" }} />
        <div className="loading-title">Generating deep questions…</div>
        <div className="loading-sub">AI is crafting scenario & descriptive challenges from your notes</div>
      </div>
    </div>
  );

  if (phase === "done") {
    const excellent = Object.values(feedbacks).filter(f => f.score >= 8).length;
    const good = Object.values(feedbacks).filter(f => f.score >= 6 && f.score < 8).length;
    const needsWork = Object.values(feedbacks).filter(f => f.score < 6).length;
    return (
      <div className="scenario-page">
        <div className="sq-summary-card">
          <span style={{ fontSize:"3rem", display:"block", marginBottom:12 }}>
            {avgScore >= 8 ? "🏆" : avgScore >= 6 ? "📖" : "💪"}
          </span>
          <div style={{ fontFamily:"var(--ff2)", fontSize:22, fontWeight:800, color:"var(--text)", marginBottom:6 }}>
            Deep Questions Complete!
          </div>
          <div style={{ fontSize:13, color:"var(--text-body)", opacity:0.85, marginBottom:4 }}>
            {avgScore >= 8 ? "Outstanding critical thinking! You demonstrated excellent depth of understanding." : avgScore >= 6 ? "Good effort! Your analytical skills are developing well." : "Keep practicing — review your notes and work on building deeper explanations."}
          </div>
          <div className="sq-summary-grid">
            <div className="sq-summary-stat">
              <div className="sq-summary-val">{answeredCount}/{totalQ}</div>
              <div className="sq-summary-label">Answered</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#10b981" }}>{avgScore}/10</div>
              <div className="sq-summary-label">Avg Score</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#10b981" }}>{excellent}</div>
              <div className="sq-summary-label">Excellent</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#f59e0b" }}>{good}</div>
              <div className="sq-summary-label">Good</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#f87171" }}>{needsWork}</div>
              <div className="sq-summary-label">Needs Work</div>
            </div>
          </div>
          <div className="score-actions">
            <button className="sa-btn primary" onClick={() => { setCurrentIdx(0); setAnswers({}); setFeedbacks({}); setShowSample({}); setPhase("loading"); }}>
              🔄 Try Again
            </button>
            <button className="sa-btn secondary" onClick={onBack}>← Back to Notes</button>
          </div>
        </div>
      </div>
    );
  }

  const fb = feedbacks[currentIdx];
  const progressPct = Math.round(((currentIdx + (fb ? 1 : 0)) / totalQ) * 100);

  return (
    <div className="scenario-page">
      <div className="scenario-header">
        <h1 className="scenario-title-h">🧠 Deep Questions</h1>
        <button className="back-btn" onClick={onBack}>← Back to Notes</button>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--text-body)", opacity:.8, marginBottom:6 }}>
        <span>Question {currentIdx + 1} of {totalQ}</span>
        <span>{answeredCount} answered · {progressPct}% complete</span>
      </div>
      <div className="sq-progress-bar"><div className="sq-progress-fill" style={{ width:`${progressPct}%` }} /></div>

      {currentQ && (
        <div className="sq-card">
          {/* Type badge */}
          <div className={`sq-type-badge ${currentQ.type}`}>
            {currentQ.type === "scenario" ? "🎭 Scenario" : "📝 Descriptive"}
          </div>

          {/* Scenario context box */}
          {currentQ.type === "scenario" && currentQ.context && (
            <div className="sq-context-box">
              <div className="sq-context-label">📌 Scenario Setup</div>
              {currentQ.context}
            </div>
          )}

          {/* Question */}
          <div className="sq-question-text">{currentQ.question}</div>

          {/* Evaluation criteria hint */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--text-muted)", marginBottom:6 }}>
              Your answer should cover:
            </div>
            <div className="sq-criteria-list">
              {currentQ.evaluationCriteria.map((c, i) => (
                <div key={i} className="sq-criteria-item">
                  <div className="sq-criteria-dot" />
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Answer textarea (only if not yet evaluated) */}
          {!fb && (
            <>
              <div className="sq-answer-label">Your Answer</div>
              <textarea
                className="sq-textarea"
                placeholder="Write your detailed answer here… (aim for at least 3-4 sentences)"
                value={answers[currentIdx] || ""}
                onChange={e => setAnswers(prev => ({ ...prev, [currentIdx]: e.target.value }))}
                disabled={evaluating}
              />
              <div className="sq-submit-row">
                <button className="sq-skip-btn" onClick={handleSkip} disabled={evaluating}>
                  Skip →
                </button>
                <button
                  className="sq-submit-btn"
                  onClick={handleSubmitAnswer}
                  disabled={evaluating || !(answers[currentIdx] || "").trim()}
                >
                  {evaluating ? "⏳ Evaluating…" : "Submit for Feedback →"}
                </button>
              </div>
            </>
          )}

          {/* Show answer text as read-only after submission */}
          {fb && answers[currentIdx] && (
            <div style={{ marginBottom:14 }}>
              <div className="sq-answer-label">Your Answer</div>
              <div style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", borderRadius:12, padding:"14px", fontSize:14, color:"var(--text-body)", lineHeight:1.65, whiteSpace:"pre-wrap" }}>
                {answers[currentIdx]}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feedback card */}
      {fb && (
        <div className="sq-feedback-card">
          <div className="sq-feedback-header">
            <div className="sq-score-display">
              <div className={`sq-score-circle ${getScoreClass(fb.score)}`}>{fb.score}/10</div>
              <div>
                <div className="sq-grade-text">{fb.grade}</div>
                <div className="sq-grade-sub">AI Evaluation</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["Excellent","Good","Satisfactory","Needs Improvement","Incomplete"].indexOf(fb.grade) >= 0 && (
                <span style={{
                  padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700,
                  background: fb.score >= 8 ? "rgba(16,185,129,0.15)" : fb.score >= 6 ? "rgba(99,102,241,0.15)" : fb.score >= 4 ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                  border: fb.score >= 8 ? "1px solid rgba(16,185,129,0.4)" : fb.score >= 6 ? "1px solid rgba(99,102,241,0.4)" : fb.score >= 4 ? "1px solid rgba(245,158,11,0.4)" : "1px solid rgba(239,68,68,0.4)",
                  color: fb.score >= 8 ? "#10b981" : fb.score >= 6 ? "#a5b4fc" : fb.score >= 4 ? "#fcd34d" : "#f87171",
                }}>{fb.grade}</span>
              )}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="sq-feedback-grid">
            <div className="sq-fb-section strengths">
              <div className="sq-fb-section-title">✅ Strengths</div>
              {fb.strengths.map((s, i) => (
                <div key={i} className="sq-fb-item">
                  <span className="sq-fb-bullet">✓</span>{s}
                </div>
              ))}
            </div>
            <div className="sq-fb-section improvements">
              <div className="sq-fb-section-title">🔧 To Improve</div>
              {fb.improvements.map((s, i) => (
                <div key={i} className="sq-fb-item">
                  <span className="sq-fb-bullet">→</span>{s}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed feedback paragraph */}
          <div className="sq-detailed-feedback">{fb.detailedFeedback}</div>

          {/* Sample answer toggle */}
          <button
            className="sq-sample-toggle"
            onClick={() => setShowSample(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }))}
          >
            {showSample[currentIdx] ? "▲ Hide" : "▼ Show"} model answer
          </button>
          {showSample[currentIdx] && currentQ && (
            <div className="sq-sample-answer">
              <div className="sq-sample-label">📖 Model Answer</div>
              {currentQ.sampleAnswer}
            </div>
          )}

          {/* Next button */}
          <button className="sq-next-btn" onClick={handleNext}>
            {currentIdx + 1 < totalQ ? `Next Question (${currentIdx + 2}/${totalQ}) →` : "View Results →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── DAILY IMPROVEMENT GRAPH ────────────────────────────────────────────────────
function DailyImprovementGraph({ uid }) {
  const [range, setRange] = useState("30");
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const activity = DB.getActivity(uid);
  const days = parseInt(range);
  const today = new Date();

  const data = Array.from({ length:days }, (_,i) => {
    const d = new Date(today); d.setDate(today.getDate()-(days-1-i));
    const ds = d.toISOString().split("T")[0];
    return { date:ds, count:activity[ds]||0, dayLabel:d.toLocaleDateString("en-US",{month:"short",day:"numeric"}) };
  });

  const maxVal = Math.max(...data.map(d => d.count), 1);
  const totalSessions = data.reduce((s,d) => s+d.count, 0);
  const activeDays = data.filter(d => d.count>0).length;
  const avgPerDay = activeDays > 0 ? (totalSessions/activeDays).toFixed(1) : "0";
  const bestDay = data.reduce((best,d) => d.count>best.count ? d : best, data[0]);

  const W=700, H=120, PAD=8;
  const pts = data.map((d,i) => ({
    x: PAD+(i/(data.length-1))*(W-PAD*2),
    y: H-PAD-(d.count/maxVal)*(H-PAD*2),
    ...d
  }));

  const linePath = pts.map((p,i) => `${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;
  const labelStep = days<=14 ? 1 : days<=30 ? 5 : days<=60 ? 7 : 14;
  const xLabels = data.filter((_,i) => i%labelStep===0 || i===data.length-1);

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX-rect.left)/rect.width)*W;
    let closest=pts[0], minDist=Infinity;
    pts.forEach(p => { const dist=Math.abs(p.x-relX); if(dist<minDist){ minDist=dist; closest=p; } });
    if (minDist < (W/data.length)*0.8) setTooltip({ x:(closest.x/W)*100, y:(closest.y/H)*100, ...closest });
    else setTooltip(null);
  };

  return (
    <div className="improvement-section">
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:4 }}>
        <div>
          <div className="improvement-title">📈 Daily Improvement</div>
          <div className="improvement-sub">Analyses per day — track your learning consistency</div>
        </div>
        <div className="graph-tabs">
          {[["7","7d"],["14","14d"],["30","30d"],["90","90d"]].map(([v,l]) => (
            <button key={v} className={`graph-tab ${range===v?"active":""}`} onClick={() => setRange(v)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="line-graph-wrap" onMouseMove={handleMouseMove} onMouseLeave={() => setTooltip(null)}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {[0.25,0.5,0.75,1].map(frac => {
            const y=PAD+(1-frac)*(H-PAD*2);
            return <line key={frac} x1={PAD} y1={y} x2={W-PAD} y2={y} stroke="rgba(16,185,129,0.08)" strokeWidth="1" />;
          })}
          <path d={areaPath} fill="url(#areaGrad)" />
          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p,i) => p.count > 0 && (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#10b981" stroke="#0b0924" strokeWidth="1.5" />
          ))}
          {tooltip && <circle cx={tooltip.x/100*W} cy={tooltip.y/100*H} r="5.5" fill="#10b981" stroke="#fff" strokeWidth="2" />}
        </svg>
        {tooltip && (
          <div className="graph-tooltip" style={{ left:`${tooltip.x}%`, top:`${tooltip.y}%` }}>
            <strong style={{ color:"#10b981" }}>{tooltip.count}</strong> {tooltip.count===1?"session":"sessions"}<br />
            <span style={{ color:"#94a3b8", fontSize:10 }}>{tooltip.dayLabel}</span>
          </div>
        )}
      </div>
      <div className="graph-x-labels">
        {xLabels.map((d,i) => <div key={i} className="graph-x-label">{d.dayLabel}</div>)}
      </div>
      <div className="graph-stats-row">
        <div className="graph-stat"><div className="graph-stat-val">{totalSessions}</div><div className="graph-stat-label">Total in period</div></div>
        <div className="graph-stat"><div className="graph-stat-val">{activeDays}</div><div className="graph-stat-label">Active days</div></div>
        <div className="graph-stat"><div className="graph-stat-val">{avgPerDay}</div><div className="graph-stat-label">Avg / active day</div></div>
        <div className="graph-stat"><div className="graph-stat-val">{bestDay?.count||0}</div><div className="graph-stat-label">Best day</div></div>
      </div>
    </div>
  );
}

// ─── ACTIVITY HEATMAP ──────────────────────────────────────────────────────────
function ActivityHeatmap({ uid, username }) {
  const activity = DB.getActivity(uid);
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const weeks = [];
  const monthLabels = [];
  let currentMonth = -1;

  for (let w=51; w>=0; w--) {
    const week = [];
    for (let d=6; d>=0; d--) {
      const date = new Date(today); date.setDate(today.getDate()-w*7-d);
      const dateStr = date.toISOString().split("T")[0];
      const count = activity[dateStr] || 0;
      const month = date.getMonth();
      if (month!==currentMonth && date.getDate()<=7) {
        const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        monthLabels.push({ label:months[month], weekIdx:51-w });
        currentMonth = month;
      }
      week.push({ dateStr, count, date, isToday:dateStr===todayStr });
    }
    weeks.push(week);
  }

  const getLevel = (count) => {
    if (count===0) return "empty";
    if (count===1) return "low";
    if (count===2) return "mid";
    if (count===3) return "high";
    return "full";
  };

  let cs=0;
  for (let i=0; i<365; i++) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) cs++;
    else break;
  }
  let ms=0, streak=0;
  for (let i=364; i>=0; i--) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) { streak++; ms=Math.max(ms,streak); } else streak=0;
  }

  const totalDays = Object.keys(activity).length;
  const totalUsage = Object.values(activity).reduce((a,b) => a+b, 0);

  return (
    <div className="heatmap-section">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
        <div>
          <div className="heatmap-title">🟩 Activity Heatmap — {username}</div>
          <div className="heatmap-sub">{totalUsage} total analyses · {totalDays} active days this year</div>
        </div>
        <div className="streak-badges">
          <div className="streak-badge"><span style={{ fontSize:18 }}>🔥</span><div><div className="streak-badge-val">{cs}</div><div className="streak-badge-label">Day streak</div></div></div>
          <div className="streak-badge"><span style={{ fontSize:18 }}>🏆</span><div><div className="streak-badge-val">{ms}</div><div className="streak-badge-label">Best streak</div></div></div>
        </div>
      </div>
      <div style={{ display:"flex", marginBottom:4, paddingLeft:2, minHeight:14, overflow:"hidden", position:"relative" }}>
        {monthLabels.map((m,i) => (
          <span key={i} style={{ position:"absolute", left:m.weekIdx*15, fontSize:9, color:"var(--text-muted)", fontFamily:"var(--ff2)" }}>{m.label}</span>
        ))}
      </div>
      <div className="heatmap-grid">
        {weeks.map((week,wi) => (
          <div key={wi} className="heatmap-week">
            {week.map((day,di) => (
              <div key={di} className={`heatmap-cell ${getLevel(day.count)}${day.isToday&&day.count>0?" today-active":""}`} title={`${day.dateStr}: ${day.count} ${day.count===1?"analysis":"analyses"}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        {["empty","low","mid","high","full"].map(l => <div key={l} className={`heatmap-legend-cell ${l}`} />)}
        <span>More</span>
      </div>
    </div>
  );
}

// ─── PERFORMANCE PAGE ──────────────────────────────────────────────────────────
function PerformancePage({ session }) {
  const uid = session.id;
  const activity   = DB.getActivity(uid);
  const topics     = DB.getTopics(uid);
  const quizScores = DB.getQuizScores(uid);
  const chatCount  = DB.getChatCount(uid);
  const dailyChats = DB.getDailyChats(uid);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  let streak=0;
  for (let i=0; i<365; i++) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) streak++;
    else break;
  }
  let bestStreak=0, cur=0;
  for (let i=364; i>=0; i--) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) { cur++; bestStreak=Math.max(bestStreak,cur); } else cur=0;
  }

  const totalSessions = Object.values(activity).reduce((a,b)=>a+b,0);
  const activeDays    = Object.keys(activity).length;
  const avgQuiz = quizScores.length
    ? Math.round(quizScores.reduce((s,q)=>s+(q.score/q.total)*100,0)/quizScores.length)
    : 0;

  const topicEntries = Object.entries(topics).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const maxTopicCount = topicEntries[0]?.[1] || 1;
  const topicColors = ["#6366f1","#8b5cf6","#14b8a6","#f59e0b","#ec4899","#10b981","#3b82f6","#f43f5e"];

  const bestQuiz = quizScores.length ? Math.round(Math.max(...quizScores.map(q=>(q.score/q.total)*100))) : null;
  const lastQuiz = quizScores.length ? Math.round((quizScores[quizScores.length-1].score/quizScores[quizScores.length-1].total)*100) : null;

  const chatDays7 = Array.from({length:7},(_,i) => {
    const d=new Date(today); d.setDate(today.getDate()-(6-i));
    return dailyChats[d.toISOString().split("T")[0]] || 0;
  });
  const maxChatDay = Math.max(...chatDays7,1);

  const weekDayLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay()+6)%7));
  const weekData = Array.from({length:7},(_,i) => {
    const d=new Date(startOfWeek); d.setDate(startOfWeek.getDate()+i);
    const ds = d.toISOString().split("T")[0];
    return {
      quizCount: quizScores.filter(q=>q.date&&q.date.startsWith(ds)).length,
      chatCount: dailyChats[ds]||0,
    };
  });
  const maxWeek = Math.max(...weekData.map(d=>d.quizCount+d.chatCount),1);

  const milestones = [
    { label:"3-day streak",  val:3,   icon:"🔥", type:"streak" },
    { label:"7-day streak",  val:7,   icon:"🔥", type:"streak" },
    { label:"14-day streak", val:14,  icon:"🔥", type:"streak" },
    { label:"30-day streak", val:30,  icon:"🏆", type:"streak" },
    { label:"5 quizzes",     val:5,   icon:"🎯", type:"quiz" },
    { label:"20 quizzes",    val:20,  icon:"🎯", type:"quiz" },
    { label:"100 chats",     val:100, icon:"💬", type:"chat" },
  ];
  const earnedMilestone = (m) => {
    if (m.type==="streak")  return bestStreak >= m.val;
    if (m.type==="quiz")    return quizScores.length >= m.val;
    if (m.type==="chat")    return chatCount >= m.val;
    return false;
  };

  const statCards = [
    { icon:"🔥", val:streak,            label:"Day streak" },
    { icon:"🏆", val:bestStreak,         label:"Best streak" },
    { icon:"📊", val:totalSessions,      label:"Total analyses" },
    { icon:"📅", val:activeDays,         label:"Active days" },
    { icon:"🎯", val:`${avgQuiz}%`,      label:"Quiz avg" },
    { icon:"📝", val:quizScores.length,  label:"Quizzes taken" },
    { icon:"💬", val:chatCount,          label:"AI chats" },
    { icon:"🏷️", val:topicEntries.length,label:"Topics studied" },
  ];

  return (
    <div className="performance-page">
      <div className="perf-header">
        <h1 className="perf-title">📊 My Progress</h1>
        <div style={{ fontSize:13, color:"var(--text-muted)" }}>Welcome back, <strong style={{ color:"var(--text)" }}>{session.username}</strong>!</div>
      </div>
      <div className="perf-stat-grid">
        {statCards.map(s => (
          <div key={s.label} className="perf-stat-card">
            <div className="perf-stat-icon">{s.icon}</div>
            <div><div className="perf-stat-val">{s.val}</div><div className="perf-stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>
      <ActivityHeatmap uid={uid} username={session.username} />
      <DailyImprovementGraph uid={uid} />
      <div className="perf-panel-grid">
        <div className="perf-panel">
          <div className="perf-panel-title">🏷️ Topics Studied</div>
          <div className="perf-panel-sub">Auto-extracted from your analysis history</div>
          {topicEntries.length === 0 ? (
            <div style={{ textAlign:"center", padding:"20px 0", color:"var(--text-muted)", fontSize:13 }}>No topics yet — analyze some content!</div>
          ) : (
            topicEntries.map(([topic,count],i) => (
              <div key={topic} className="topic-bar-row">
                <span className="topic-name" title={topic}>{topic}</span>
                <div className="topic-bar-bg">
                  <div className="topic-bar-fill" style={{ width:`${Math.round((count/maxTopicCount)*100)}%`, background:topicColors[i%topicColors.length] }} />
                </div>
                <span className="topic-count">{count}</span>
              </div>
            ))
          )}
        </div>
        <div className="perf-panel">
          <div className="perf-panel-title">🎯 Quiz Performance</div>
          <div className="perf-panel-sub">Score history — green ≥75% · amber ≥50% · red &lt;50%</div>
          {quizScores.length > 0 ? (
            <>
              <div className="quiz-score-summary">
                <div className="qss-item"><div className="qss-val" style={{ color:"#10b981" }}>{bestQuiz}%</div><div className="qss-label">Best</div></div>
                <div className="qss-item"><div className="qss-val" style={{ color:"#f59e0b" }}>{avgQuiz}%</div><div className="qss-label">Average</div></div>
                <div className="qss-item"><div className="qss-val" style={{ color: lastQuiz>=75?"#10b981":lastQuiz>=50?"#f59e0b":"#ef4444" }}>{lastQuiz}%</div><div className="qss-label">Latest</div></div>
                <div className="qss-item"><div className="qss-val" style={{ color:"var(--text-muted)" }}>{quizScores.length}</div><div className="qss-label">Total</div></div>
              </div>
              <div className="quiz-history-bars">
                {quizScores.slice(-20).map((q,i) => {
                  const pct = Math.round((q.score/q.total)*100);
                  const color = pct>=75 ? "#10b981" : pct>=50 ? "#f59e0b" : "#ef4444";
                  return <div key={i} className="qh-bar" style={{ height:`${Math.max(pct,5)}%`, background:color }} title={`${pct}% (${q.score}/${q.total})`} />;
                })}
              </div>
              <div style={{ fontSize:11, color:"var(--text-muted)" }}>Last {Math.min(quizScores.length,20)} quizzes shown</div>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"20px 0", color:"var(--text-muted)", fontSize:13 }}>No quizzes taken yet!</div>
          )}
        </div>
      </div>
      <div className="perf-panel-grid">
        <div className="perf-panel">
          <div className="perf-panel-title">💬 Chatbot Usage</div>
          <div className="perf-panel-sub">AI tutor conversation tracking</div>
          <div className="chat-stat-big">{chatCount}</div>
          <div className="chat-stat-label">Total AI messages sent</div>
          <div className="chat-daily-bars">
            {chatDays7.map((v,i) => (
              <div key={i} className="cdb-bar" style={{ height:`${Math.max((v/maxChatDay)*100, v>0?15:4)}%`, opacity:v>0?1:0.3 }} title={`${v} chats`} />
            ))}
          </div>
          <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:6 }}>Messages per day — last 7 days</div>
          <div style={{ marginTop:14, display:"flex", gap:12, flexWrap:"wrap" }}>
            <div><div style={{ fontFamily:"var(--ff2)", fontSize:16, fontWeight:700, color:"#10b981" }}>{chatDays7.reduce((a,b)=>a+b,0)}</div><div style={{ fontSize:10, color:"var(--text-muted)" }}>Chats this week</div></div>
            <div><div style={{ fontFamily:"var(--ff2)", fontSize:16, fontWeight:700, color:"#a5b4fc" }}>{dailyChats[todayStr]||0}</div><div style={{ fontSize:10, color:"var(--text-muted)" }}>Today</div></div>
          </div>
        </div>
        <div className="perf-panel">
          <div className="perf-panel-title">📅 This Week's Activity</div>
          <div className="perf-panel-sub">Quizzes vs chatbot usage by day</div>
          <div className="weekly-chart-wrap">
            {weekData.map((d,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:0, justifyContent:"flex-end", height:"100%" }}>
                <div className="wcw-bar-quiz" style={{ width:"100%", height:`${Math.round((d.quizCount/maxWeek)*80)}%`, minHeight:d.quizCount>0?4:0, borderRadius:"3px 3px 0 0" }} title={`${weekDayLabels[i]}: ${d.quizCount} quiz`} />
                <div className="wcw-bar-chat" style={{ width:"100%", height:`${Math.round((d.chatCount/maxWeek)*80)}%`, minHeight:d.chatCount>0?4:0 }} title={`${weekDayLabels[i]}: ${d.chatCount} chats`} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
            {weekDayLabels.map(l => <div key={l} className="wcw-label">{l}</div>)}
          </div>
          <div className="weekly-legend">
            <span><span className="wl-dot" style={{ background:"rgba(99,102,241,0.6)" }}></span>Quizzes</span>
            <span><span className="wl-dot" style={{ background:"rgba(16,185,129,0.55)" }}></span>AI Chats</span>
          </div>
        </div>
      </div>
      <div className="perf-panel-full">
        <div className="perf-panel-title" style={{ marginBottom:4 }}>🏅 Milestone Badges</div>
        <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:14 }}>Earn badges by reaching learning milestones — gold = achieved!</div>
        <div className="milestone-badges">
          {milestones.map(m => {
            const earned = earnedMilestone(m);
            return (
              <div key={m.label} className={`milestone-badge ${earned?"gold":"locked"}`}>
                <span>{m.icon}</span><span>{m.label}</span>{earned && <span style={{ fontSize:10 }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── CHATBOT VIEW ───────────────────────────────────────────────────────────────
function ChatbotView({ summary, onBack, onMessage }) {
  const [messages, setMessages] = useState([
    {
      role:"ai",
      text:"Hi! I've studied your notes carefully. Ask me anything — detailed explanations, real-world examples, comparisons between concepts, 'what if' scenarios, or why something matters. I'll answer descriptively, like a tutor — not just bullet points!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const quickPrompts = [
    "Explain the main concept in depth",
    "Give me a real-world example",
    "Why is this topic important?",
    "Compare the key concepts here",
    "What would happen if this didn't exist?",
    "Explain this like I'm a beginner",
    "What are the practical applications?",
    "What are common misconceptions about this?",
  ];

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "42px";

    const newMessages = [...messages, { role:"user", text:msg }];
    setMessages(newMessages);
    setLoading(true);

    onMessage && onMessage();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: summary,
          messages: newMessages.map(m => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text
          }))
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server error");
      const reply = data.reply || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role:"ai", text:reply }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        role:"ai",
        text:`⚠️ Could not reach the backend. Make sure your FastAPI server is running at http://127.0.0.1:8000\n\nError: ${err.message}`
      }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "42px";
    e.target.style.height = Math.min(e.target.scrollHeight,100)+"px";
  };

  if (!summary) return (
    <div className="chatbot-page" style={{ textAlign:"center", paddingTop:60 }}>
      <div style={{ fontSize:"2rem" }}>💬</div>
      <p style={{ marginTop:8, fontSize:13 }}>Please analyze some content first before chatting.</p>
      <button className="back-btn" style={{ margin:"12px auto 0" }} onClick={onBack}>← Go back</button>
    </div>
  );

  return (
    <div className="chatbot-page">
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
        <button className="back-btn" onClick={onBack}>← Back to Notes</button>
        <h1 style={{ fontFamily:"var(--ff2)", fontSize:22, fontWeight:800, color:"var(--text)" }}>💬 Ask About Your Notes</h1>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:600, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:".04em", marginBottom:8 }}>Quick questions</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {quickPrompts.map(p => (
            <button key={p} onClick={() => sendMessage(p)} className="quick-prompt-chip">{p}</button>
          ))}
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header-bar">
          <div className="chat-avatar">✦</div>
          <div className="chat-header-info">
            <div className="chat-name">NoteAI Tutor</div>
            <div className="chat-status">● Ready to help</div>
          </div>
          <div style={{ marginLeft:"auto", fontSize:11, color:"var(--text-muted)", padding:"4px 10px", borderRadius:20, background:"var(--card-bg)", border:"1px solid var(--border)" }}>
            {messages.length-1} message{messages.length!==2?"s":""}
          </div>
        </div>
        <div className="chat-messages-area">
          {messages.map((m,i) => (
            <div key={i} className={`chat-msg-wrap ${m.role}`}>
              <div className="chat-msg-label">{m.role==="ai" ? "NoteAI Tutor" : "You"}</div>
              <div className={`chat-bubble ${m.role}`} style={{ whiteSpace:"pre-wrap" }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg-wrap ai">
              <div className="chat-msg-label">NoteAI Tutor</div>
              <div className="chat-typing">
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-row">
          <textarea ref={textareaRef} className="chat-textarea" value={input} onChange={handleTextareaChange} onKeyDown={handleKeyDown}
            placeholder="Ask anything about your notes… (Enter to send, Shift+Enter for new line)" rows={1} />
          <button className="chat-send-btn" onClick={() => sendMessage()} disabled={loading||!input.trim()} title="Send">→</button>
        </div>
      </div>
      <div className="chat-context-note">
        💡 Chat powered by Gemini AI via your local backend. Conversation history is sent each turn for multi-turn context.
      </div>
    </div>
  );
}

// ─── HISTORY PAGE ───────────────────────────────────────────────────────────────
function HistoryPage({ session, onViewItem }) {
  const [history, setHistory] = useState(() => DB.getHistory(session.id));

  const deleteItem = (id,e) => {
    e.stopPropagation();
    const next = history.filter(h => h.id!==id);
    setHistory(next); DB.saveHistory(session.id,next);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})+" · "+d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1 className="history-title">📚 Your History</h1>
        <div style={{ fontSize:13, color:"var(--text-muted)" }}>{history.length} saved analyses</div>
      </div>
      {history.length===0 ? (
        <div className="history-empty">
          <span className="history-empty-icon">📋</span>
          <div className="history-empty-txt">No history yet</div>
          <div>Analyze some content and it will appear here for easy revision later.</div>
        </div>
      ) : (
        <div className="history-list">
          {history.map(item => (
            <div key={item.id} className="history-card" onClick={() => onViewItem(item)}>
              <div className="history-card-header">
                <div className="history-card-source">🔗 {item.source||"Unknown source"}</div>
                <div className="history-card-date">{formatDate(item.date)}</div>
              </div>
              <div className="history-card-preview">{item.summary?.replace(/[#*]/g,"").slice(0,180)}…</div>
              <div className="history-card-footer">
                <span className="history-tag">Summary</span>
                <span className="history-tag">Quiz-ready</span>
                <button className="delete-btn" onClick={e => deleteItem(item.id,e)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ActivityHeatmap uid={session.id} username={session.username} />
      <DailyImprovementGraph uid={session.id} />
    </div>
  );
}

function AdminContentTrends() {
  const users = DB.getUsers();
  const TREND_COLORS = ["#6366f1","#8b5cf6","#14b8a6","#f59e0b","#ec4899","#10b981","#3b82f6","#f43f5e"];
  const PLATFORM_DEFS = [
    { name:"YouTube",   icon:"🔴", keys:["youtube","youtu.be"] },
    { name:"Instagram", icon:"📸", keys:["instagram","instagr.am"] },
    { name:"TikTok",    icon:"🎵", keys:["tiktok"] },
    { name:"Twitter/X", icon:"🐦", keys:["twitter","x.com"] },
    { name:"Facebook",  icon:"📘", keys:["facebook","fb.watch","fb.com"] },
    { name:"File",      icon:"📁", keys:[".mp4",".mov",".webm",".avi",".mkv"] },
    { name:"Other",     icon:"🌐", keys:[] },
  ];

  const allTopics = {};
  const allActivity = {};
  const allSources = [];

  users.forEach(u => {
    const topics = DB.getTopics(u.id);
    Object.entries(topics).forEach(([k,v]) => { allTopics[k] = (allTopics[k]||0)+v; });
    const activity = DB.getActivity(u.id);
    Object.entries(activity).forEach(([k,v]) => { allActivity[k] = (allActivity[k]||0)+v; });
    DB.getHistory(u.id).forEach(h => { if (h.source) allSources.push(h.source.toLowerCase()); });
  });

  const topicEntries = Object.entries(allTopics).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const maxT = topicEntries[0]?.[1] || 1;
  const totalAnalyses = Object.values(allActivity).reduce((a,b)=>a+b,0);

  const detectPlatform = (url) => {
    for (const p of PLATFORM_DEFS.slice(0,-1)) {
      if (p.keys.some(k => url.includes(k))) return p.name;
    }
    return "Other";
  };

  const platformCounts = {};
  PLATFORM_DEFS.forEach(p => { platformCounts[p.name] = 0; });
  allSources.forEach(src => { platformCounts[detectPlatform(src)]++; });
  const totalSources = allSources.length || 1;
  const platformEntries = PLATFORM_DEFS
    .filter(p => platformCounts[p.name] > 0)
    .sort((a,b) => platformCounts[b.name] - platformCounts[a.name]);

  const today = new Date();
  const days14 = Array.from({length:14}, (_,i) => {
    const d = new Date(today); d.setDate(today.getDate()-(13-i));
    const key = d.toISOString().split("T")[0];
    return {
      key,
      label: d.toLocaleDateString("en-US",{month:"short",day:"numeric"}),
      val: allActivity[key] || 0,
    };
  });
  const maxBar = Math.max(...days14.map(d=>d.val), 1);

  const topUsers = [...users]
    .sort((a,b) => (b.analysisCount||0) - (a.analysisCount||0))
    .slice(0,5);
  const maxUserCount = topUsers[0]?.analysisCount || 1;

  return (
    <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:22, marginBottom:28, backdropFilter:"blur(20px)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:4 }}>
        <div style={{ fontFamily:"var(--ff2)", fontSize:15, fontWeight:700, color:"var(--text)", display:"flex", alignItems:"center", gap:8 }}>
          📊 Content Analysis Trends
          <span style={{ padding:"3px 10px", borderRadius:20, background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.25)", fontSize:10, fontWeight:600, color:"#a5b4fc" }}>All Users</span>
        </div>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          {[
            { val:totalAnalyses,       label:"Total analyses",  color:"#10b981" },
            { val:topicEntries.length, label:"Unique topics",   color:"#a5b4fc" },
            { val:allSources.length,   label:"Sources analyzed", color:"#f9a8d4" },
          ].map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"var(--ff2)", fontSize:18, fontWeight:800, color:s.color }}>{s.val}</div>
              <div style={{ fontSize:10, color:"var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:18 }}>
        Aggregated across all registered users — topics studied, platforms used, and activity trends
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:20, marginBottom:20 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
            🏷️ Top Topics Studied
          </div>
          {topicEntries.length === 0 ? (
            <div style={{ fontSize:13, color:"var(--text-muted)", padding:"20px 0", textAlign:"center" }}>
              No topics recorded yet — users need to analyze content first.
            </div>
          ) : (
            topicEntries.map(([topic, count], i) => (
              <div key={topic} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
                <div style={{ fontSize:12, color:"var(--text-body)", minWidth:160, maxWidth:"none", lineHeight:1.4, wordBreak:"break-word" }} title={topic}>
                  {topic}
                </div>
                <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4, overflow:"hidden", marginTop:4 }}>
                  <div style={{ height:"100%", borderRadius:4, width:`${Math.round((count/maxT)*100)}%`, background:TREND_COLORS[i%TREND_COLORS.length] }} />
                </div>
                <div style={{ fontSize:11, color:"var(--text-muted)", minWidth:20, textAlign:"right", fontFamily:"var(--ff2)", fontWeight:600, marginTop:2 }}>{count}</div>
              </div>
            ))
          )}
        </div>

        <div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
            🌐 Platform Breakdown
          </div>
          {platformEntries.length === 0 ? (
            <div style={{ fontSize:13, color:"var(--text-muted)", padding:"20px 0", textAlign:"center" }}>
              No history yet — no source URLs recorded.
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))", gap:8 }}>
              {platformEntries.map(p => (
                <div key={p.name} style={{ background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>{p.icon}</div>
                  <div style={{ fontSize:10, color:"var(--text-muted)", marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontFamily:"var(--ff2)", fontSize:16, fontWeight:700, color:"var(--text)" }}>{platformCounts[p.name]}</div>
                  <div style={{ fontSize:10, color:"var(--text-muted)" }}>{Math.round((platformCounts[p.name]/totalSources)*100)}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
          🏆 Most Active Users
        </div>
        {topUsers.length === 0 || topUsers.every(u => !u.analysisCount) ? (
          <div style={{ fontSize:13, color:"var(--text-muted)", textAlign:"center", padding:"12px 0" }}>No activity recorded yet.</div>
        ) : (
          topUsers.filter(u => (u.analysisCount||0) > 0).map((u, i) => (
            <div key={u.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ width:22, height:22, borderRadius:50, background:acColor(u.username), display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff", flexShrink:0 }}>
                {u.username[0].toUpperCase()}
              </div>
              <div style={{ fontSize:12, color:"var(--text-body)", minWidth:100, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }} title={u.username}>
                {u.username}
              </div>
              <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:4, width:`${Math.round(((u.analysisCount||0)/maxUserCount)*100)}%`, background: i===0 ? "#f59e0b" : i===1 ? "#94a3b8" : i===2 ? "#cd7f32" : "#6366f1" }} />
              </div>
              <div style={{ fontSize:11, color:"var(--text-muted)", minWidth:50, textAlign:"right", fontFamily:"var(--ff2)", fontWeight:600 }}>
                {u.analysisCount||0} <span style={{ fontWeight:400, fontSize:10 }}>analyses</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ borderTop:"1px solid var(--border)", paddingTop:16 }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
          📈 Combined Activity — Last 14 Days (All Users)
        </div>
        <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:60 }}>
          {days14.map((d,i) => (
            <div key={i}
              title={`${d.label}: ${d.val} ${d.val===1?"analysis":"analyses"}`}
              style={{
                flex:1,
                borderRadius:"3px 3px 0 0",
                background: d.val > 0 ? "#6366f1" : "var(--border)",
                height: `${Math.max((d.val/maxBar)*100, d.val>0?10:4)}%`,
                minHeight: d.val > 0 ? 4 : 2,
                opacity: d.val > 0 ? 1 : 0.35,
                transition: "height 0.3s ease",
              }}
            />
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
          {days14.filter((_,i) => i%2===0 || i===13).map(d => (
            <div key={d.key} style={{ fontSize:9, color:"var(--text-muted)", fontFamily:"var(--ff2)" }}>{d.label}</div>
          ))}
        </div>
        <div style={{ display:"flex", gap:20, marginTop:12, flexWrap:"wrap" }}>
          {[
            { val: days14.reduce((a,d)=>a+d.val,0), label:"Total this period" },
            { val: days14.filter(d=>d.val>0).length, label:"Active days" },
            { val: Math.max(...days14.map(d=>d.val)), label:"Peak day" },
            { val: (days14.reduce((a,d)=>a+d.val,0) / Math.max(days14.filter(d=>d.val>0).length,1)).toFixed(1), label:"Avg / active day" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily:"var(--ff2)", fontSize:17, fontWeight:800, color:"#6366f1" }}>{s.val}</div>
              <div style={{ fontSize:10, color:"var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ─────────────────────────────────────────────────────────────────
function AdminPage({ onViewUserHistory }) {
  const [expandedUser, setExpandedUser] = useState(null);
  const users = DB.getUsers();
  const totalAnalyses = users.reduce((s,u)=>s+(u.analysisCount||0),0);
  const today = new Date().toDateString();
  const newToday = users.filter(u => new Date(u.joined).toDateString()===today).length;
  const activeToday = users.filter(u => {
    const a=DB.getActivity(u.id); const t=new Date().toISOString().split("T")[0];
    return a[t]>0;
  }).length;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">⚙️ Admin Panel</h1>
        <div className="admin-badge">🔐 Admin Access</div>
      </div>

      <div className="stat-grid">
        {[
          { val:users.length,                                    label:"Total Users" },
          { val:totalAnalyses,                                   label:"Total Analyses" },
          { val:activeToday,                                     label:"Active Today" },
          { val:newToday,                                        label:"New Today" },
          { val:users.filter(u=>u.role==="admin").length,        label:"Admins" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <AdminContentTrends />

      <div className="users-table">
        <div className="table-header">👥 Registered Users ({users.length})</div>
        {users.map(u => {
          const activity=DB.getActivity(u.id);
          const todayKey=new Date().toISOString().split("T")[0];
          const todayUsage=activity[todayKey]||0;
          const last7=Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-i); return activity[d.toISOString().split("T")[0]]||0; }).reverse();
          const maxBar=Math.max(...last7,1);
          const isExpanded=expandedUser===u.id;
          return (
            <div key={u.id}>
              <div className="table-row user-detail-row" onClick={() => setExpandedUser(isExpanded?null:u.id)}>
                <div className="user-avatar" style={{ background:acColor(u.username) }}>{u.username[0].toUpperCase()}</div>
                <div className="user-info">
                  <div className="user-name">{u.username} <span className={`user-role-badge ${u.role}`}>{u.role}</span></div>
                  <div className="user-email">{u.email}</div>
                </div>
                <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:28, flexShrink:0 }}>
                  {last7.map((v,i) => (
                    <div key={i} style={{ width:6, height:`${(v/maxBar)*100}%`, minHeight:2, borderRadius:2, background:v>0?"#10b981":"var(--border)", opacity:v===0?0.3:1 }} title={`${v} analyses`} />
                  ))}
                </div>
                <div className="user-meta">
                  <div className="user-count">{u.analysisCount||0} total · {todayUsage} today</div>
                  <div className="user-date">Joined {new Date(u.joined).toLocaleDateString()}</div>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  <button className="view-history-btn" onClick={e => { e.stopPropagation(); onViewUserHistory(u.id,u.username); }}>History</button>
                  <div style={{ padding:"4px 8px", borderRadius:6, border:"1px solid var(--border)", fontSize:11, color:"var(--text-muted)", cursor:"pointer" }}>{isExpanded?"▲":"▼"}</div>
                </div>
              </div>
              {isExpanded && (
                <div style={{ padding:"0 20px 16px", borderBottom:"1px solid rgba(99,102,241,0.08)" }}>
                  <ActivityHeatmap uid={u.id} username={u.username} />
                  <DailyImprovementGraph uid={u.id} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminUserHistory({ uid, uname, onBack }) {
  const history = DB.getHistory(uid);
  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <button className="back-btn" style={{ marginBottom:8 }} onClick={onBack}>← Back to Admin</button>
          <h1 className="history-title">📋 {uname}'s History</h1>
        </div>
        <div style={{ fontSize:13, color:"var(--text-muted)" }}>{history.length} records</div>
      </div>
      {history.length===0 ? (
        <div className="history-empty"><span className="history-empty-icon">📋</span><div className="history-empty-txt">No history for this user yet</div></div>
      ) : (
        <div className="history-list">
          {history.map(item => (
            <div key={item.id} className="history-card" style={{ cursor:"default" }}>
              <div className="history-card-header">
                <div className="history-card-source">🔗 {item.source||"Unknown source"}</div>
                <div className="history-card-date">{formatDate(item.date)}</div>
              </div>
              <div className="history-card-preview">{item.summary?.replace(/[#*]/g,"").slice(0,240)}…</div>
            </div>
          ))}
        </div>
      )}
      <ActivityHeatmap uid={uid} username={uname} />
      <DailyImprovementGraph uid={uid} />
    </div>
  );
}

// ─── QUIZ VIEW ──────────────────────────────────────────────────────────────────
function QuizView({ summary, onBack, onFinish }) {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!summary) return;
    const fetchQuiz = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate-quiz", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ summary_text:summary }) });
        if (!res.ok) throw new Error("Quiz failed");
        const data = await res.json();
        if (data?.questions) {
          setQuestions(data.questions.map(q => ({
            question:q.question,
            options:q.answerOptions.map(a=>a.text),
            correct:q.answerOptions.findIndex(a=>a.isCorrect),
            explanation:q.answerOptions.find(a=>a.isCorrect)?.rationale || q.hint
          })));
        } else throw new Error("Unexpected structure");
      } catch {
        setQuestions([
          {question:"What is the primary purpose of AI summarization tools?",options:["Entertainment only","Distilling complex content into digestible insights","Replacing all human reading","Creating videos"],correct:1,explanation:"AI summarization tools extract key insights and present complex content in a concise, readable format."},
          {question:"Which format does NoteAI use to structure summaries?",options:["HTML tables","Plain text","Markdown with headers and bullets","CSV files"],correct:2,explanation:"NoteAI uses Markdown formatting with headers and bullet points for clean, scannable summaries."}
        ]);
      } finally { setLoading(false); }
    };
    fetchQuiz();
  }, [summary]);

  if (loading) return <div className="quiz-page"><div className="loading-overlay"><div className="spinner" /><div className="loading-title">Building quiz…</div></div></div>;
  if (!questions || questions.length===0) return <div className="quiz-page"><div className="error-box">Failed to load quiz.</div><button className="back-btn" onClick={onBack}>← Back</button></div>;

  if (done) {
    const pct = Math.round(score/questions.length*100);
    return (
      <div className="quiz-page">
        <div className="score-card">
          <span className="score-emoji">{pct>=75?"🏆":pct>=50?"📖":"💪"}</span>
          <div className="score-title">Quiz Complete!</div>
          <div style={{ fontSize:13, color:"var(--text-body)", marginBottom:20 }}>{pct>=75?"Excellent retention! You really understood the material.":pct>=50?"Good effort! Review your notes to improve further.":"Keep practicing — review your notes and try again!"}</div>
          <div style={{ fontFamily:"var(--ff2)", fontSize:"2rem", fontWeight:800, color:"#a5b4fc", marginBottom:20 }}>
            {score}/{questions.length}<span style={{ fontSize:"1rem", color:"var(--text-muted)", marginLeft:6 }}>({pct}%)</span>
          </div>
          <div className="score-actions">
            <button className="sa-btn primary" onClick={() => { setIdx(0); setSelected(null); setShowExp(false); setScore(0); setDone(false); }}>↺ Restart</button>
            <button className="sa-btn secondary" onClick={onBack}>← Back to Notes</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const pct = Math.round((idx+1)/questions.length*100);
  return (
    <div className="quiz-page">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ fontFamily:"var(--ff2)", fontSize:18, fontWeight:800, color:"var(--text)" }}>Knowledge Quiz</div>
        <div style={{ padding:"4px 10px", borderRadius:20, background:"rgba(99,102,241,.15)", fontSize:11, fontWeight:600, color:"#a5b4fc" }}>{score}/{questions.length}</div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--text-body)", opacity:.8, marginBottom:6 }}>
        <span>Question {idx+1} of {questions.length}</span><span>{pct}%</span>
      </div>
      <div className="qprogress-bar"><div className="qprogress-fill" style={{ width:`${pct}%` }} /></div>
      <div className="question-card">
        <div className="q-text">{q.question}</div>
        <div className="options-list">
          {q.options.map((opt,i) => {
            let cls="opt-btn", letCls="opt-letter", icon=String.fromCharCode(65+i);
            if (showExp && i===q.correct) { cls+=" correct"; letCls+=" correct"; icon="✓"; }
            else if (showExp && selected===i) { cls+=" wrong"; letCls+=" wrong"; icon="✗"; }
            return (
              <button key={i} className={cls} disabled={showExp} onClick={() => {
                if (showExp) return;
                setSelected(i); setShowExp(true);
                if (i===q.correct) setScore(s=>s+1);
              }}>
                <span className={letCls}>{icon}</span>{opt}
              </button>
            );
          })}
        </div>
        {showExp && (
          <div className="explanation-box">
            <p><strong>Explanation:</strong> {q.explanation}</p>
            <button className="next-btn" onClick={() => {
              setSelected(null); setShowExp(false);
              if (idx+1 < questions.length) {
                setIdx(idx+1);
              } else {
                setDone(true);
                onFinish && onFinish(score, questions.length);
              }
            }}>
              {idx+1 < questions.length ? "Next →" : "Finish"}
            </button>
            <div style={{ clear:"both" }} />
          </div>
        )}
      </div>
    </div>
  );
}
