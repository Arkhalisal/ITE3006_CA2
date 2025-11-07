const ROUTES = {
  HOME: "/",
  FORUM: "/forum",
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
      const linkButton = document.createElement("button");
      linkButton.setAttribute("href", `#${route.path}`);
      linkButton.classList.add("navButton");
      linkButton.innerHTML = route.buttonText;
      dropdownContent.appendChild(linkButton);
    });

    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(dropdownContent);
    linksContainer.appendChild(dropdown);

    // Toggle dropdown on button click
    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownContent.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      dropdownContent.classList.remove("show");
    });
  } else {
    // Create regular buttons for desktop
    routes.forEach((route) => {
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

// Helper function to set active class on link buttons
const setLinkButtonsActive = () => {
  const currentPath = getHashPath();
  const linkButtons = document.querySelectorAll(".navButton");
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

      // Handle search query for forum page
      if (path === ROUTES.FORUM) {
        const searchQuery = getSearchQuery();
        if (searchQuery) {
          // Wait for the content to be loaded, then handle search
          setTimeout(() => {
            handleForumSearch(searchQuery);
          }, 100);
        }
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

// Function to handle forum search
const handleForumSearch = (query) => {
  const searchInput = document.getElementById("forum-search-input");
  const searchResults = document.getElementById("forum-search-results");
  const searchQueryDisplay = document.getElementById("search-query-display");
  const searchResultsList = document.getElementById("search-results-list");

  if (searchInput && query) {
    // Set the search input value
    searchInput.value = query;

    // Show search results section
    if (searchResults) {
      searchResults.style.display = "block";
    }

    // Display the search query
    if (searchQueryDisplay) {
      searchQueryDisplay.textContent = query;
    }

    // Mock search results (replace with actual search logic)
    if (searchResultsList) {
      searchResultsList.innerHTML = `
        <div class="search-result">
          <h4>Travel Tips for ${query}</h4>
          <p>Discover the best places to visit in ${query} and get insider tips from fellow travelers.</p>
        </div>
        <div class="search-result">
          <h4>Best Time to Visit ${query}</h4>
          <p>Find out when is the perfect season to explore ${query} for the best experience.</p>
        </div>
        <div class="search-result">
          <h4>${query} Travel Guide</h4>
          <p>Complete travel guide with recommendations for accommodations, restaurants, and activities in ${query}.</p>
        </div>
      `;
    }
  }
};

// Function to handle home page search
const handleHomeSearch = () => {
  const searchInput = document.getElementById("home-search-input");
  if (searchInput && searchInput.value.trim()) {
    const query = searchInput.value.trim();
    window.location.hash = `#/forum?q=${encodeURIComponent(query)}`;
  }
};

// Handle clicks on the page (including dynamically loaded content)
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
