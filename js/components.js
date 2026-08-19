document.addEventListener("DOMContentLoaded", async () => {

  const headerContainer =
    document.getElementById("site-header");

  const footerContainer =
    document.getElementById("site-footer");


  /* =================================
     COMPONENT LOADER
     ================================= */

  async function loadComponent(container, path) {

    if (!container) return;

    try {

      const response =
        await fetch(path);

      if (!response.ok) {

        throw new Error(
          `Failed to load ${path}: ${response.status}`
        );

      }

      container.innerHTML =
        await response.text();

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


  /* =================================
     MOBILE NAVIGATION
     ================================= */

  const navToggle =
    document.querySelector(".nav-toggle");

  const navLinks =
    document.querySelector(".nav-links");


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


        navLinks.classList.remove(
          "nav-open"
        );

      });

    });

  }


  /* =================================
     DROPDOWN NAVIGATION
     ================================= */

  const dropdowns =
    document.querySelectorAll(
      ".nav-dropdown"
    );


  dropdowns.forEach(dropdown => {

    const toggle =
      dropdown.querySelector(
        ".nav-dropdown-toggle"
      );


    if (!toggle) return;


    toggle.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        const isOpen =
          dropdown.classList.contains(
            "dropdown-open"
          );


        /* Close all other dropdowns */

        dropdowns.forEach(other => {

          if (other !== dropdown) {

            other.classList.remove(
              "dropdown-open"
            );


            const otherToggle =
              other.querySelector(
                ".nav-dropdown-toggle"
              );


            if (otherToggle) {

              otherToggle.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          }

        });


        /* Toggle selected dropdown */

        dropdown.classList.toggle(
          "dropdown-open",
          !isOpen
        );


        toggle.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

      }
    );

  });


  /* =================================
     CLOSE DROPDOWNS WHEN CLICKING
     OUTSIDE THE NAVIGATION
     ================================= */

  document.addEventListener(
    "click",
    event => {

      if (
        event.target.closest(
          ".nav-dropdown"
        )
      ) {
        return;
      }


      dropdowns.forEach(dropdown => {

        dropdown.classList.remove(
          "dropdown-open"
        );


        const toggle =
          dropdown.querySelector(
            ".nav-dropdown-toggle"
          );


        if (toggle) {

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      });

    }
  );


  /* =================================
     HIGHLIGHT CURRENT SECTION
     ================================= */

  const currentPath =
    window.location.pathname;


  document.querySelectorAll(
    ".nav-links a"
  ).forEach(link => {

    const linkPath =
      new URL(
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


  /* =================================
     CURRENT YEAR
     ================================= */

  const yearElement =
    document.getElementById(
      "current-year"
    );


  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }

});
