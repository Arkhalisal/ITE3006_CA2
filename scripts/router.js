import { initializeHomePage } from "./home.js";
import { initializeForum } from "./forum.js";
import { initializePost } from "./post.js";
import { initializeContact } from "./contact.js";

const ROUTES = {
  HOME: "/",
  FORUM: "/forum",
  POST: "/forum/post",
  ABOUT: "/about",
  CONTACT: "/contact",
};

const routes = [
  { path: ROUTES.HOME, file: "../pages/home.html", buttonText: "Home" },
  { path: ROUTES.ABOUT, file: "../pages/about.html", buttonText: "About" },
  {
    path: ROUTES.FORUM,
    file: "../pages/forum.html",
    buttonText: "Forum",
  },
  {
    path: ROUTES.POST,
    file: "../pages/post.html",
    buttonText: "Post",
  },
  {
    path: ROUTES.CONTACT,
    file: "../pages/contact.html",
    buttonText: "Contact",
  },
];

const generateAllLinkButtons = () => {
  const linksContainer = document.getElementById("navButtonContainer");
  linksContainer.innerHTML = "";

  // Check if screen width is below 768px
  if (window.innerWidth < 768) {
    // Create dropdown for mobile
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const dropdownButton = document.createElement("button");
    dropdownButton.classList.add("dropdownButton");
    const menuIcon = "../public/icons/menu.png";
    dropdownButton.innerHTML = `<img src="${menuIcon}" alt="Menu Icon" />`;

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdownContent");

    routes.forEach((route) => {
      if (route.path === ROUTES.POST) return; // Skip post route in dropdown

      const linkButton = document.createElement("button");
      linkButton.setAttribute("href", `#${route.path}`);
      linkButton.classList.add("navButton");
      linkButton.innerHTML = route.buttonText;
      dropdownContent.appendChild(linkButton);
    });

    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(dropdownContent);
    linksContainer.appendChild(dropdown);

    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownContent.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      dropdownContent.classList.remove("show");
    });
  } else {
    // Create regular buttons for desktop
    routes.forEach((route) => {
      if (route.path === ROUTES.POST) return; // Skip post route in desktop nav

      const linkButton = document.createElement("button");
      linkButton.setAttribute("href", `#${route.path}`);
      linkButton.classList.add("navButton");
      linkButton.innerHTML = route.buttonText;
      linksContainer.appendChild(linkButton);
    });
  }
};

// Helper function to get the current path from hash
const getHashPath = () => {
  const hash = window.location.hash.slice(1);
  const path = hash || "/";

  // Remove query parameters from the path
  const queryIndex = path.indexOf("?");
  if (queryIndex !== -1) {
    return path.substring(0, queryIndex);
  }

  return path;
};

// Helper function to get search query from URL hash
const getSearchQuery = () => {
  const hash = window.location.hash;
  const queryIndex = hash.indexOf("?");
  if (queryIndex !== -1) {
    const queryString = hash.substring(queryIndex + 1);
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("q") || "";
  }
  return "";
};

// Helper function to get post ID from URL hash
const getPostId = () => {
  const hash = window.location.hash;
  const queryIndex = hash.indexOf("?");
  if (queryIndex !== -1) {
    const queryString = hash.substring(queryIndex + 1);
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id") || "";
  }
  return "";
};

// Helper function to set active class on link buttons
const setLinkButtonsActive = () => {
  const currentPath = getHashPath();
  const linkButtons = document.querySelectorAll(".navButton");
  linkButtons.forEach((button) => {
    const href = button.getAttribute("href").replace("#", "");
    // Handle special case for post page
    if (href === ROUTES.FORUM && currentPath === ROUTES.POST) {
      button.classList.add("active");
      return;
    }

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

      switch (path) {
        case ROUTES.HOME:
          initializeHomePage();
          break;
        case ROUTES.FORUM:
          const searchQuery = getSearchQuery();
          initializeForum(searchQuery);
          break;
        case ROUTES.POST:
          const postId = getPostId();
          initializePost(postId);
          break;
        case ROUTES.CONTACT:
          initializeContact();
          break;
      }
    } catch (error) {
      console.error("Error loading page:", error);
    }
  } else {
    pageContainer.innerHTML = "<h1>404 - Not Found</h1>";
  }
};

// Handle hash changes
window.addEventListener("hashchange", () => {
  loadPage(getHashPath());
});

// Function to handle home page search
const handleHomeSearch = () => {
  const searchInput = document.getElementById("home-search-input");
  if (searchInput && searchInput.value.trim()) {
    const query = searchInput.value.trim();
    window.location.hash = `#/forum?q=${encodeURIComponent(query)}`;
  }
};

document.addEventListener("click", (event) => {
  // Handle navigation button clicks
  if (event.target.classList.contains("navButton")) {
    const href = event.target.getAttribute("href");
    event.preventDefault();

    const currentPath = getHashPath();

    // prevent loading the same page
    if (currentPath === href) {
      return;
    }

    window.location.hash = href;
  }

  // Handle home search button click
  if (event.target.id === "home-search-button") {
    event.preventDefault();
    handleHomeSearch();
  }
});

// Handle Enter key press on search input
document.addEventListener("keypress", (event) => {
  if (event.target.id === "home-search-input" && event.key === "Enter") {
    event.preventDefault();
    handleHomeSearch();
  }
});

// Load the initial page
document.addEventListener("DOMContentLoaded", () => {
  generateAllLinkButtons();
  loadPage(getHashPath());
});

// Handle window resize to switch between desktop and mobile navigation
window.addEventListener("resize", () => {
  generateAllLinkButtons();
  setLinkButtonsActive();
});
