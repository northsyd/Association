const featuredNews = document.getElementById("featured-news");
const newsList = document.getElementById("news-list");
const newsEmpty = document.getElementById("news-empty");
const filterButtons = document.querySelectorAll(".news-filter");


// =========================================================
// FEATURED ARTICLE
// =========================================================

const featuredArticle = newsArticles.find(
  article => article.featured
);

if (featuredArticle) {

  featuredNews.innerHTML = `
    <p class="tag">${featuredArticle.categoryLabel}</p>

    <h2>
      ${featuredArticle.title}
    </h2>

    <p>
      ${featuredArticle.summary}
    </p>

    <p class="meta">
      ${featuredArticle.categoryLabel} • ${featuredArticle.date}
    </p>

    <a
      class="card-link"
      href="${featuredArticle.link}"
    >
      Read more →
    </a>
  `;

}


// =========================================================
// RENDER ARTICLES
// =========================================================

function renderNews(filter = "all") {

  newsList.innerHTML = "";

  const articles = newsArticles.filter(article => {

    if (article.featured) {
      return false;
    }

    if (filter === "all") {
      return true;
    }

    return article.category === filter;

  });


  // EMPTY STATE

  if (articles.length === 0) {

    newsEmpty.hidden = false;

    return;

  }

  newsEmpty.hidden = true;


  // ARTICLES

  articles.forEach(article => {

    const item = document.createElement("article");

    item.className = "news-item";

    item.innerHTML = `
      <div>

        <p class="tag">
          ${article.categoryLabel}
        </p>

        <h2>
          ${article.title}
        </h2>

        <p>
          ${article.summary}
        </p>

        <a
          class="card-link"
          href="${article.link}"
        >
          Read more →
        </a>

      </div>

      <span>
        ${article.date}
      </span>
    `;

    newsList.appendChild(item);

  });

}


// =========================================================
// FILTER BUTTONS
// =========================================================

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter = button.dataset.filter;


    // Update buttons

    filterButtons.forEach(otherButton => {

      const isActive =
        otherButton === button;

      otherButton.classList.toggle(
        "active",
        isActive
      );

      otherButton.setAttribute(
        "aria-pressed",
        isActive ? "true" : "false"
      );

    });


    // Render selected category

    renderNews(filter);

  });

});


// =========================================================
// INITIAL LOAD
// =========================================================

renderNews("all");
