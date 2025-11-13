// Navigation utility functions
export const generateNavigation = (activePage, basePath = "../") => {
  const navContainer = document.getElementById("navButtonContainer");
  const routes = [
    { path: basePath === "../" ? "../index.html" : "./index.html", text: "Home" },
    { path: basePath + "pages/about.html", text: "About" },
    { path: basePath + "pages/forum.html", text: "Forum" },
    { path: basePath + "pages/contact.html", text: "Contact" },
  ];

  // Clear existing content
  navContainer.innerHTML = "";

  // Check if mobile view
  if (window.innerWidth < 768) {
    // Create dropdown
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const dropdownButton = document.createElement("button");
    dropdownButton.classList.add("dropdownButton");
    const menuIconPath =
      basePath === "../" ? "../public/icons/menu.png" : "./public/icons/menu.png";
    dropdownButton.innerHTML = `<img src="${menuIconPath}" alt="Menu" />`;

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdownContent");

    routes.forEach((route) => {
      const link = document.createElement("a");
      link.href = route.path;
      link.classList.add("navButton");
      if (route.text === activePage) link.classList.add("active");
      link.textContent = route.text;
      dropdownContent.appendChild(link);
    });

    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(dropdownContent);
    navContainer.appendChild(dropdown);

    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownContent.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      dropdownContent.classList.remove("show");
    });
  } else {
    // Desktop navigation
    routes.forEach((route) => {
      const link = document.createElement("a");
      link.href = route.path;
      link.classList.add("navButton");
      if (route.text === activePage) link.classList.add("active");
      link.textContent = route.text;
      navContainer.appendChild(link);
    });
  }
};

// Initialize navigation for any page
export const initializeNavigation = (activePage, basePath = "../") => {
  generateNavigation(activePage, basePath);

  // Handle window resize
  window.addEventListener("resize", () => {
    generateNavigation(activePage, basePath);
  });
};
