const ROUTES = {
  HOME: "/",
  FORUM: "/forum",
  ABOUT: "/about",
  CONTACT: "/contact",
};

const routes = [
  { path: ROUTES.HOME, file: "../pages/home.html", buttonText: "Home" },
  {
    path: ROUTES.FORUM,
    file: "../pages/forum.html",
    buttonText: "Forum",
  },
  { path: ROUTES.ABOUT, file: "../pages/about.html", buttonText: "About" },
  {
    path: ROUTES.CONTACT,
    file: "../pages/contact.html",
    buttonText: "Contact",
  },
];

const generateAllLinkButtons = () => {
  const linksContainer = document.getElementById("links");
  routes.forEach((route) => {
    const linkButton = document.createElement("a");
    linkButton.setAttribute("href", `#${route.path}`);
    linkButton.classList.add("link_button");
    linkButton.innerHTML = `<p>${route.buttonText}</p>`;
    linksContainer.appendChild(linkButton);
  });
};

// Helper function to get the current path from hash
const getHashPath = () => {
  const hash = window.location.hash.slice(1);
  return hash || "/";
};

// Helper function to set active class on link buttons
const setLinkButtonsActive = () => {
  const currentPath = getHashPath();
  const linkButtons = document.querySelectorAll(".link_button");
  linkButtons.forEach((button) => {
    const href = button.getAttribute("href").replace("#", "");
    if (href === currentPath) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
};

/**
 * Load a page based on the given path.
 * @param {string} path - The path of the page to load.
 */
const loadPage = async (path) => {
  const route = routes.find((r) => r.path === path);
  const pageContainer = document.getElementById("page");

  // Find can return undefined, so we check if route exists
  if (route) {
    try {
      // Fetch the HTML content of the page and insert it into the container
      const response = await fetch(route.file, {
        headers: {
          "Content-Type": "text/html",
        },
      });
      const content = await response.text();
      pageContainer.innerHTML = content;
      setLinkButtonsActive();
    } catch (error) {
      console.error("Error loading page:", error);
    }
  } else {
    pageContainer.innerHTML = "<h1>404 - Not Found</h1>";
  }
};

// Handle link clicks
document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const href = event.target.getAttribute("href");
    event.preventDefault();

    const currentPath = getHashPath();

    // prevent loading the same page
    if (currentPath === href) {
      return;
    }

    window.location.hash = href;
  }
});

// Handle hash changes
window.addEventListener("hashchange", () => {
  loadPage(getHashPath());
});

// Load the initial page
document.addEventListener("DOMContentLoaded", () => {
  generateAllLinkButtons();
  loadPage(getHashPath());
});
