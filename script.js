// API address from where we get blog posts
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// Select HTML elements
const postList = document.getElementById("post-list");
const statusMessage = document.getElementById("status-message");
const searchInput = document.getElementById("search-input");

// Store all API posts in this array
let allPosts = [];

// Get posts from API
async function getPosts() {
  try {
    statusMessage.textContent = "Loading posts...";

    const response = await fetch(apiUrl);

    // Check if API request was successful
    if (!response.ok) {
      throw new Error("Posts could not be loaded.");
    }

    // Convert API data into JavaScript array
    allPosts = await response.json();

    // Show first 12 posts
    showPosts(allPosts.slice(0, 12));
  } catch (error) {
    statusMessage.textContent =
      "Sorry! Something went wrong. Please refresh the page.";

    statusMessage.classList.add("error");
    console.error(error);
  }
}

// Create cards and display posts
function showPosts(posts) {
  postList.innerHTML = "";

  // If search finds no post
  if (posts.length === 0) {
    statusMessage.textContent =
      "No posts found. Try another search word.";
    return;
  }

  statusMessage.textContent = `${posts.length} post(s) found`;

  posts.forEach(function (post) {
    const postCard = document.createElement("article");

    postCard.className = "post-card";

    postCard.innerHTML = `
      <p class="post-number">ARTICLE ${String(post.id).padStart(2, "0")}</p>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <span class="read-more">Read article →</span>
    `;

    postList.appendChild(postCard);
  });
}

// Search posts when user writes in search box
searchInput.addEventListener("input", function () {
  const searchWord = searchInput.value.toLowerCase();

  const filteredPosts = allPosts.filter(function (post) {
    return (
      post.title.toLowerCase().includes(searchWord) ||
      post.body.toLowerCase().includes(searchWord)
    );
  });

  // Show maximum 12 matching posts
  showPosts(filteredPosts.slice(0, 12));
});

// Start API request when page opens
getPosts();