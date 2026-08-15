const featuredNews = document.getElementById("featured-news");
const newsList = document.getElementById("news-list");

let currentFilter = "all";

function renderNews() {
  featuredNews.innerHTML = "";
  newsList.innerHTML = "";

  const featuredArticle = newsArticles.find(article => article.featured);

  // Featured article
  if (featuredArticle && (currentFilter === "all" || featuredArticle.type === currentFilter)) {
    featuredNews.innerHTML = `
      <p class="tag">${featuredArticle.type}</p>
      <h2>${featuredArticle.title}</h2>
      <p>${featuredArticle.summary}</p>
      <p class="meta">${featuredArticle.type} • ${featuredArticle.date}</p>
      <a href="${featuredArticle.link}">See full release →</a>
    `;
  }

  // Regular articles
  const regularArticles = newsArticles.filter(article => {
    if (article.featured) return false;
    if (currentFilter === "all") return true;
    return article.type === currentFilter;
  });

  if (regularArticles.length === 0) {
    newsList.innerHTML = `
      <p class="lede">No articles found in this category.</p>
    `;
    return;
  }

  regularArticles.forEach(article => {
    const item = document.createElement("article");
    item.className = "news-item";

    item.innerHTML = `
      <div>
        <p class="tag">${article.type}</p>
        <h2>${article.title}</h2>
        <p>${article.summary}</p>
        <a href="${article.link}">See more →</a>
      </div>

      <span>${article.date}</span>
    `;

    newsList.appendChild(item);
  });
}


// Filter buttons
document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {

    document
      .querySelectorAll("[data-filter]")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderNews();
  });
});


// Initial render
renderNews();
