import { forumPosts } from "./constant.js";

export const initializePost = (postId) => {
  const postContent = document.getElementById("post-content");
  const postNotFound = document.getElementById("post-not-found");
  const commentsSection = document.getElementById("comments-section");

  // Find the post by ID
  const post = forumPosts.find((p) => p.id === postId);

  if (!post) {
    // Show not found message
    postNotFound.style.display = "block";
    postContent.style.display = "none";
    commentsSection.style.display = "none";
    return;
  }

  // Hide not found message and show content
  postNotFound.style.display = "none";
  postContent.style.display = "block";
  commentsSection.style.display = "block";

  // Calculate days ago
  const dayAgo = Math.floor((Date.now() - new Date(post.created_at)) / (1000 * 60 * 60 * 24));
  const dateDisplay = dayAgo === 0 ? "Today" : `${dayAgo} day(s) ago`;

  // Render the post content
  postContent.innerHTML = `
    <div class="post-detail">
      <h1 class="post-detail-title">${post.title}</h1>
      
      <div class="post-detail-meta">
        <div class="post-author">
          <span class="author-avatar">${post.author.slice(0, 1)}</span>
          <span class="author-name">${post.author}</span>
        </div>
        <div class="post-info">
          <span class="post-location">📍 ${post.location}</span>
          <span class="post-date">📅 ${dateDisplay}</span>
        </div>
      </div>
      
      <div class="post-detail-content">
        ${post.content}
      </div>
      
      <div class="post-actions">
        <button class="like-button ${post.liked ? "liked" : ""}" data-post-id="${post.id}">
          ❤️ ${post.likes || 0} Likes
        </button>
        <span class="comment-count">💬 ${post.comments ? post.comments.length : 0} Comments</span>
      </div>
    </div>
  `;

  // Render comments
  renderComments(post);

  // Add event listeners
  setupEventListeners(post);
};

const renderComments = (post) => {
  const commentsList = document.getElementById("comments-list");

  if (!post.comments || post.comments.length === 0) {
    commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
    return;
  }

  commentsList.innerHTML = post.comments
    .map((comment) => {
      const dayAgo = Math.floor(
        (Date.now() - new Date(comment.created_at)) / (1000 * 60 * 60 * 24)
      );
      const dateDisplay = dayAgo === 0 ? "Today" : `${dayAgo} day(s) ago`;

      return `
      <div class="comment">
        <div class="comment-header">
          <span class="comment-author-avatar">${comment.author.slice(0, 1)}</span>
          <span class="comment-author">${comment.author}</span>
          <span class="comment-date">${dateDisplay}</span>
        </div>
        <div class="comment-content">${comment.content}</div>
      </div>
    `;
    })
    .join("");
};

const setupEventListeners = (post) => {
  // Back to forum button
  const backButton = document.getElementById("back-to-forum");
  backButton.addEventListener("click", () => {
    window.location.hash = "#/forum";
  });

  // Like button
  const likeButton = document.querySelector(".like-button");
  likeButton.addEventListener("click", () => {
    handleLike(post.id);
  });

  // Submit comment button
  const submitButton = document.getElementById("submit-comment");
  submitButton.addEventListener("click", () => {
    handleCommentSubmit(post.id);
  });

  // Enter key on comment input
  const commentInput = document.getElementById("comment-input");
  commentInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleCommentSubmit(post.id);
    }
  });
};

const handleLike = (postId) => {
  const post = forumPosts.find((p) => p.id === postId);
  if (!post) return;

  // Toggle like status
  post.liked = !post.liked;
  post.likes = (post.likes || 0) + (post.liked ? 1 : -1);

  // Update the like button
  const likeButton = document.querySelector(".like-button");
  likeButton.innerHTML = `❤️ ${post.likes} Likes`;
  likeButton.classList.toggle("liked", post.liked);
};

const handleCommentSubmit = (postId) => {
  const post = forumPosts.find((p) => p.id === postId);
  const commentInput = document.getElementById("comment-input");
  const commentText = commentInput.value.trim();

  if (!post || !commentText) return;

  // Initialize comments array if it doesn't exist
  if (!post.comments) {
    post.comments = [];
  }

  // Add new comment
  const newComment = {
    id: Date.now().toString(),
    author: "Anonymous User", // In a real app, this would come from authentication
    content: commentText,
    created_at: new Date().toISOString(),
  };

  post.comments.push(newComment);

  // Clear the input
  commentInput.value = "";

  // Re-render comments
  renderComments(post);

  // Update comment count in the post actions
  const commentCount = document.querySelector(".comment-count");
  commentCount.innerHTML = `💬 ${post.comments.length} Comments`;
};
