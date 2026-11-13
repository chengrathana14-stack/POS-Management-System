<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --pos-primary: #1877f2;
  --pos-primary-hover: #1464cc;
  --pos-navy: #0b1e36;
  --pos-navy-light: #132a48;
  --pos-bg: #f4f6fa;
  --pos-card-bg: #ffffff;
  --pos-border: #e2e8f0;
  --pos-text-main: #0f172a;
  --pos-text-muted: #64748b;
  --pos-orange: #f97316;
  --pos-green: #10b981;
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

/* Monospace font for SKUs & Receipts */
.font-monospace {
  font-family: 'JetBrains Mono', monospace !important;
}

/* Refined Shadows & Cards */
.card {
  border-radius: 12px !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
}

.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-sm {
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05) !important;
}

.shadow-md {
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04) !important;
}

.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05) !important;
}

/* Smooth Buttons */
.btn {
  font-family: 'Plus Jakarta Sans', sans-serif;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background-color: var(--pos-primary);
  border-color: var(--pos-primary);
}

.btn-primary:hover {
  background-color: var(--pos-primary-hover);
  border-color: var(--pos-primary-hover);
}

/* Keypad & Badges */
.badge {
  font-weight: 600;
  letter-spacing: 0.02em;
}
</style>
