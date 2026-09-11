let refreshTimeout,
  lenis = null,
  isRefreshing = !1,
  isScrolling = !1;
const optimizedRefresh = () => {
  if (isRefreshing) return;
  if (isScrolling) return;
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    isScrolling ||
      ((isRefreshing = !0),
      requestAnimationFrame(() => {
        ("undefined" != typeof ScrollTrigger && ScrollTrigger.refresh(),
          (isRefreshing = !1));
      }));
  }, 100);
};
function initBannerSectionTitleAnimation() {
  if ("undefined" == typeof SplitText || "undefined" == typeof gsap) return;
  const e = document.querySelectorAll("[data-section-title]");
  if (0 === e.length) return;
  const t = e[0],
    r = t.offsetTop,
    o = document.querySelector(".header-area")?.offsetHeight || 0;
  if (!(r < 1.2 * (window.innerHeight + o))) return;
  const i = t.querySelector("img.rotate"),
    a = t.querySelector("span"),
    s = t.querySelector("h3[data-content], h2[data-content]"),
    n = t.querySelector("p[data-content]");
  if (!s && !n) return;
  const l = { duration: 0.6, stagger: 0.08 },
    c = { duration: 0.6, stagger: 0.06 },
    d = { duration: 0.4, stagger: 0.008 };
  let p = null,
    u = null,
    g = null;
  if (a)
    try {
      p = SplitText.create(a, {
        type: "lines, words, chars",
        mask: "lines",
        linesClass: "line",
        wordsClass: "word",
        charsClass: "letter",
      });
    } catch (e) {
      console.warn("SplitText error for span:", e);
    }
  if (s)
    try {
      u = SplitText.create(s, {
        type: "lines, words, chars",
        mask: "lines",
        linesClass: "line",
        wordsClass: "word",
        charsClass: "letter",
      });
    } catch (e) {
      console.warn("SplitText error for h3:", e);
    }
  if (n)
    try {
      g = SplitText.create(n, {
        type: "lines, words, chars",
        mask: "lines",
        linesClass: "line",
        wordsClass: "word",
        charsClass: "letter",
      });
    } catch (e) {
      console.warn("SplitText error for p:", e);
    }
  (i &&
    gsap.set(i, {
      scale: 0,
      opacity: 0,
      rotation: -180,
      transformOrigin: "center center",
    }),
    p && p.chars && p.chars.length > 0 && gsap.set(p.chars, { yPercent: 110 }),
    u && u.words && u.words.length > 0 && gsap.set(u.words, { yPercent: 110 }),
    g && g.lines && g.lines.length > 0 && gsap.set(g.lines, { yPercent: 110 }));
  const f = gsap.timeline({ defaults: { ease: "power2.out" } });
  if (
    (f.set(t, { visibility: "visible", opacity: 1 }, 0),
    i &&
      f.to(i, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
      }),
    p && p.chars && p.chars.length > 0)
  ) {
    const { duration: e, stagger: t } = d;
    f.fromTo(
      p.chars,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: e,
        stagger: t,
        ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
      },
      "-=0.8",
    );
  }
  if (u && u.words && u.words.length > 0) {
    const { duration: e, stagger: t } = c;
    f.fromTo(
      u.words,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: e,
        stagger: t,
        ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
      },
      "-=0.6",
    );
  }
  if (g && g.lines && g.lines.length > 0) {
    const { duration: e, stagger: t } = l;
    f.fromTo(
      g.lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: e,
        stagger: t,
        ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
      },
      "-=0.5",
    );
  }
  t.dataset.bannerAnimated = "true";
}
function initBannerSttrWrapperAnimation() {
  if ("undefined" == typeof gsap) return;
  const e = document.querySelectorAll("[data-sttr-wrapper]");
  if (0 === e.length) return;
  const t = e[0],
    r = t.offsetTop,
    o = document.querySelector(".header-area")?.offsetHeight || 0;
  if (!(r < 1.2 * (window.innerHeight + o))) return;
  const i = t.querySelectorAll("[data-sttr-card]");
  if (0 === i.length) return;
  i.forEach((e) => {
    gsap.set(e, {
      force3D: !0,
      willChange: "transform, opacity, filter",
      y: 50,
      opacity: 0,
      filter: "blur(10px)",
    });
  });
  const a = gsap.timeline({ defaults: { ease: "power2.out" } });
  (a.set(e, { visibility: "visible", opacity: 1 }, 0),
    i.forEach((e, t) => {
      a.fromTo(
        e,
        { y: 50, opacity: 0, filter: "blur(10px)", force3D: !0 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.6,
          force3D: !0,
        },
        0 === t ? 0 : "-=0.4",
      );
    }),
    (t.dataset.bannerAnimated = "true"));
}
(document.addEventListener("DOMContentLoaded", () => {
  ("undefined" != typeof gsap &&
    ("undefined" != typeof ScrollTrigger && gsap.registerPlugin(ScrollTrigger),
    "undefined" != typeof SplitText && gsap.registerPlugin(SplitText),
    "undefined" != typeof CustomEase &&
      (gsap.registerPlugin(CustomEase),
      CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1"))),
    (function e() {
      if ("undefined" != typeof Lenis)
        if ("undefined" != typeof gsap && void 0 !== window.gsap)
          if (gsap.to && gsap.from && gsap.fromTo) {
            if (null === lenis)
              try {
                (window.gsap || (window.gsap = gsap),
                  (lenis = new Lenis({
                    lerp: 0.1,
                    smoothWheel: !0,
                    smoothTouch: !1,
                    anchors: !0,
                  })),
                  (window.lenis = lenis));
                let e = null,
                  t = 0;
                const r = 16;
                let o;
                (lenis.on("scroll", () => {
                  ((isScrolling = !0),
                    clearTimeout(o),
                    (o = setTimeout(() => {
                      isScrolling = !1;
                    }, 150)));
                  performance.now() - t >= r &&
                    (e && cancelAnimationFrame(e),
                    (e = requestAnimationFrame(() => {
                      ("undefined" != typeof ScrollTrigger &&
                        ScrollTrigger.update(),
                        (t = performance.now()),
                        (e = null));
                    })));
                }),
                  requestAnimationFrame(function e(t) {
                    (lenis && lenis.raf(t), requestAnimationFrame(e));
                  }));
              } catch (e) {}
          } else setTimeout(e, 50);
        else setTimeout(e, 50);
      else setTimeout(e, 50);
    })());
  const e = document.querySelector(".header-area"),
    t = document.body;
  if (!e || !t) return;
  let r,
    o = 0;
  const i = (r = !0) => {
    const i = e.offsetHeight;
    i > 0 &&
      i !== o &&
      ((t.style.paddingTop = `${i}px`), (o = i), r && optimizedRefresh());
  };
  (requestAnimationFrame(() => {
    (i(!0), setTimeout(() => i(!0), 100));
  }),
    window.addEventListener("resize", () => {
      (clearTimeout(r),
        (r = setTimeout(() => {
          i(!0);
        }, 200)));
    }));
  let a = window.scrollY,
    s = !1;
  (gsap.set(e, { willChange: "transform", force3D: !0 }),
    ScrollTrigger.create({
      onUpdate: (t) => {
        const r = t.scroll();
        (r > 0
          ? e.classList.add("sticky-header")
          : e.classList.remove("sticky-header"),
          r > a && r > e.offsetHeight
            ? s ||
              (gsap.to(e, {
                y: -e.offsetHeight,
                duration: 0.2,
                ease: "power1.inOut",
                force3D: !0,
              }),
              (s = !0))
            : r < a &&
              s &&
              (gsap.to(e, {
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                force3D: !0,
              }),
              (s = !1)),
          (a = r));
      },
    }),
    optimizedRefresh());
}),
  void 0 === window.initHeroAnimation &&
    (window.initHeroAnimation = function () {
      const e = document.querySelectorAll("[data-hero-banner]");
      e.length &&
        e.forEach((e) => {
          const t = e.querySelectorAll(
            "[data-subtitle], [data-title], [data-excerpt], .btn-sttr, .btn, [data-button], .thumbnail-img, .thumb-image, [data-thumb]",
          );
          if (0 === t.length) return;
          t.forEach((e) => {
            gsap.set(e, {
              y: 60,
              opacity: 0,
              filter: "blur(6px)",
              visibility: "hidden",
            });
          });
          const r = gsap.timeline({ defaults: { ease: "power2.out" } });
          t.forEach((e, t) => {
            r.fromTo(
              e,
              { y: 60, opacity: 0, filter: "blur(6px)", visibility: "hidden" },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                visibility: "visible",
                ease: "power2.out",
                duration: 0.6,
              },
              0 === t ? 0 : "-=0.5",
            );
          });
        });
      const t = document.querySelectorAll("[data-digital-hero-banner]");
      t.length &&
        t.forEach((e) => {
          const t = e.querySelectorAll(
              "[data-subtitle], [data-title], [data-excerpt], [data-button]",
            ),
            r = e.querySelector("[data-thumbnail]"),
            o = e.querySelector("[data-circle]"),
            i = e.querySelectorAll("[data-scale-up]");
          if (0 === t.length) return;
          const a = gsap.timeline({ defaults: { ease: "power2.out" } });
          (t.forEach((e, t) => {
            a.fromTo(
              e,
              { y: 60, opacity: 0, filter: "blur(6px)", visibility: "hidden" },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                visibility: "visible",
                ease: "power2.out",
                duration: 0.6,
              },
              0 === t ? 0 : "-=0.5",
            );
          }),
            r &&
              a.fromTo(
                r,
                {
                  y: 60,
                  opacity: 0,
                  filter: "blur(6px)",
                  visibility: "hidden",
                },
                {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  visibility: "visible",
                  ease: "power2.out",
                  duration: 0.6,
                },
                "=-0.5",
              ),
            o &&
              a.fromTo(
                o,
                { clipPath: "circle(0% at 100% 0)" },
                {
                  clipPath: "circle(150% at 100% 0)",
                  ease: "power2.out",
                  duration: 1.5,
                },
                "-=0.5",
              ),
            i &&
              i.forEach((e) => {
                a.fromTo(
                  e,
                  {
                    y: 40,
                    scale: 0.7,
                    opacity: 0,
                    filter: "blur(6px)",
                    visibility: "hidden",
                  },
                  {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    visibility: "visible",
                    ease: "power2.out",
                    duration: 0.6,
                    stagger: 0.05,
                  },
                  "-=1.2",
                );
              }));
        });
      const r = document.querySelectorAll("[data-institutional-hero]");
      (r.length &&
        r.forEach((e) => {
          const t = e.querySelectorAll(
              "[data-subtitle], [data-title], [data-excerpt], [data-button], [data-review-thumb], [data-review-text]",
            ),
            r =
              (e.querySelector("[data-hero-from]"),
              e.querySelector("[data-hero-from-content]")),
            o = e.querySelector("[data-hero-thumb]"),
            i = e.querySelectorAll("[data-scale-up]");
          if (0 === t.length) return;
          const a = gsap.timeline({ defaults: { ease: "power2.out" } });
          (t.forEach((e, t) => {
            a.fromTo(
              e,
              { y: 60, opacity: 0, filter: "blur(6px)", visibility: "hidden" },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                visibility: "visible",
                ease: "power2.out",
                duration: 0.6,
              },
              0 === t ? 0 : "-=0.5",
            );
          }),
            r &&
              a.fromTo(
                r,
                {
                  y: 60,
                  opacity: 0,
                  filter: "blur(6px)",
                  visibility: "hidden",
                },
                {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  visibility: "visible",
                  ease: "power2.out",
                  duration: 0.6,
                },
                "=-0.5",
              ),
            o &&
              a.fromTo(
                o,
                { clipPath: "polygon(100% 0,100% 0,100% 100%,100% 100%)" },
                {
                  clipPath: "polygon(24% 0,100% 0,100% 100%,0% 100%)",
                  ease: "power2.out",
                  duration: 1,
                },
                "-=0.5",
              ),
            i &&
              i.forEach((e) => {
                a.fromTo(
                  e,
                  {
                    y: 40,
                    scale: 0.7,
                    opacity: 0,
                    filter: "blur(6px)",
                    visibility: "hidden",
                  },
                  {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    visibility: "visible",
                    ease: "power2.out",
                    duration: 0.6,
                    stagger: 0.05,
                  },
                  "-=1.2",
                );
              }));
        }),
        initBannerSectionTitleAnimation(),
        initBannerSttrWrapperAnimation());
    }));
const heroBannerWrappers = document.querySelectorAll("[data-hero-banner]");
heroBannerWrappers.length &&
  heroBannerWrappers.forEach((e) => {
    e.querySelectorAll(
      "[data-subtitle], [data-title], [data-excerpt], .btn-sttr, .btn, [data-button], .thumbnail-img, .thumb-image, [data-thumb]",
    ).forEach((e) => {
      gsap.set(e, {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        visibility: "hidden",
      });
    });
  });
const digitalHeroWrappers = document.querySelectorAll(
  "[data-digital-hero-banner]",
);
digitalHeroWrappers.length &&
  digitalHeroWrappers.forEach((e) => {
    e.querySelectorAll(
      "[data-subtitle], [data-title], [data-excerpt], [data-button]",
    ).forEach((e) => {
      gsap.set(e, {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        visibility: "hidden",
      });
    });
    const t = e.querySelector("[data-thumbnail]"),
      r = e.querySelector("[data-circle]"),
      o = e.querySelectorAll("[data-scale-up]");
    (t &&
      gsap.set(t, {
        y: -40,
        opacity: 0,
        filter: "blur(6px)",
        visibility: "hidden",
      }),
      r && gsap.set(r, { clipPath: "circle(0% at 100% 0)" }),
      o &&
        o.forEach((e) => {
          gsap.set(e, {
            y: -40,
            scale: 0.5,
            opacity: 0,
            filter: "blur(6px)",
            visibility: "hidden",
          });
        }));
  });
const institutionalHeroWrappers = document.querySelectorAll(
  "[data-institutional-hero]",
);
function initAnimations() {
  const e = { y: 60, opacity: 0, filter: "blur(16px)", force3D: !0 },
    t = {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.4,
      ease: "power3.out",
      force3D: !0,
    },
    r = document.querySelectorAll("[data-section-title]");
  r.length &&
    (r.forEach((r) => {
      const o = r.querySelector("[data-subtitle]"),
        i = r.querySelector("[data-title]"),
        a = r.querySelector("[data-excerpt]"),
        s = gsap.timeline({ paused: !0 });
      (s.set(r, { visibility: "visible", opacity: 1, duration: 0 }, 0),
        o && s.fromTo(o, { ...e, scale: 0.8 }, { ...t, scale: 1 }, 0),
        i && s.fromTo(i, e, { ...t }, "-=0.5"),
        a && s.fromTo(a, e, { ...t }, "-=0.5"),
        ScrollTrigger.create({
          trigger: r,
          start: "top 80%",
          end: "top 40%",
          animation: s,
          toggleActions: "play none none none",
          invalidateOnRefresh: !0,
        }));
    }),
    "undefined" == typeof ScrollTrigger || isScrolling || optimizedRefresh());
  const o = document.querySelectorAll("[data-section-title]");
  o.length &&
    "undefined" != typeof SplitText &&
    o.forEach((e) => {
      if ("true" === e.dataset.bannerAnimated) return;
      const t = e.querySelector("img.rotate"),
        r = e.querySelector("span"),
        o = e.querySelector("h2[data-content]"),
        i = e.querySelector("p[data-content]");
      if (!o && !i) return;
      const a = { duration: 0.6, stagger: 0.08 },
        s = { duration: 0.6, stagger: 0.06 },
        n = { duration: 0.4, stagger: 0.008 };
      let l = null,
        c = null,
        d = null;
      if (r)
        try {
          l = SplitText.create(r, {
            type: "lines, words, chars",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word",
            charsClass: "letter",
          });
        } catch (e) {
          console.warn("SplitText error for span:", e);
        }
      if (o)
        try {
          c = SplitText.create(o, {
            type: "lines, words, chars",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word",
            charsClass: "letter",
          });
        } catch (e) {
          console.warn("SplitText error for h3:", e);
        }
      if (i)
        try {
          d = SplitText.create(i, {
            type: "lines, words, chars",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word",
            charsClass: "letter",
          });
        } catch (e) {
          console.warn("SplitText error for p:", e);
        }
      (t &&
        gsap.set(t, {
          scale: 0,
          opacity: 0,
          rotation: -180,
          transformOrigin: "center center",
        }),
        l &&
          l.chars &&
          l.chars.length > 0 &&
          gsap.set(l.chars, { yPercent: 110 }),
        c &&
          c.words &&
          c.words.length > 0 &&
          gsap.set(c.words, { yPercent: 110 }),
        d &&
          d.lines &&
          d.lines.length > 0 &&
          gsap.set(d.lines, { yPercent: 110 }));
      const p = gsap.timeline({
        scrollTrigger: {
          trigger: e,
          start: "top 75%",
          once: !0,
          invalidateOnRefresh: !0,
        },
      });
      if (
        (p.set(e, { visibility: "visible", opacity: 1 }, 0),
        t &&
          p.to(t, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          }),
        l && l.chars && l.chars.length > 0)
      ) {
        const { duration: e, stagger: t } = n;
        p.fromTo(
          l.chars,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: e,
            stagger: t,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          },
          "-=0.8",
        );
      }
      if (c && c.words && c.words.length > 0) {
        const { duration: e, stagger: t } = s;
        p.fromTo(
          c.words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: e,
            stagger: t,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          },
          "-=0.6",
        );
      }
      if (d && d.lines && d.lines.length > 0) {
        const { duration: e, stagger: t } = a;
        p.fromTo(
          d.lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: e,
            stagger: t,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          },
          "-=0.5",
        );
      }
    });
  const i = document.querySelectorAll("[data-borderless-banking]");
  i.length &&
    "undefined" != typeof SplitText &&
    i.forEach((e) => {
      const t = e.querySelector("img.rotate"),
        r = e.querySelector("span"),
        o = e.querySelector("h3[data-content]"),
        i = e.querySelector("p[data-content]"),
        a = e.querySelector(".btn-sttr"),
        s = e.querySelector(".thumbnail-img"),
        n = e.querySelector(".thumb-animated"),
        l = e.closest(".flex"),
        c = l ? l.querySelector(".max-w-165") : null,
        d = c ? c.querySelector(".item-1") : null,
        p = c ? c.querySelector(".item-2") : null,
        u = c ? c.querySelector(".item-3") : null;
      if (!o && !i && !a) return;
      const g = { duration: 0.6, stagger: 0.06 },
        f = { duration: 0.6, stagger: 0.06 },
        y = { duration: 0.4, stagger: 0.008 };
      let h = null,
        m = null,
        w = null;
      if (r)
        try {
          h = SplitText.create(r, {
            type: "lines, words, chars",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word",
            charsClass: "letter",
          });
        } catch (e) {
          console.warn("SplitText error for span:", e);
        }
      if (o)
        try {
          m = SplitText.create(o, {
            type: "lines, words, chars",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word",
            charsClass: "letter",
          });
        } catch (e) {
          console.warn("SplitText error for h3:", e);
        }
      if (i)
        try {
          w = SplitText.create(i, {
            type: "lines, words, chars",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word",
            charsClass: "letter",
          });
        } catch (e) {
          console.warn("SplitText error for p:", e);
        }
      (t &&
        gsap.set(t, {
          scale: 0,
          opacity: 0,
          rotation: -180,
          transformOrigin: "center center",
        }),
        h &&
          h.chars &&
          h.chars.length > 0 &&
          gsap.set(h.chars, { yPercent: 110 }),
        m &&
          m.words &&
          m.words.length > 0 &&
          gsap.set(m.words, { yPercent: 110 }),
        w &&
          w.lines &&
          w.lines.length > 0 &&
          gsap.set(w.lines, { yPercent: 110 }),
        s &&
          gsap.set(s, { y: 50, opacity: 0, scale: 0.95, filter: "blur(10px)" }),
        n &&
          gsap.set(n, { y: 50, opacity: 0, scale: 0.95, filter: "blur(10px)" }),
        a && gsap.set(a, { y: 50, opacity: 0 }),
        d &&
          p &&
          u &&
          (gsap.set(u, {
            zIndex: 3,
            rotation: 45,
            skewX: -20,
            skewY: 0,
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }),
          gsap.set(p, {
            zIndex: 2,
            rotation: 45,
            skewX: -20,
            skewY: 0,
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }),
          gsap.set(d, {
            zIndex: 1,
            rotation: 45,
            skewX: -20,
            skewY: 0,
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          })));
      const S = gsap.timeline({
        scrollTrigger: {
          trigger: e,
          start: "top 75%",
          end: "+=100%",
          once: !0,
          invalidateOnRefresh: !0,
          markers: !1,
        },
      });
      if (
        (t &&
          S.to(t, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          }),
        n &&
          S.to(
            n,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease:
                "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
            },
            "-=0.8",
          ),
        h && h.chars && h.chars.length > 0)
      ) {
        const { duration: e, stagger: t } = y;
        S.fromTo(
          h.chars,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: e,
            stagger: t,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          },
          "-=0.8",
        );
      }
      if (m && m.words && m.words.length > 0) {
        const { duration: e, stagger: t } = f;
        S.fromTo(
          m.words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: e,
            stagger: t,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          },
          "-=0.6",
        );
      }
      if (w && w.lines && w.lines.length > 0) {
        const { duration: e, stagger: t } = g;
        S.fromTo(
          w.lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: e,
            stagger: t,
            ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
          },
          "-=0.5",
        );
      }
      if (
        (a &&
          S.to(
            a,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease:
                "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
            },
            "-=0.4",
          ),
        s &&
          S.to(
            s,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease:
                "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
            },
            "-=0.8",
          ),
        d && p && u)
      ) {
        const t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 50%",
            end: "top 20%",
            scrub: 0.5,
            invalidateOnRefresh: !0,
          },
        });
        (gsap.set([d, p, u], { force3D: !0, willChange: "transform" }),
          t.to(
            u,
            {
              rotation: 85,
              skewX: -10,
              skewY: -7,
              y: -55,
              x: 10,
              duration: 1,
              ease: "none",
              force3D: !0,
            },
            0,
          ),
          t.to(
            p,
            {
              rotation: 67,
              skewX: -15,
              skewY: -3,
              duration: 1,
              ease: "none",
              force3D: !0,
            },
            0,
          ),
          t.to(
            d,
            {
              rotation: 70,
              skewX: -5,
              skewY: -22,
              y: 20,
              x: -15,
              duration: 1,
              ease: "none",
              force3D: !0,
            },
            0,
          ));
      }
    });
  const a = document.querySelectorAll("[data-sttr-wrapper]");
  a.length &&
    a.forEach((e) => {
      if ("true" === e.dataset.bannerAnimated) return;
      gsap.set(e, { visibility: "visible", opacity: 1 }, 0);
      const t = e.querySelectorAll("[data-sttr-card]"),
        r = gsap.timeline({ paused: !0 });
      (t &&
        t.forEach((e) => {
          (gsap.set(e, {
            force3D: !0,
            willChange: "transform, opacity, filter",
          }),
            r.fromTo(
              e,
              { y: 50, opacity: 0, filter: "blur(10px)", force3D: !0 },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                ease: "power3.out",
                duration: 0.6,
                stagger: 0.04,
                force3D: !0,
              },
              "-=0.4",
            ));
        }),
        ScrollTrigger.create({
          trigger: e,
          start: "top 75%",
          end: "top 20%",
          animation: r,
          toggleActions: "play none none none",
          invalidateOnRefresh: !0,
        }),
        "undefined" == typeof ScrollTrigger ||
          isScrolling ||
          optimizedRefresh());
    });
  const s = document.getElementById("video-sticky-wrapper"),
    n = s
      ? s.querySelector("#video-container")
      : document.getElementById("video-container");
  if (
    s &&
    n &&
    "undefined" != typeof ScrollTrigger &&
    "undefined" != typeof gsap
  ) {
    let e = null,
      t = null,
      r = null;
    const o = () => window.innerWidth >= 1024,
      i = () => Math.min(1280, window.innerWidth),
      a = () => {
        const e = window.getComputedStyle(n).borderRadius;
        if (!e || "0px" === e) return 0;
        const t = parseFloat(e);
        return e.includes("rem") ? 16 * t : t;
      };
    gsap.set(n, { force3D: !0, willChange: "width,borderRadius" });
    const l = (r) => {
        const o = gsap.utils.clamp(0, 1, r),
          i = gsap.parseEase("power2.inOut")(o),
          a = e + (window.innerWidth - e) * i,
          s = t * (1 - i);
        gsap.set(n, {
          width: a + "px",
          borderRadius: s + "px",
          opacity: 1,
          force3D: !0,
        });
      },
      c = () => {
        o()
          ? r ||
            ((e = i()),
            (t = a()),
            gsap.set(n, {
              width: e + "px",
              borderRadius: t + "px",
              opacity: 1,
            }),
            (r = ScrollTrigger.create({
              trigger: s,
              start: "top 65%",
              end: "+=120%",
              scrub: 0.8,
              onUpdate: (e) => {
                requestAnimationFrame(() => {
                  l(e.progress);
                });
              },
              invalidateOnRefresh: !0,
            })))
          : (r && (r.kill(), (r = null)),
            gsap.set(n, { clearProps: "width,borderRadius,opacity" }));
      };
    let d;
    (c(),
      window.addEventListener("resize", () => {
        (clearTimeout(d),
          (d = setTimeout(() => {
            const s = null !== r,
              n = o();
            s !== n
              ? (r && (r.kill(), (r = null)), c())
              : n && r && ((e = i()), (t = a()), ScrollTrigger.refresh());
          }, 250)));
      }));
  }
  function l() {
    const e = document.querySelectorAll("[data-sticky]");
    0 !== e.length &&
      e.forEach((e) => {
        const t = e.closest("section"),
          r = e.parentElement;
        if (!t || !r) return;
        const o = e.dataset.stickyStart || "top top",
          i = e.dataset.stickyEnd || "bottom bottom",
          a = e.dataset.stickyMinWidth ? parseInt(e.dataset.stickyMinWidth) : 0,
          s = e.dataset.stickyMaxWidth
            ? parseInt(e.dataset.stickyMaxWidth)
            : 1 / 0;
        let n = null;
        const l = () => {
          const t = window.innerWidth,
            l = t >= a && t <= s;
          if (l && !n) {
            const t = Array.from(r.children || []).find((t) => t !== e);
            let a = i;
            if (t) {
              r.offsetHeight;
              const o = t.scrollHeight - e.scrollHeight;
              a = o > 0 ? `+=${o}` : "bottom bottom";
            }
            ((n = ScrollTrigger.create({
              trigger: r,
              start: o,
              end: a,
              pin: e,
              pinSpacing: !1,
              invalidateOnRefresh: !0,
              anticipatePin: 1,
            })),
              "undefined" != typeof ScrollTrigger && ScrollTrigger.refresh());
          } else
            !l &&
              n &&
              (n.kill(),
              (n = null),
              "undefined" != typeof ScrollTrigger && ScrollTrigger.refresh());
        };
        let c;
        (requestAnimationFrame(() => {
          l();
        }),
          window.addEventListener("resize", () => {
            (clearTimeout(c),
              (c = setTimeout(() => {
                l();
              }, 150)));
          }));
      });
  }
  "undefined" != typeof ScrollTrigger &&
    requestAnimationFrame(() => {
      l();
    });
  const c = document.querySelectorAll("[data-enterprise-thumb]");
  c.length &&
    c.forEach((e) => {
      const t = e.querySelectorAll("img");
      if (0 === t.length) return;
      t.forEach((e) => {
        gsap.set(e, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          force3D: !0,
        });
      });
      const r = gsap.timeline({ paused: !0 });
      (t.forEach((e) => {
        r.fromTo(
          e,
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", force3D: !0 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "power3.out",
            force3D: !0,
          },
          0,
        );
      }),
        ScrollTrigger.create({
          trigger: e,
          start: "top 75%",
          end: "top 10%",
          animation: r,
          toggleActions: "play none none none",
          invalidateOnRefresh: !0,
        }),
        "undefined" == typeof ScrollTrigger ||
          isScrolling ||
          optimizedRefresh());
    });
  const d = document.querySelectorAll("[data-journey-section]");
  d.length &&
    d.forEach((e) => {
      const t = e.querySelector("[data-sttr-line]"),
        r = e.querySelectorAll("[data-sttr-dots]"),
        o = e.querySelectorAll("[data-sttr-card]");
      if (!t && 0 === r.length && 0 === o.length) return;
      const i = gsap.timeline({
        scrollTrigger: {
          trigger: e,
          start: "top 85%",
          once: !0,
          invalidateOnRefresh: !0,
        },
      });
      if ((i.set(e, { visibility: "visible", opacity: 1 }, 0), t)) {
        const e = window.innerWidth < 768,
          r = t.classList.contains("md:w-full");
        !e && r
          ? (gsap.set(t, { transformOrigin: "left center", scaleX: 0 }),
            i.to(t, {
              scaleX: 1,
              duration: 1,
              ease:
                "undefined" != typeof CustomEase ? "osmo-ease" : "power2.out",
            }))
          : (gsap.set(t, { transformOrigin: "center top", scaleY: 0 }),
            i.to(t, {
              scaleY: 1,
              duration: 1,
              ease:
                "undefined" != typeof CustomEase ? "osmo-ease" : "power2.out",
            }));
      }
      (r.length > 0 &&
        (gsap.set(r, { scale: 0, transformOrigin: "center center" }),
        i.to(
          r,
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease:
              "undefined" != typeof CustomEase ? "osmo-ease" : "back.out(1.7)",
          },
          "-=0.3",
        )),
        o.length > 0 &&
          o.forEach((e, t) => {
            t % 2 == 0
              ? (gsap.set(e, { y: 20, opacity: 0, filter: "blur(10px)" }),
                i.to(
                  e,
                  {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    ease:
                      "undefined" != typeof CustomEase
                        ? "osmo-ease"
                        : "power3.out",
                  },
                  "-=" + (0.4 - 0.1 * t),
                ))
              : (gsap.set(e, { y: -20, opacity: 0, filter: "blur(10px)" }),
                i.to(
                  e,
                  {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    ease:
                      "undefined" != typeof CustomEase
                        ? "osmo-ease"
                        : "power3.out",
                  },
                  "-=" + (0.4 - 0.1 * t),
                ));
          }),
        "undefined" == typeof ScrollTrigger ||
          isScrolling ||
          optimizedRefresh());
    });
  const p = document.querySelectorAll("[data-contact-locations]");
  (p.length &&
    p.forEach((e) => {
      const t = e.querySelector("[data-sttr-line]"),
        r = e.querySelector("[data-sttr-line-progress]"),
        o = e.querySelectorAll("[data-location-card]"),
        i = e.querySelectorAll(".contact-map-iframe");
      if (!t || !r || 0 === o.length || 0 === i.length) return;
      gsap.set(e, { y: 50, opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 75%",
            once: !0,
            invalidateOnRefresh: !0,
          },
        })
        .to(e, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
        });
      let a = 0;
      (i.forEach((e, t) => {
        0 === t
          ? gsap.set(e, {
              clipPath: "inset(0% 0% 0% 0%)",
              zIndex: 1,
              willChange: "clip-path",
              force3D: !0,
            })
          : gsap.set(e, {
              clipPath: "inset(0% 0% 0% 100%)",
              zIndex: t + 1,
              willChange: "clip-path",
              force3D: !0,
            });
      }),
        gsap.set(t, { height: "100%" }));
      const s = 100 / o.length;
      gsap.set(r, { height: `${s}%`, width: "100%", top: 0, left: 0 });
      const n = () => (window.innerWidth <= 640 ? "top 5%" : "top 20%"),
        l = (e) => {
          const t = o.length,
            s = 100 / t,
            n = s + e * (100 - s);
          gsap.set(r, { height: `${n}%` });
          const l = Math.min(Math.floor(e * t), t - 1);
          l !== a &&
            ((a = l),
            i.forEach((e, t) => {
              t === l
                ? gsap.to(e, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.6,
                    ease: "power2.inOut",
                    force3D: !0,
                  })
                : t < l
                  ? gsap.set(e, { clipPath: "inset(0% 0% 0% 0%)", force3D: !0 })
                  : gsap.set(e, {
                      clipPath: "inset(0% 0% 0% 100%)",
                      force3D: !0,
                    });
            }));
        };
      let c,
        d = ScrollTrigger.create({
          trigger: e,
          start: n(),
          end: "+=300%",
          pin: !0,
          pinSpacing: !0,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (e) => {
            l(e.progress);
          },
          invalidateOnRefresh: !0,
        });
      if (
        (window.addEventListener("resize", () => {
          (clearTimeout(c),
            (c = setTimeout(() => {
              d &&
                (d.kill(),
                (d = ScrollTrigger.create({
                  trigger: e,
                  start: n(),
                  end: "+=300%",
                  pin: !0,
                  pinSpacing: !0,
                  scrub: 1,
                  anticipatePin: 1,
                  onUpdate: (e) => {
                    l(e.progress);
                  },
                  invalidateOnRefresh: !0,
                })));
            }, 250)));
        }),
        !document.getElementById("contact-location-styles"))
      ) {
        const e = document.createElement("style");
        ((e.id = "contact-location-styles"),
          (e.textContent =
            "\n                    .contact-map-iframe {\n                        transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;\n                        will-change: clip-path;\n                        transform: translateZ(0);\n                    }\n                    [data-sttr-line] {\n                        height: 100% !important;\n                    }\n                    [data-sttr-line-progress] {\n                        width: 100% !important;\n                        position: absolute !important;\n                        top: 0 !important;\n                        left: 0 !important;\n                    }\n                "),
          document.head.appendChild(e));
      }
      "undefined" == typeof ScrollTrigger || isScrolling || optimizedRefresh();
    }),
    requestAnimationFrame(() => {
      "undefined" == typeof ScrollTrigger || isScrolling || optimizedRefresh();
    }));
}
institutionalHeroWrappers.length &&
  institutionalHeroWrappers.forEach((e) => {
    e.querySelectorAll(
      "[data-subtitle], [data-title], [data-excerpt], [data-button], [data-review-thumb], [data-review-text]",
    ).forEach((e) => {
      gsap.set(e, {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        visibility: "hidden",
      });
    });
    const t = e.querySelector("[data-hero-from-content]"),
      r = e.querySelector("[data-hero-thumb]"),
      o = e.querySelectorAll("[data-scale-up]");
    (t &&
      gsap.set(t, {
        y: -40,
        opacity: 0,
        filter: "blur(6px)",
        visibility: "hidden",
      }),
      r && gsap.set(r, { clipPath: "circle(0% at 100% 0)" }),
      o &&
        o.forEach((e) => {
          gsap.set(e, {
            y: -40,
            scale: 0.5,
            opacity: 0,
            filter: "blur(6px)",
            visibility: "hidden",
          });
        }));
  });
