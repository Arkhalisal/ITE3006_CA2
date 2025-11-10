import { forumPosts } from "./constant.js";

export const initializeForum = (input) => {
  const searchInput = document.getElementById("forum-search-input");

  // Set initial input value
  searchInput.value = input;
  generateContent(input);

  searchInput.addEventListener("input", () => {
    const currentInput = searchInput.value.trim();
    generateContent(currentInput);
  });
};

const generateContent = (searchTerm) => {
  const content = document.getElementById("forum-content");

  // Clear existing content
  content.innerHTML = "";

  // Filter posts based on search term
  const filteredPosts = forumPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Posts:", filteredPosts);

  filteredPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("forum-post");

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
