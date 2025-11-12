import { forumPosts } from "./constant.js";

export const initializeForum = (input) => {
  const searchInput = document.getElementById("forum-search-input");

  // Set initial input value
  searchInput.value = input;
  generateContent(input);

  searchInput.addEventListener("input", () => {
    const currentInput = searchInput.value.trim();
    generateContent(currentInput, false); // Pass false for search
  });

  const newPostButton = document.getElementById("new-post-button");
  newPostButton.addEventListener("click", () => {
    openNewPostModal();
  });

  // Setup modal event listeners
  setupModalEventListeners();
};

const generateContent = (searchTerm, isInitialLoad = true) => {
  const content = document.getElementById("forum-content");

  // Clear existing content only on initial load or search
  if (isInitialLoad) {
    content.innerHTML = "";
  }

  // Filter posts based on search term
  const filteredPosts = forumPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If not initial load, we're doing a search, so regenerate everything
  if (!isInitialLoad) {
    content.innerHTML = "";
  }

  filteredPosts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("forum-post");

    // Remove animation delay for input searching
    if (!isInitialLoad) {
      postElement.style.animation = "none";
      postElement.style.opacity = "1";
      postElement.style.transform = "translateY(0)";
    }

    const dayAgo = Math.floor((Date.now() - new Date(post.created_at)) / (1000 * 60 * 60 * 24));
    post.date = dayAgo === 0 ? "Today" : `${dayAgo} day(s) ago`;

    postElement.innerHTML = `
      <p class="forum-post-title">${post.title}</p>
      <div class="forum-post-meta">
        <p class="forum-post-author">
          <span class="forum-post-author-initial">${post.author.slice(0, 1)}</span>${post.author}
        </p>
        <p>Location: ${post.location}</p>
        <p>Date: ${post.date}</p>
      </div>
      <p class="forum-post-content">${post.content}</p>
      <div class="forum-post-fixed-content">
        <button class="forum-post-like-button">❤️ (${post.likes || 0})</button>
        <button class="forum-post-comment-button">💬 (${
          post.comments ? post.comments.length : post.commentCount || 0
        })</button>
      </div>
    `;

    postElement.addEventListener("click", () => {
      window.location.hash = `#/forum/post?id=${post.id}`;
    });

    content.appendChild(postElement);
  });

  if (filteredPosts.length === 0) {
    content.innerHTML = "<p>No posts found.</p>";
  }
};

// Function to add a single new post with animation
const addNewPostToDOM = (newPost) => {
  const content = document.getElementById("forum-content");
  const postElement = document.createElement("div");

  postElement.classList.add("forum-post");
  postElement.classList.add("new-post-animation");

  const dayAgo = Math.floor((Date.now() - new Date(newPost.created_at)) / (1000 * 60 * 60 * 24));
  newPost.date = dayAgo === 0 ? "Today" : `${dayAgo} day(s) ago`;

  postElement.innerHTML = `
    <p class="forum-post-title">${newPost.title}</p>
    <div class="forum-post-meta">
      <p class="forum-post-author">
        <span class="forum-post-author-initial">${newPost.author.slice(0, 1)}</span>${
    newPost.author
  }
      </p>
      <p>Location: ${newPost.location}</p>
      <p>Date: ${newPost.date}</p>
    </div>
    <p class="forum-post-content">${newPost.content}</p>
    <div class="forum-post-fixed-content">
      <button class="forum-post-like-button">❤️ (${newPost.likes || 0})</button>
      <button class="forum-post-comment-button">💬 (${
        newPost.comments ? newPost.comments.length : newPost.commentCount || 0
      })</button>
    </div>
  `;

  postElement.addEventListener("click", () => {
    window.location.hash = `#/forum/post?id=${newPost.id}`;
  });

  // Insert at the beginning of the content
  content.insertBefore(postElement, content.firstChild);
};

const openNewPostModal = () => {
  const modal = document.getElementById("new-post-modal");
  const overlay = document.getElementById("modal-overlay");

  modal.style.display = "block";
  overlay.style.display = "block";

  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";

  // Focus on the first input
  const firstInput = document.getElementById("post-title");
  setTimeout(() => firstInput.focus(), 100);
};

const closeNewPostModal = () => {
  const modal = document.getElementById("new-post-modal");
  const overlay = document.getElementById("modal-overlay");

  modal.style.display = "none";
  overlay.style.display = "none";

  // Restore body scroll
  document.body.style.overflow = "";

  // Clear form
  const form = document.getElementById("new-post-form");
  form.reset();
};

const setupModalEventListeners = () => {
  const modal = document.getElementById("new-post-modal");
  const overlay = document.getElementById("modal-overlay");
  const closeButton = document.querySelector(".close-modal");
  const cancelButton = document.getElementById("cancel-post");
  const form = document.getElementById("new-post-form");

  // Close modal when clicking close button
  closeButton.addEventListener("click", closeNewPostModal);

  // Close modal when clicking cancel button
  cancelButton.addEventListener("click", closeNewPostModal);

  // Close modal when clicking overlay
  overlay.addEventListener("click", closeNewPostModal);

  // Close modal when pressing Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeNewPostModal();
    }
  });

  // Handle form submission
  form.addEventListener("submit", handleNewPostSubmit);
};

const handleNewPostSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newPost = {
    id: (forumPosts.length + 1).toString(),
    title: formData.get("title").trim(),
    content: formData.get("content").trim(),
    location: formData.get("location").trim(),
    author: formData.get("author").trim(),
    created_at: new Date().toISOString(),
    likes: 0,
    liked: false,
    comments: [],
  };

  // Validate required fields
  if (!newPost.title || !newPost.content || !newPost.location || !newPost.author) {
    alert("Please fill in all required fields.");
    return;
  }

  // Add the new post to the beginning of the array
  forumPosts.unshift(newPost);

  closeNewPostModal();

  // Check if there's a current search filter
  const currentSearch = document.getElementById("forum-search-input").value.trim();

  // If there's no search filter, or the new post matches the search, just add it
  if (
    !currentSearch ||
    newPost.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
    newPost.content.toLowerCase().includes(currentSearch.toLowerCase()) ||
    newPost.location.toLowerCase().includes(currentSearch.toLowerCase())
  ) {
    // Only add the new post to DOM with animation
    addNewPostToDOM(newPost);
  } else {
    // If there's a search filter and the new post doesn't match,
    // we need to regenerate to show proper filtered results
    generateContent(currentSearch, false);
  }

  // Show success message
  showSuccessMessage("Post created successfully!");
};

const showSuccessMessage = (message) => {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;

  document.body.appendChild(successDiv);

  // Remove the message after 3 seconds
  setTimeout(() => {
    successDiv.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 300);
  }, 3000);
};
