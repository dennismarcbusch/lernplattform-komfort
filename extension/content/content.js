/*
 * Lernplattform Komfort (inoffiziell) – Content-Script
 * Setzt je nach Einstellung data-lpk-*-Attribute auf <html>.
 * Das eigentliche Aussehen steckt in content.css.
 * Keine Netzwerkzugriffe, kein Auslesen von Inhalten, keine Telemetrie.
 */
(() => {
  "use strict";

  const api = globalThis.browser ?? globalThis.chrome;

  const DEFAULTS = {
    enabled: true,
    width: "wide",          // "default" | "wide" | "full"
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

  const FLAGS = {
    compactHeader: "lpkCompactHeader",
    hideA11y: "lpkHideA11y",
    denseCards: "lpkDenseCards",
    compactCourse: "lpkCompactCourse",
    polish: "lpkPolish",
    readable: "lpkReadable",
    sysFont: "lpkSysfont",
    compactForms: "lpkCompactForms",
    formColumns: "lpkFormColumns",
  };

  const root = document.documentElement;
  let current = { ...DEFAULTS };

  function apply(settings) {
    current = { ...DEFAULTS, ...settings };
    const d = root.dataset;

    if (!current.enabled) {
      delete d.lpkOn;
      delete d.lpkWidth;
      for (const key of Object.values(FLAGS)) delete d[key];
      updateShadowStyle();
      return;
    }

    d.lpkOn = "";
    d.lpkWidth = current.width;
    for (const [setting, key] of Object.entries(FLAGS)) {
      if (current[setting]) d[key] = "";
      else delete d[key];
    }
    updateShadowStyle();
  }

  /*
   * Die Barrierefreiheitsleiste (A-, A+, Dark Mode …) liegt im Shadow DOM
   * der ByCS-Kopfzeile. Normales CSS erreicht sie dort nicht, deshalb hängen
   * wir bei Bedarf ein kleines <style> in dieses Shadow DOM.
   */
  const SHADOW_CSS = `
    @media (min-width: 1024px) {
      #root > .hidden.lg-block { display: none !important; }
      .topbar.pull-up { transform: none !important; }
    }`;

  function updateShadowStyle() {
    const topbar = document.querySelector("bycs-topbar");
    const shadow = topbar && topbar.shadowRoot;
    if (!shadow) return false;
    let style = shadow.getElementById("lpk-shadow-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "lpk-shadow-style";
      style.textContent = SHADOW_CSS;
      shadow.appendChild(style);
    }
    style.media = current.enabled && current.hideA11y ? "all" : "not all";
    return true;
  }

  // Die Kopfzeile wird erst nach dem Laden der Seite aufgebaut.
  function waitForTopbar() {
    if (updateShadowStyle()) return;
    const obs = new MutationObserver(() => {
      if (updateShadowStyle()) obs.disconnect();
    });
    obs.observe(root, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 15000);
  }

  function load() {
    // Chrome (MV3) und Firefox liefern hier beide ein Promise.
    api.storage.sync.get(DEFAULTS).then(apply).catch(() => apply(DEFAULTS));
  }

  // Sofort mit Standardwerten anwenden, damit die Seite nicht springt,
  // danach die gespeicherten Einstellungen nachladen.
  apply(DEFAULTS);
  load();

  api.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    const next = { ...current };
    for (const [k, v] of Object.entries(changes)) next[k] = v.newValue;
    apply(next);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForTopbar, { once: true });
  } else {
    waitForTopbar();
  }
})();
