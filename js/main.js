// =========================================================
// Qihua Huang — Photography Portfolio
// Accessible lightbox: keyboard navigation, focus trap, ESC to close.
// =========================================================

(function () {
  "use strict";

  const triggers = Array.from(document.querySelectorAll(".gallery-trigger"));
  const lightbox = document.getElementById("lightbox");
  if (!lightbox || triggers.length === 0) return;

  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let currentIndex = 0;
  let lastFocusedTrigger = null;

  // Build a simple data list from the gallery markup so lightbox stays in sync with the DOM
  function getSlides() {
    return triggers.map((trigger) => {
      const img = trigger.querySelector("img");
      const caption = trigger.closest("figure").querySelector("figcaption");
      return {
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt"),
        captionText: caption ? caption.textContent.trim() : "",
      };
    });
  }

  function openLightbox(index) {
    const slides = getSlides();
    currentIndex = index;
    lastFocusedTrigger = triggers[index];
    renderSlide(slides[currentIndex]);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
    document.addEventListener("keydown", handleKeydown);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeydown);
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  }

  function renderSlide(slide) {
    lightboxImg.setAttribute("src", slide.src);
    lightboxImg.setAttribute("alt", slide.alt);
    lightboxCaption.textContent = slide.captionText;
  }

  function showNext() {
    const slides = getSlides();
    currentIndex = (currentIndex + 1) % slides.length;
    renderSlide(slides[currentIndex]);
  }

  function showPrev() {
    const slides = getSlides();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    renderSlide(slides[currentIndex]);
  }

  // Focus trap: keep Tab cycling within the dialog while open
  function getFocusable() {
    return Array.from(
      lightbox.querySelectorAll("button")
    ).filter((el) => !el.hasAttribute("hidden"));
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      closeLightbox();
      return;
    }
    if (e.key === "ArrowRight") {
      showNext();
      return;
    }
    if (e.key === "ArrowLeft") {
      showPrev();
      return;
    }
    if (e.key === "Tab") {
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Clicking the dark backdrop (but not the figure itself) also closes
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
})();
