(!(function () {
  try {
    if (
      "undefined" != typeof window &&
      !window.DEBUG &&
      "undefined" != typeof console
    ) {
      console.warn;
      console.warn = function () {};
    }
  } catch (e) {}
})(),
  gsap.registerPlugin(ScrollTrigger, SplitText));
let progress = 0,
  progressInterval = null,
  isWindowLoaded = !1,
  startTime = performance.now(),
  minLoadTime = 1500;
function stopLenis() {
  if ("undefined" != typeof Lenis && window.lenis)
    try {
      "function" == typeof window.lenis.stop && window.lenis.stop();
    } catch (e) {
      console.warn("Lenis stop error:", e);
    }
}
function startLenis() {
  if ("undefined" != typeof Lenis && window.lenis)
    try {
      (window.scrollTo(0, 0),
        "function" == typeof window.lenis.scrollTo &&
          window.lenis.scrollTo(0, { immediate: !0 }),
        "function" == typeof window.lenis.start && window.lenis.start(),
        document.documentElement &&
          document.documentElement.classList.remove("lenis-stopped"),
        requestAnimationFrame(() => {
          (window.scrollTo(0, 0),
            "function" == typeof window.lenis.scrollTo &&
              window.lenis.scrollTo(0, { immediate: !0 }));
        }));
    } catch (e) {
      console.warn("Lenis start error:", e);
    }
}
function preventScroll(e) {
  return (e.preventDefault(), e.stopPropagation(), !1);
}
function setOverflowHidden() {
  if (
    (document.body &&
      (document.body.classList.add("overflow-hidden"),
      (document.body.style.overflow = "hidden")),
    document.documentElement &&
      (document.documentElement.style.overflow = "hidden"),
    stopLenis(),
    window.addEventListener("wheel", preventScroll, { passive: !1 }),
    window.addEventListener("touchmove", preventScroll, { passive: !1 }),
    window.addEventListener("scroll", preventScroll, { passive: !1 }),
    window.scrollTo(0, 0),
    "undefined" != typeof Lenis && window.lenis)
  )
    try {
      "function" == typeof window.lenis.scrollTo &&
        window.lenis.scrollTo(0, { immediate: !0 });
    } catch (e) {
      console.warn("Lenis scrollTo error:", e);
    }
}
(window.scrollTo(0, 0),
  window.history &&
    window.history.scrollRestoration &&
    (window.history.scrollRestoration = "manual"),
  requestAnimationFrame(() => {
    if ((window.scrollTo(0, 0), "undefined" != typeof Lenis && window.lenis))
      try {
        "function" == typeof window.lenis.scrollTo &&
          window.lenis.scrollTo(0, { immediate: !0 });
      } catch (e) {}
  }),
  document.body
    ? setOverflowHidden()
    : document.addEventListener("DOMContentLoaded", () => {
        setOverflowHidden();
      }),
  "complete" === document.readyState && (isWindowLoaded = !0));
const readyStateCheck = setInterval(() => {
  "complete" === document.readyState &&
    ((isWindowLoaded = !0), clearInterval(readyStateCheck));
}, 100);
function hideSectionTitles() {
  const e = document.querySelectorAll("[data-section-title]");
  e.length &&
    "undefined" != typeof gsap &&
    e.forEach((e) => {
      gsap.set(e, { opacity: 0, visibility: "hidden" });
    });
  const o = document.querySelectorAll("[data-journey-section]");
  e.length &&
    "undefined" != typeof gsap &&
    o.forEach((e) => {
      gsap.set(e, { opacity: 0, visibility: "hidden" });
    });
  const t = document.querySelectorAll("[data-sttr-wrapper]");
  t.length &&
    "undefined" != typeof gsap &&
    t.forEach((e) => {
      gsap.set(e, { opacity: 0, visibility: "hidden" });
    });
}
function setupLoaderBlocks() {
  const e = document.querySelectorAll(".loader-block"),
    o = e.length;
  if (0 === o) return;
  const t = 100 / o,
    n = t + 1;
  e.forEach((e, o) => {
    const r = o * t;
    ((e.style.width = `${n}%`), (e.style.left = `${r}%`));
  });
}
function startProgressCounter() {
  const e = setInterval(() => {
    const o = document.querySelector(".loader-percent"),
      t = document.querySelector(".progress-fill"),
      n = document.querySelector(".loader-bg");
    o &&
      t &&
      (clearInterval(e),
      n && (n.style.opacity = 1),
      (progress = 0),
      t && (t.style.width = "0%"),
      o && (o.textContent = "0%"),
      (progressInterval = setInterval(() => {
        const e = performance.now() - startTime,
          n = Math.min((e / minLoadTime) * 100, 95);
        if (isWindowLoaded)
          if (e < minLoadTime) {
            progress += ((100 - progress) / ((minLoadTime - e) / 25)) * 0.5;
          } else progress += 3;
        else
          progress =
            progress < 70
              ? Math.min(progress + 0.8, n)
              : progress < 90
                ? Math.min(progress + 0.3, n)
                : Math.min(progress + 0.1, 95);
        ((progress = Math.min(progress, 100)),
          t && (t.style.width = progress + "%"),
          o && (o.textContent = Math.floor(progress) + "%"),
          progress >= 100 &&
            isWindowLoaded &&
            e >= minLoadTime &&
            (progressInterval &&
              (clearInterval(progressInterval), (progressInterval = null)),
            setTimeout(() => {
              finishLoader();
            }, 100)));
      }, 25)));
  }, 50);
}
function finishLoader() {
  const e = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  if (
    (gsap.killTweensOf(".loader-title .char"),
    window.scrollTo(0, 0),
    "undefined" != typeof Lenis && window.lenis)
  )
    try {
      "function" == typeof window.lenis.scrollTo &&
        window.lenis.scrollTo(0, { immediate: !0 });
    } catch (e) {
      console.warn("Lenis scrollTo error:", e);
    }
  e.to(
    [
      ".loader-title",
      ".loader-percent",
      ".loader-logo",
      ".loader-loading",
      ".progress-fill",
      ".progress-bar",
    ],
    { opacity: 0, y: -20, duration: 0.35, stagger: 0.05 },
  );
  const o = document.querySelectorAll(".loader-block");
  (o.length > 0 &&
    e.to(
      o,
      {
        width: "0%",
        duration: 0.8,
        ease: "power1.in",
        delay: 0.2,
        stagger: 0.04,
      },
      "-=0.35",
    ),
    e.call(
      () => {
        (window.removeEventListener("wheel", preventScroll),
          window.removeEventListener("touchmove", preventScroll),
          window.removeEventListener("scroll", preventScroll),
          document.body.classList.remove("overflow-hidden"),
          (document.body.style.overflow = ""),
          document.documentElement &&
            (document.documentElement.style.overflow = ""),
          setTimeout(() => {
            startLenis();
          }, 300),
          "function" == typeof initHeroAnimation && initHeroAnimation());
      },
      [],
      "-=0.6",
    ),
    e
      .to(
        ".preloader-area",
        { x: 2, opacity: 0, duration: 1, ease: "expo.inOut", delay: 0.6 },
        "-=0.2",
      )
      .call(
        () => {
          const e = document.querySelector(".preloader-area");
          (e && (e.style.display = "none"),
            "function" == typeof initAnimations &&
              (initAnimations(),
              setTimeout(() => {
                "undefined" != typeof ScrollTrigger && ScrollTrigger.refresh();
              }, 50)));
        },
        [],
        "-=0.6",
      ));
}
(window.addEventListener("load", () => {
  ((isWindowLoaded = !0),
    clearInterval(readyStateCheck),
    window.scrollTo(0, 0));
}),
  startProgressCounter(),
  document.addEventListener("DOMContentLoaded", () => {
    (hideSectionTitles(), setupLoaderBlocks());
    const e = document.querySelector(".loader-title");
    if (e && "undefined" != typeof SplitText) {
      const o = new SplitText(e, { type: "chars" }).chars;
      gsap.fromTo(
        o,
        { y: 60, opacity: 0, scale: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.7)",
          scale: 1,
          repeat: -1,
          repeatDelay: 0.2,
          yoyo: !0,
        },
      );
    }
  }));
