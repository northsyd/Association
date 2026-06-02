const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('[data-nav]');toggle?.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(isOpen));});document.getElementById('year').textContent=new Date().getFullYear();
const revealElements = document.querySelectorAll(
  ".section, .card, .team-card, .news-item, .featured-news, .article-body h2, .article-body h3, .article-body p, .article-body figure"
);

revealElements.forEach(element => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});
