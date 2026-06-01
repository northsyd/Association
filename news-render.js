const featuredNews = document.getElementById("featured-news");
const newsList = document.getElementById("news-list");

const featuredArticle = newsArticles.find(article => article.featured);
const regularArticles = newsArticles.filter(article => !article.featured);

if (featuredArticle) {
  featuredNews.innerHTML = `
    <p class="tag">${featuredArticle.type}</p>
    <h2>${featuredArticle.title}</h2>
    <p>${featuredArticle.summary}</p>
    <p class="meta">${featuredArticle.type} • ${featuredArticle.date}</p>
    <a href="${featuredArticle.link}">Read full release →</a>
  `;
}

regularArticles.forEach(article => {
  const item = document.createElement("article");
  item.className = "news-item";

  item.innerHTML = `
    <div>
      <p class="tag">${article.type}</p>
      <h2>${article.title}</h2>
      <p>${article.summary}</p>
      <a href="${article.link}">Read more →</a>
    </div>
    <span>${article.date}</span>
  `;

  newsList.appendChild(item);
});
