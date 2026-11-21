/* =========================================================
   Sugarplum Events — site interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------
     Branded loading experience
     ------------------------------------------------------- */
  const loader = document.querySelector(".loader");

  if (loader) {
    const hasVisited = sessionStorage.getItem("sugarplum-seen");

    if (hasVisited) {
      loader.classList.add("skip");
      document.body.classList.remove("loading");
    } else {
      document.body.classList.add("loading");

      window.setTimeout(() => {
        loader.classList.add("done");
        document.body.classList.remove("loading");
        sessionStorage.setItem("sugarplum-seen", "1");
      }, 2700);
    }
  }

  /* -------------------------------------------------------
     Sticky header
     ------------------------------------------------------- */
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (!header) return;

    // Keep the open mobile navigation in its own topmost layer.
    if (!header.classList.contains("menu-open")) {
      header.classList.toggle("scrolled", window.scrollY > 45);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* -------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------- */

  /* -------------------------------------------------------
     Premium animated mobile navigation
     ------------------------------------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks && header) {
    let closeTimer;

    const finishClose = () => {
      clearTimeout(closeTimer);

      navLinks.classList.remove("open", "closing");
      header.classList.remove("menu-open");

      document.body.style.overflow = "";
      updateHeader();
    };

    const openMenu = () => {
      clearTimeout(closeTimer);

      navLinks.classList.remove("closing");
      navLinks.classList.add("open");

      header.classList.add("menu-open");

      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.textContent = "Close";

      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      if (!navLinks.classList.contains("open")) return;

      navLinks.classList.add("closing");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";

      closeTimer = window.setTimeout(finishClose, 550);
    };

    menuToggle.addEventListener("click", () => {
      if (!navLinks.classList.contains("open") ||
          navLinks.classList.contains("closing")) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" &&
          navLinks.classList.contains("open")) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* -------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* -------------------------------------------------------
     Dynamic copyright year
     ------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* -------------------------------------------------------
     Gallery filters
     ------------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = [...document.querySelectorAll(".portfolio-item")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      galleryItems.forEach((item) => {
        const matchesFilter =
          button.dataset.filter === "all" ||
          item.dataset.category === button.dataset.filter;

        item.classList.toggle("hide", !matchesFilter);
      });
    });
  });

  /* -------------------------------------------------------
     Accessible gallery lightbox
     ------------------------------------------------------- */
  const lightbox = document.querySelector(".lightbox");

  if (lightbox && galleryItems.length) {
    let currentIndex = 0;

    const visibleItems = () =>
      galleryItems.filter((item) => !item.classList.contains("hide"));

    const showImage = (index) => {
      const items = visibleItems();
      if (!items.length) return;

      currentIndex = (index + items.length) % items.length;

      const sourceImage = items[currentIndex].querySelector("img");
      const lightboxImage = lightbox.querySelector("img");

      lightboxImage.src = sourceImage.src;
      lightboxImage.alt = sourceImage.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        showImage(visibleItems().indexOf(item));
      });
    });

    lightbox.querySelector(".close")?.addEventListener("click", closeLightbox);
    lightbox.querySelector(".prev")?.addEventListener("click", () => {
      showImage(currentIndex - 1);
    });
    lightbox.querySelector(".next")?.addEventListener("click", () => {
      showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("open")) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
      if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }

  /* -------------------------------------------------------
     Inquiry message builder — prepares a DM, never submits
     ------------------------------------------------------- */
  const inquiryForm = document.querySelector("#inquiry-form");

  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(inquiryForm);
      const selectedServices = formData.getAll("service").join(", ") || "Not sure yet";
      const message = [
        "Hello Sugarplum Events! I'd love to inquire about planning a celebration.",
        "",
        `Name: ${formData.get("name")}`,
        `Email: ${formData.get("email")}`,
        `Event date: ${formData.get("date") || "To be confirmed"}`,
        `Location: ${formData.get("location") || "To be confirmed"}`,
        `Celebration: ${formData.get("type") || "To be discussed"}`,
        `Services: ${selectedServices}`,
        `Theme / inspiration: ${formData.get("theme") || "Open to ideas"}`,
        `Additional details: ${formData.get("details") || "None provided"}`,
        "",
        "Could you please let me know about availability and next steps?"
      ].join("\n");

      const status = document.querySelector("#form-status");

      try {
        await navigator.clipboard.writeText(message);
        if (status) {
          status.textContent =
            "Your inquiry has been copied. Open Instagram and paste it into a message to Sugarplum Events.";
        }
      } catch (error) {
        if (status) status.textContent = message;
      }
    });
  }
});
