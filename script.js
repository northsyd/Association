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
const hoverTarget = document.querySelector(".hover-target");
const hoverImage = document.getElementById("hover-image");

hoverTarget.addEventListener("mouseenter", () => {
  const imgSrc = hoverTarget.getAttribute("data-image");
  hoverImage.innerHTML = `<img src="${imgSrc}">`;
  hoverImage.style.opacity = 1;
});

hoverTarget.addEventListener("mousemove", (e) => {
  hoverImage.style.left = e.pageX + 20 + "px";
  hoverImage.style.top = e.pageY + 20 + "px";
});

hoverTarget.addEventListener("mouseleave", () => {
  hoverImage.style.opacity = 0;
  setTimeout(() => {
    hoverImage.innerHTML = "";
  }, 250);
});
