// src/js/settings.js
// Handles opening/closing the settings menu and switching CSS themes.

document.addEventListener("DOMContentLoaded", () => {
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsMenu = document.getElementById("settingsMenu");
  const styleSelect = document.getElementById("styleSelect");

  const THEME_STORAGE_KEY = "prism-selected-theme";

  // Prefer the globalStyle.css link; otherwise first non-fontawesome stylesheet
  const themeLink =
    document.querySelector(
      'link[rel="stylesheet"][href$="src/css/globalStyle.css"]'
    ) ||
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(
      (link) => !/font-awesome|fontawesome|cdnjs/i.test(link.href)
    );

  /* ---------- Settings menu toggle ---------- */

  function openSettings() {
    if (!settingsMenu) return;
    settingsMenu.classList.add("is-open");
    settingsMenu.style.display = "block";
  }

  function closeSettings() {
    if (!settingsMenu) return;
    settingsMenu.classList.remove("is-open");
    settingsMenu.style.display = "none";
  }

  if (settingsBtn && settingsMenu) {
    settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = settingsMenu.classList.contains("is-open");
      if (isOpen) {
        closeSettings();
      } else {
        openSettings();
      }
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!settingsMenu.classList.contains("is-open")) return;
      const container = settingsMenu.closest(".settings-container");
      if (container && !container.contains(e.target)) {
        closeSettings();
      }
    });

    // Escape key closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSettings();
      }
    });
  }

  /* ---------- Theme switching ---------- */

  function applyTheme(href) {
    if (!themeLink || !href) return;
    themeLink.setAttribute("href", href);
  }

  // On load: restore theme from localStorage
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme && themeLink) {
    applyTheme(savedTheme);

    if (styleSelect) {
      const found = Array.from(styleSelect.options).find(
        (opt) => opt.value === savedTheme
      );
      if (found) {
        styleSelect.value = savedTheme;
      }
    }
  }

  // Change theme from <select>
  if (styleSelect && themeLink) {
    styleSelect.addEventListener("change", () => {
      const newHref = styleSelect.value;
      applyTheme(newHref);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newHref);
      } catch {
        // ignore storage errors
      }
    });
  }
});
