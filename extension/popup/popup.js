"use strict";

const api = globalThis.browser ?? globalThis.chrome;

// Muss mit DEFAULTS in content/content.js übereinstimmen.
const DEFAULTS = {
  enabled: true,
  width: "wide",
  compactHeader: true,
  hideA11y: false,
  denseCards: true,
  compactCourse: true,
  polish: true,
  readable: true,
  sysFont: false,
  compactForms: true,
  formColumns: true,
};

const BOOLS = Object.keys(DEFAULTS).filter((k) => typeof DEFAULTS[k] === "boolean");

function render(s) {
  for (const key of BOOLS) {
    const el = document.getElementById(key);
    if (el) el.checked = !!s[key];
  }
  for (const r of document.querySelectorAll('input[name="width"]')) {
    r.checked = r.value === s.width;
  }
  document.getElementById("options").classList.toggle("off", !s.enabled);
}

function save(patch) {
  return api.storage.sync.set(patch);
}

api.storage.sync.get(DEFAULTS).then(render);

for (const key of BOOLS) {
  const el = document.getElementById(key);
  if (!el) continue;
  el.addEventListener("change", () => {
    save({ [key]: el.checked });
    if (key === "enabled") {
      document.getElementById("options").classList.toggle("off", !el.checked);
    }
  });
}

for (const r of document.querySelectorAll('input[name="width"]')) {
  r.addEventListener("change", () => r.checked && save({ width: r.value }));
}

document.getElementById("reset").addEventListener("click", async () => {
  await api.storage.sync.set(DEFAULTS);
  render(DEFAULTS);
});
