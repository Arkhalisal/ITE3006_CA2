const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
};

const routes = [
  { path: ROUTES.HOME, file: "../pages/home.html" },
  { path: ROUTES.ABOUT, file: "../pages/about.html" },
];

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

    // prevent loading the same page
    if (window.location.pathname === href) {
      return;
    }

    history.pushState(null, "", href);
    loadPage(href);
  }
});

// Handle browser navigation (back/forward)
window.addEventListener("popstate", () => {
  loadPage(window.location.pathname);
});

// Load the initial page
document.addEventListener("DOMContentLoaded", () => {
  const defaultPath = "/";
  loadPage(defaultPath);
});
