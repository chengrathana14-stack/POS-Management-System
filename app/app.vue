<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  /* Brand Primary Colors */
  --pos-primary: #2563eb;
  --pos-primary-hover: #1d4ed8;
  --pos-primary-light: #eff6ff;
  --pos-primary-gradient: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  
  /* Sidebar & Dark Surfaces */
  --pos-navy: #090e1a;
  --pos-navy-card: #111827;
  --pos-navy-light: #1e293b;
  --pos-navy-border: rgba(255, 255, 255, 0.08);

  /* Light Theme Canvas */
  --pos-bg: #f8fafc;
  --pos-card-bg: #ffffff;
  --pos-border: #e2e8f0;
  --pos-border-subtle: #f1f5f9;
  
  /* Modern Text Tokens */
  --pos-text-main: #0f172a;
  --pos-text-secondary: #475569;
  --pos-text-muted: #64748b;
  --pos-text-light: #94a3b8;

  /* Accent Colors */
  --pos-emerald: #10b981;
  --pos-emerald-light: #ecfdf5;
  --pos-emerald-gradient: linear-gradient(135deg, #10b981 0%, #059669 100%);

  --pos-violet: #8b5cf6;
  --pos-violet-light: #f5f3ff;
  --pos-violet-gradient: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);

  --pos-amber: #f59e0b;
  --pos-amber-light: #fffbeb;
  --pos-amber-gradient: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);

  --pos-rose: #ef4444;
  --pos-rose-light: #fef2f2;
  --pos-rose-gradient: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--pos-bg);
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: var(--pos-text-main);
  min-height: 100vh;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Sleek Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Monospace font for numbers, currency, SKUs & Receipts */
.font-monospace {
  font-family: 'JetBrains Mono', monospace !important;
}

/* High-End Glass & Card Styles */
.card {
  border-radius: var(--radius-lg) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  background-color: #ffffff;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
}

.shadow-sm {
  box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.02) !important;
}

.shadow-md {
  box-shadow: 0 8px 16px -2px rgba(15, 23, 42, 0.06), 0 4px 8px -2px rgba(15, 23, 42, 0.03) !important;
}

.shadow-lg {
  box-shadow: 0 16px 32px -4px rgba(15, 23, 42, 0.08), 0 6px 12px -3px rgba(15, 23, 42, 0.04) !important;
}

.shadow-xl {
  box-shadow: 0 24px 48px -12px rgba(15, 23, 42, 0.12) !important;
}

.shadow-glow-blue {
  box-shadow: 0 8px 24px -4px rgba(37, 99, 235, 0.35) !important;
}

.shadow-glow-green {
  box-shadow: 0 8px 24px -4px rgba(16, 185, 129, 0.35) !important;
}

/* Tactile Buttons */
.btn {
  font-family: 'Plus Jakarta Sans', sans-serif;
  border-radius: var(--radius-md);
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: var(--pos-primary-gradient);
  border: none;
  color: #ffffff;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: scale(0.98);
}

/* Badges */
.badge {
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 0.35em 0.65em;
  border-radius: var(--radius-sm);
}

/* Form Controls with Smooth Glowing Focus Rings */
.form-control, .form-select {
  border-radius: var(--radius-md);
  border-color: var(--pos-border);
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--pos-text-main);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-control:focus, .form-select:focus {
  border-color: var(--pos-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

/* Interactive Hover Utility */
.hover-lift {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.08) !important;
}
</style>