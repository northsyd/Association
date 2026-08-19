document.addEventListener("DOMContentLoaded", async () => {

  const headerContainer = document.getElementById("site-header");
  const footerContainer = document.getElementById("site-footer");


  async function loadComponent(container, path) {

    if (!container) return;

    try {

      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(
          `Failed to load ${path}: ${response.status}`
        );
      }

      container.innerHTML = await response.text();

    } catch (error) {

      console.error(error);

    }
  }


  await Promise.all([
    loadComponent(
      headerContainer,
      "/Association/components/header.html"
    ),

    loadComponent(
      footerContainer,
      "/Association/components/footer.html"
    )
  ]);


  /* Mobile navigation */

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

      const isOpen =
        navToggle.getAttribute("aria-expanded") === "true";

      navToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      navLinks.classList.toggle(
        "nav-open",
        !isOpen
      );

    });


    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        navLinks.classList.remove("nav-open");

      });

    });

  }


  /* Highlight current section */

  const currentPath = window.location.pathname;

  document.querySelectorAll(".nav-links a").forEach(link => {

    const linkPath = new URL(
      link.href,
      window.location.origin
    ).pathname;

    if (
      linkPath !== "/Association/" &&
      currentPath.startsWith(linkPath)
    ) {
      link.classList.add("active");
    }

  });


  /* Current year */

  const yearElement =
    document.getElementById("current-year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }

});
