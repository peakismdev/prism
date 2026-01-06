// src/js/auth.js
// Simple placeholder auth helper. Currently only handles "Logout" button.
// You can extend this later with real authentication / sessions.

(function () {
  const STORAGE_KEY = "prism-auth";

  function getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { isLoggedIn: true }; // default: logged in
    } catch {
      return { isLoggedIn: true };
    }
  }

  function setState(partial) {
    const current = getState();
    const next = { ...current, ...partial };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
    return next;
  }

  function logout() {
    setState({ isLoggedIn: false });
    alert("You have been logged out.");
    // Adjust if your homepage is in a subfolder
    window.location.href = "/";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    }
  });

  // Optional global API
  window.PrismAuth = {
    getState,
    setState,
    logout,
    isLoggedIn: () => getState().isLoggedIn,
  };
})();
