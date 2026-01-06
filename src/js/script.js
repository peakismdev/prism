// src/js/script.js
// General site behavior: smooth navigation and "Join Our Discord" button.

document.addEventListener("DOMContentLoaded", () => {
  /* -------- Smooth scroll for navbar anchors -------- */

  const navLinks = document.querySelectorAll('.nav-menu a[href*="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const targetId = href.slice(hashIndex + 1); // works for "#home" or "/#home"
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      // Update hash without jump
      if (history.pushState) {
        history.pushState(null, "", "#" + targetId);
      } else {
        window.location.hash = "#" + targetId;
      }
    });
  });

  /* -------- Join Our Discord button -------- */

  const joinBtn = document.getElementById("joinBtn");
  if (joinBtn) {
    joinBtn.addEventListener("click", () => {
      const discordInvite = "https://discord.gg/9tYPqQU4rJ";
      window.open(discordInvite, "_blank", "noopener,noreferrer");
    });
  }

  /* -------- Logo click -> scroll to home/top -------- */

  const logo = document.getElementById("logo");
  if (logo) {
    logo.addEventListener("click", () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
});
