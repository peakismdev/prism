// src/js/releases.js
// Populates the "Releases" navbar dropdown and the folder tree in the Releases section.

document.addEventListener("DOMContentLoaded", () => {
  const dropdownMenu = document.getElementById("releasesDropdownMenu");
  const releasesDropdown = document.getElementById("releasesDropdown");
  const releasesFolderTree = document.getElementById("releases-folder-tree");

  /* ---------------- Release data ---------------- */

  const releasesData = [
    {
      category: "C# Scripts",
      items: [
        {
          name: "Climbing V1.0.1",
          description: "Climbing system package for Gorilla Tag fan games.",
          url: "https://github.com/piksm/prism/raw/refs/heads/main/Climbing.V1.0.1.unitypackage",
        },
        {
          name: "Grabbing V1.0.1",
          description: "Grabbing / interaction system.",
          url: "https://github.com/piksm/prism/raw/refs/heads/main/Grabbing.V1.0.1.unitypackage",
        },
        {
          name: "Swimming V1.0.0",
          description: "Swimming mechanics tuned for VR.",
          url: "https://github.com/piksm/prism/raw/refs/heads/main/Swimming.V1.0.0.unitypackage",
        },
        {
          name: "Ice V1.0.0",
          description: "Ice movement / sliding mechanics.",
          url: "https://github.com/piksm/prism/raw/refs/heads/main/Ice.V1.0.0.unitypackage",
        },
        {
          name: "Prism Inputs V1.0.0",
          description: "Input system setup for Prism packages.",
          url: "https://github.com/piksm/prism/raw/refs/heads/main/Prism%20Inputs%20V1.0.0%20Release.unitypackage",
        },
      ],
    },
    {
      category: "HLSL / Visual",
      items: [
        {
          name: "Dither 1.0.1",
          description: "Dithering visual effect package.",
          url: "https://github.com/piksm/prism/raw/refs/heads/main/Dither.1.0.1.unitypackage",
        },
      ],
    },
    {
      category: "Music & SFX",
      items: [
        {
          name: "Hitsounds V1.0.0",
          description: "Hit sound effects for feedback and impact.",
          url: "https://github.com/piksm/prism/raw/refs/heads/main/Hitsounds.V1.0.0.unitypackage",
        },
      ],
    },
  ];

  /* ---------------- Navbar dropdown ---------------- */

  function buildReleasesDropdown(menuEl, data) {
    if (!menuEl) return;
    menuEl.innerHTML = "";

    data.forEach((group) => {
      const headerLi = document.createElement("li");
      headerLi.className = "dropdown-category";
      headerLi.textContent = group.category;
      menuEl.appendChild(headerLi);

      group.items.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.url;
        a.textContent = item.name;
        a.title = item.description || item.name;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        li.appendChild(a);
        menuEl.appendChild(li);
      });
    });
  }

  function setupDropdownBehavior() {
    if (!releasesDropdown || !dropdownMenu) return;

    const toggle = releasesDropdown.querySelector(".dropdown-toggle");

    function open() {
      dropdownMenu.classList.add("is-open");
      dropdownMenu.style.display = "block";
    }

    function close() {
      dropdownMenu.classList.remove("is-open");
      dropdownMenu.style.display = "none";
    }

    if (toggle) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.contains("is-open");
        if (isOpen) close();
        else open();
      });
    }

    // Click outside closes
    document.addEventListener("click", (e) => {
      if (!dropdownMenu.classList.contains("is-open")) return;
      if (!releasesDropdown.contains(e.target)) {
        close();
      }
    });

    // Esc closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        close();
      }
    });
  }

  /* ---------------- Folder tree in Releases section ---------------- */

  function buildFolderTree(container, data) {
    if (!container) return;

    container.innerHTML = "";

    const rootList = document.createElement("ul");
    rootList.className = "folder-tree-root";

    data.forEach((group) => {
      const categoryLi = document.createElement("li");
      categoryLi.className = "folder-tree-category";

      const categoryTitle = document.createElement("div");
      categoryTitle.className = "folder-tree-category-title";
      categoryTitle.textContent = group.category;

      const itemsUl = document.createElement("ul");
      itemsUl.className = "folder-tree-items";

      group.items.forEach((item) => {
        const itemLi = document.createElement("li");
        itemLi.className = "folder-tree-item";

        const link = document.createElement("a");
        link.className = "folder-tree-link";
        link.href = item.url;
        link.textContent = item.name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        if (item.description) {
          const desc = document.createElement("span");
          desc.className = "folder-tree-description";
          desc.textContent = item.description;
          itemLi.appendChild(desc);
        }

        itemLi.insertBefore(link, itemLi.firstChild);
        itemsUl.appendChild(itemLi);
      });

      categoryLi.appendChild(categoryTitle);
      categoryLi.appendChild(itemsUl);
      rootList.appendChild(categoryLi);
    });

    container.appendChild(rootList);
  }

  /* ---------------- Init ---------------- */

  if (dropdownMenu) {
    buildReleasesDropdown(dropdownMenu, releasesData);
    setupDropdownBehavior();
  }

  if (releasesFolderTree) {
    buildFolderTree(releasesFolderTree, releasesData);
  }
});
