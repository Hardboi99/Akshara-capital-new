// SecureVest - Direct Page Initialization (Loader completely disabled)
(function () {
  try {
    if (
      "undefined" != typeof window &&
      !window.DEBUG &&
      "undefined" != typeof console
    ) {
      console.warn = function () {};
    }
  } catch (e) {}

  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }

  function removePreloader() {
    const preloaders = document.querySelectorAll(".preloader-area, .loader-blocks-container, .loader-block");
    preloaders.forEach((el) => {
      if (el) el.remove();
    });

    if (document.body) {
      document.body.classList.remove("overflow-hidden");
      document.body.style.overflow = "";
    }
    if (document.documentElement) {
      document.documentElement.classList.remove("lenis-stopped");
      document.documentElement.style.overflow = "";
    }
  }

  function startLenisScroll() {
    if ("undefined" != typeof Lenis && window.lenis) {
      try {
        if ("function" == typeof window.lenis.start) window.lenis.start();
        if (document.documentElement) {
          document.documentElement.classList.remove("lenis-stopped");
        }
      } catch (e) {}
    }
  }

  function initPage() {
    removePreloader();
    startLenisScroll();

    if (typeof window.initHeroAnimation === "function") {
      window.initHeroAnimation();
    }
    if (typeof window.initAnimations === "function") {
      window.initAnimations();
    }
    if (typeof ScrollTrigger !== "undefined") {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }

  // Remove preloader immediately if DOM is already building
  removePreloader();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }

  window.addEventListener("load", () => {
    removePreloader();
    if (typeof window.initHeroAnimation === "function") {
      window.initHeroAnimation();
    }
    if (typeof window.initAnimations === "function") {
      window.initAnimations();
    }
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });
})();
