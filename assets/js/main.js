function initAutoScrollColumns() {
  const e = document.querySelectorAll(
    [".auto-scroll-content", ".auto-scroll-content-reverse"].join(","),
  );
  if (!e.length) return;
  function t(e) {
    const t = parseInt(e.dataset.autoScrollOriginalCount || "0", 10);
    if (!t) return;
    const n = Array.from(e.children).slice(0, t);
    if (!n.length) return;
    const o = n[0],
      i = n[n.length - 1],
      r = (function (e) {
        const t = window.getComputedStyle(e),
          n = t.rowGap || t.gap || "0px",
          o = parseFloat(n);
        return Number.isFinite(o) ? o : 0;
      })(e),
      a = i.offsetTop + i.offsetHeight - o.offsetTop + r;
    a > 0 && e.style.setProperty("--auto-scroll-distance", `${a}px`);
  }
  function n() {
    e.forEach((e) => {
      (t(e), (e.style.animationPlayState = "running"));
    });
  }
  (e.forEach((e) => {
    if ("true" === e.dataset.autoScrollDuplicated) return;
    ((e.dataset.autoScrollDuplicated = "true"),
      (e.style.animationPlayState = "paused"));
    const t = Array.from(e.children);
    t.length &&
      ((e.dataset.autoScrollOriginalCount = String(t.length)),
      t.forEach((t) => {
        const n = t.cloneNode(!0);
        (n.setAttribute("aria-hidden", "true"),
          n.classList.add("is-auto-scroll-clone"),
          e.appendChild(n));
      }));
  }),
    "complete" === document.readyState
      ? n()
      : window.addEventListener("load", n, { once: !0 }));
  let o = 0;
  window.addEventListener("resize", () => {
    (o && cancelAnimationFrame(o),
      (o = requestAnimationFrame(() => {
        e.forEach((e) => {
          const n = e.style.animationPlayState;
          ((e.style.animationPlayState = "paused"),
            t(e),
            (e.style.animationPlayState = n || "running"));
        });
      })));
  });
}
function initMegaMenuTabs() {
  if (!document.querySelector(".megamenu-tabs")) return;
  const e = document.querySelectorAll(".megamenu-tab-btn"),
    t = document.querySelectorAll(".megamenu-tab-content");
  if (!e.length || !t.length) return;
  function n(e, t = !1) {
    if ("undefined" == typeof gsap) return;
    const n = e.querySelector(".megamenu-tab-content-title"),
      o = e.querySelector(".megamenu-tab-content-items");
    if (!n && !o) return;
    const i = gsap.timeline();
    if (n && "undefined" != typeof SplitText) {
      const e = n.querySelector("h5"),
        o = n.querySelector("p");
      if (e)
        try {
          const n = SplitText.create(e, { type: "words", wordsClass: "word" });
          n &&
            n.words &&
            n.words.length > 0 &&
            (t
              ? gsap.set(n.words, { yPercent: 0, opacity: 1 })
              : (gsap.set(n.words, { yPercent: 110, opacity: 0 }),
                i.fromTo(
                  n.words,
                  { yPercent: 110, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.06,
                    ease:
                      "undefined" != typeof CustomEase
                        ? "osmo-ease"
                        : "power3.out",
                  },
                )));
        } catch (e) {
          console.warn("SplitText error for h5:", e);
        }
      if (o)
        try {
          const e = SplitText.create(o, { type: "lines", linesClass: "line" });
          e &&
            e.lines &&
            e.lines.length > 0 &&
            (t
              ? gsap.set(e.lines, { yPercent: 0, opacity: 1 })
              : (gsap.set(e.lines, { yPercent: 110, opacity: 0 }),
                i.fromTo(
                  e.lines,
                  { yPercent: 110, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease:
                      "undefined" != typeof CustomEase
                        ? "osmo-ease"
                        : "power3.out",
                  },
                  "-=0.5",
                )));
        } catch (e) {
          console.warn("SplitText error for p:", e);
        }
    }
    if (o) {
      const e = o.children;
      if (e.length > 0)
        if (t) gsap.set(e, { opacity: 1, y: 0 });
        else {
          const t = Array.from(e);
          (t.forEach((e) => {
            e && "function" == typeof e._disableHover && e._disableHover();
          }),
            gsap.set(e, { opacity: 0, y: 50 }),
            i.to(
              e,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.04,
                ease:
                  "undefined" != typeof CustomEase ? "osmo-ease" : "power3.out",
              },
              "-=0.8",
            ),
            i.call(() => {
              t.forEach((e) => {
                e && "function" == typeof e._enableHover && e._enableHover();
              });
            }));
        }
    }
  }
  ("undefined" != typeof gsap &&
    t.forEach((e) => {
      if (!e.classList.contains("active")) {
        const t = e.querySelector(".megamenu-tab-content-title");
        if (t) {
          const e = t.querySelector("h5 .word"),
            n = t.querySelector("p .line");
          (e && gsap.set(e, { opacity: 0 }), n && gsap.set(n, { opacity: 0 }));
        }
        const n = e.querySelector(".megamenu-tab-content-items");
        if (n) {
          const e = n.children;
          e.length > 0 && gsap.set(e, { opacity: 0 });
        }
      }
    }),
    e.forEach((o) => {
      o.addEventListener("click", () => {
        (e.forEach((e) => e.classList.remove("active")),
          t.forEach((e) => e.classList.remove("active")),
          o.classList.add("active"));
        const i = document.getElementById(o.dataset.tab);
        if (i) {
          i.classList.add("active");
          const e = i.querySelector(".megamenu-tab-content-items");
          (e &&
            e.children &&
            Array.from(e.children).forEach((e) => {
              e && "function" == typeof e._disableHover && e._disableHover();
            }),
            n(i));
        }
      });
    }));
  const o = document.querySelector(".megamenu-tab-content.active");
  o && n(o, !0);
}
function initMegaMenuTabContentItemHover() {
  if ("undefined" == typeof gsap) return;
  const e = document.querySelectorAll(".megamenu-tab-content-item");
  e.length &&
    e.forEach((e) => {
      const t = e.querySelector(".megamenu-item-icon-wrapper"),
        n = e.querySelector(".megamenu-item-overlay");
      if (!t) return;
      n && gsap.set(n, { opacity: 0 });
      const o = window.getComputedStyle(t).color,
        i = window.innerWidth >= 1024;
      let r = null,
        a = !1;
      (e.addEventListener("mouseenter", () => {
        a ||
          (r && r.kill(),
          (r = gsap.timeline()),
          n &&
            r.to(
              n,
              {
                opacity: 1,
                duration: 0.3,
                ease:
                  "undefined" != typeof CustomEase ? "osmo-ease" : "power2.out",
              },
              0,
            ),
          i
            ? r.to(
                t,
                {
                  color: "#ffffff",
                  duration: 0.3,
                  ease:
                    "undefined" != typeof CustomEase
                      ? "osmo-ease"
                      : "power2.out",
                },
                0,
              )
            : r.to(
                t,
                {
                  color: "#D1DE6F",
                  duration: 0.3,
                  ease:
                    "undefined" != typeof CustomEase
                      ? "osmo-ease"
                      : "power2.out",
                },
                0,
              ));
      }),
        e.addEventListener("mouseleave", () => {
          a ||
            (r && r.kill(),
            (r = gsap.timeline()),
            n &&
              r.to(
                n,
                {
                  opacity: 0,
                  duration: 0.25,
                  ease:
                    "undefined" != typeof CustomEase
                      ? "osmo-ease"
                      : "power2.in",
                },
                0,
              ),
            r.to(
              t,
              {
                color: o,
                duration: 0.25,
                ease:
                  "undefined" != typeof CustomEase ? "osmo-ease" : "power2.in",
              },
              0,
            ));
        }),
        (e._disableHover = () => {
          ((a = !0),
            r && (r.kill(), (r = null)),
            n && gsap.set(n, { opacity: 0 }),
            t && gsap.set(t, { color: o }));
        }),
        (e._enableHover = () => {
          a = !1;
        }));
    });
}
function menuToggle() {
  const e = document.querySelector(".menuToggle"),
    t = document.querySelector(".main-menu");
  e &&
    t &&
    (t &&
      !t.hasAttribute("data-lenis-prevent") &&
      t.setAttribute("data-lenis-prevent", ""),
    e.addEventListener("click", () => {
      const o = !e.classList.contains("is-active");
      (e.classList.toggle("is-active"),
        t.classList.toggle("menu-active"),
        document.body.classList.toggle("menu-overlay"),
        o
          ? (function () {
              if (void 0 !== window.lenis && window.lenis)
                try {
                  "function" == typeof window.lenis.stop && window.lenis.stop();
                } catch (e) {
                  console.warn("Lenis stop error:", e);
                }
              (document.body && (document.body.style.overflow = "hidden"),
                document.documentElement &&
                  (document.documentElement.style.overflow = "hidden"));
            })()
          : n(),
        t.querySelectorAll("li").forEach((e) => {
          e.classList.remove("active");
          e.querySelectorAll(".sub-menu, .mega-menu").forEach((e) => {
            ((e.style.height = "0"),
              setTimeout(() => (e.style.display = "none"), 300));
          });
        }));
    }),
    t.addEventListener("click", (e) => {
      const t = e.target.closest("li");
      if (
        t &&
        !t.closest(".mega-menu") &&
        t.querySelector(".sub-menu, .mega-menu")
      ) {
        const e = t.querySelector(".sub-menu, .mega-menu");
        if (!e) return;
        if (t.classList.contains("active"))
          (t.classList.remove("active"),
            (e.style.height = e.scrollHeight + "px"),
            setTimeout(() => (e.style.height = "0"), 10),
            setTimeout(() => (e.style.display = "none"), 300));
        else {
          (t.classList.add("active"), (e.style.display = "block"));
          const n = e.scrollHeight + "px";
          ((e.style.height = "0"),
            setTimeout(() => (e.style.height = n), 10),
            setTimeout(() => (e.style.height = ""), 300));
        }
        (t.parentElement?.querySelectorAll(":scope > li") || []).forEach(
          (e) => {
            if (e === t) return;
            e.classList.remove("active");
            e.querySelectorAll(
              ":scope > .sub-menu, :scope > .mega-menu",
            ).forEach((e) => {
              ((e.style.height = "0"),
                setTimeout(() => (e.style.display = "none"), 300));
            });
          },
        );
      }
    }),
    document.addEventListener("click", (o) => {
      const i = t.contains(o.target),
        r = e.contains(o.target);
      i ||
        r ||
        (e.classList.remove("is-active"),
        t.classList.remove("menu-active"),
        document.body.classList.remove("menu-overlay"),
        n(),
        t.querySelectorAll("li").forEach((e) => {
          e.classList.remove("active");
          e.querySelectorAll(".sub-menu, .mega-menu").forEach((e) => {
            ((e.style.height = "0"),
              setTimeout(() => (e.style.display = "none"), 300));
          });
        }));
    }),
    t.querySelectorAll(".mega-menu").forEach((e) => {
      e.addEventListener("click", (e) => e.stopPropagation(), { passive: !0 });
      const t = e.querySelectorAll(".megamenu-item");
      t.forEach((e) => {
        const n = e.querySelector(".megamenu-item-toogle"),
          o = e.querySelector(".mega-menu-list");
        n &&
          o &&
          ((o.style.overflow = "hidden"),
          e.classList.contains("active") ||
            ((o.style.display = "none"), (o.style.height = "0")),
          n.addEventListener(
            "click",
            (n) => {
              (n.preventDefault(), n.stopPropagation());
              const i = e.classList.contains("active");
              if (
                (t.forEach((t) => {
                  if (t === e) return;
                  t.classList.remove("active");
                  const n = t.querySelector(".mega-menu-list");
                  n &&
                    ((n.style.height = n.scrollHeight + "px"),
                    n.getBoundingClientRect(),
                    (n.style.height = "0"),
                    setTimeout(() => {
                      n.style.display = "none";
                    }, 300));
                }),
                i)
              )
                (e.classList.remove("active"),
                  (o.style.height = o.scrollHeight + "px"),
                  o.getBoundingClientRect(),
                  (o.style.height = "0"),
                  setTimeout(() => {
                    o.style.display = "none";
                  }, 300));
              else {
                (e.classList.add("active"), (o.style.display = "block"));
                const t = o.scrollHeight + "px";
                ((o.style.height = "0"),
                  requestAnimationFrame(() => {
                    o.style.height = t;
                  }),
                  setTimeout(() => {
                    o.style.height = "";
                  }, 300));
              }
            },
            { passive: !1 },
          ));
      });
    }));
  function n() {
    if (void 0 !== window.lenis && window.lenis)
      try {
        ("function" == typeof window.lenis.start && window.lenis.start(),
          document.documentElement &&
            document.documentElement.classList.remove("lenis-stopped"));
      } catch (e) {
        console.warn("Lenis start error:", e);
      }
    (document.body && (document.body.style.overflow = ""),
      document.documentElement &&
        (document.documentElement.style.overflow = ""));
  }
}
(document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".main-menu ul li").forEach(function (e) {
    if (e.querySelector(".sub-menu, .mega-menu")) {
      const t = e.querySelector("button,a");
      if (t) {
        const e =
          '\n                    <svg class="fill-current" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <path d="M0.264139 0.267679C0.433317 0.0962844 0.662742 0 0.901961 0C1.14118 0 1.37061 0.0962844 1.53978 0.267679L6.00545 4.7932L10.4711 0.267679C10.6413 0.101142 10.8691 0.00899045 11.1057 0.0110735C11.3422 0.0131565 11.5685 0.109307 11.7358 0.278816C11.903 0.448325 11.9979 0.677629 12 0.917342C12.002 1.15705 11.9111 1.388 11.7468 1.56042L6.64327 6.73232C6.47409 6.90372 6.24467 7 6.00545 7C5.76623 7 5.5368 6.90372 5.36762 6.73232L0.264139 1.56042C0.0950107 1.38898 0 1.15648 0 0.914052C0 0.671626 0.0950107 0.439126 0.264139 0.267679Z"/>\n                    </svg>';
        t.insertAdjacentHTML("beforeend", e);
      }
    }
  });
}),
  document.addEventListener("DOMContentLoaded", initAutoScrollColumns),
  document.addEventListener("DOMContentLoaded", initMegaMenuTabs),
  document.addEventListener(
    "DOMContentLoaded",
    initMegaMenuTabContentItemHover,
  ),
  menuToggle());
const cards = document.querySelectorAll(".submenu-item"),
  minWidth = 1024;
function initFinancialCalculator() {
  const e = document.getElementById("depositSlider"),
    t = document.getElementById("durationSlider"),
    n = document.getElementById("depositValue"),
    o = document.getElementById("durationValue"),
    i = document.getElementById("resultValue"),
    r = document.getElementById("resultDescription");
  if (!e || !t) return;
  function a(e) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(e);
  }
  function s(e, t, n = !1) {
    const o = parseInt(e.value),
      i = parseInt(e.min),
      r = ((o - i) / (parseInt(e.max) - i)) * 100;
    t.textContent = n ? a(o) : o;
    const s = (r / 100) * (e.offsetWidth - 24) + 12;
    t.style.left = `${s}px`;
    const l = e.closest(".slider-container");
    l && l.style.setProperty("--slider-progress", `${r}%`);
  }
  function l() {
    const n = parseInt(e.value),
      o = parseInt(t.value);
    let s = 0,
      l = 0;
    for (let e = 1; e <= o; e++) l = 1.0075 * (l + n);
    ((s = Math.round(l)),
      (i.textContent = a(s)),
      (r.textContent = `Your balance after ${o} ${1 === o ? "month" : "months"}`));
  }
  let c;
  (s(e, n, !0),
    s(t, o, !1),
    l(),
    e.addEventListener("input", () => {
      (s(e, n, !0), l());
    }),
    t.addEventListener("input", () => {
      (s(t, o, !1), l());
    }),
    window.addEventListener("resize", () => {
      (clearTimeout(c),
        (c = setTimeout(() => {
          (s(e, n, !0), s(t, o, !1));
        }, 250)));
    }));
}
(cards.forEach((e) => {
  (e.addEventListener("mouseenter", () => {
    window.innerWidth < 1024 ||
      cards.forEach((t) => {
        t !== e && t.classList.add("overlay");
      });
  }),
    e.addEventListener("mouseleave", () => {
      window.innerWidth < 1024 ||
        cards.forEach((e) => {
          e.classList.remove("overlay");
        });
    }));
}),
  document.addEventListener("DOMContentLoaded", initFinancialCalculator));
var currencyExchangeRatesCache = {},
  currencyExchangeLastFetch = 0,
  CURRENCY_CACHE_TTL_MS = 6e4;
function formatCurrencyOutput(e, t) {
  var n = -1 !== ["JPY", "KRW", "VND", "IDR"].indexOf(t);
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: n ? 0 : 2,
    maximumFractionDigits: n ? 0 : 2,
  }).format(e);
}
function initCurrencyExchangeCalculator() {
  var e,
    t,
    n,
    o = document.getElementById("currencyAmount"),
    i = document.getElementById("currencyFrom"),
    r = document.getElementById("currencyTarget"),
    a = document.getElementById("currencyOutput"),
    s = document.getElementById("currencySwap"),
    l = document.getElementById("currencyLastUpdate");
  o &&
    i &&
    r &&
    a &&
    (o.addEventListener(
      "input",
      ((e = c),
      (t = 400),
      function () {
        (clearTimeout(n), (n = setTimeout(e, t)));
      }),
    ),
    o.addEventListener("change", c),
    i.addEventListener("change", c),
    r.addEventListener("change", c),
    s &&
      s.addEventListener("click", function () {
        var e = i.value,
          t = r.value;
        if (
          ((i.value = t),
          (r.value = e),
          "undefined" != typeof $ && $.fn.niceSelect)
        )
          try {
            ($(i).niceSelect("update"), $(r).niceSelect("update"));
          } catch (e) {}
        c();
      }),
    c());
  function c() {
    var e = parseFloat(o.value) || 0,
      t = i.value,
      n = r.value;
    if (e <= 0)
      return (
        (a.value = ""),
        void (l && (l.textContent = "Enter an amount to convert."))
      );
    if (t === n)
      return (
        (a.value = formatCurrencyOutput(e, n)),
        void (l && (l.textContent = "Same currency — no conversion."))
      );
    ((a.value = "…"), l && (l.textContent = "Fetching rates…"));
    var s =
        "https://api.exchangerate.host/convert?from=" +
        encodeURIComponent(t) +
        "&to=" +
        encodeURIComponent(n) +
        "&amount=" +
        encodeURIComponent(e),
      c = String(t || "").toLowerCase(),
      d = String(n || "").toLowerCase(),
      u =
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/" +
        encodeURIComponent(c) +
        ".min.json";
    function p() {
      var o = "https://open.er-api.com/v6/latest/" + encodeURIComponent(t);
      return fetch(o, {
        method: "GET",
        mode: "cors",
        headers: { Accept: "application/json" },
      })
        .then(function (e) {
          if (!e.ok) throw new Error("ER API HTTP " + e.status);
          return e.json();
        })
        .then(function (t) {
          if (!t || !t.rates || "number" != typeof t.rates[n])
            throw new Error("ER API: missing rate");
          var o = t.rates[n] * e;
          ((a.value = formatCurrencyOutput(o, n)),
            l &&
              (l.textContent =
                "Using public rates. Last update: " +
                (t.time_last_update_utc || "") +
                "."));
        });
    }
    function m() {
      return fetch(u, {
        method: "GET",
        mode: "cors",
        headers: { Accept: "application/json" },
      })
        .then(function (e) {
          if (!e.ok) throw new Error("Static CDN HTTP " + e.status);
          return e.json();
        })
        .then(function (t) {
          if (!t || !t[c] || "number" != typeof t[c][d])
            throw new Error("Static CDN: missing rate");
          var o = t[c][d] * e;
          ((a.value = formatCurrencyOutput(o, n)),
            l &&
              (l.textContent =
                "Using daily static rate. Date: " + (t.date || "") + "."));
        });
    }
    fetch(s, {
      method: "GET",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then(function (e) {
        if (!e.ok) throw new Error("Primary HTTP " + e.status);
        return e.json();
      })
      .then(function (e) {
        if (e && "number" == typeof e.result)
          ((a.value = formatCurrencyOutput(e.result, n)),
            l && (l.textContent = "Live rate fetched just now."));
        else {
          if (!e || !e.rates || null == e.rates[n])
            return m().catch(function () {
              return p();
            });
          var t = e.rates[n];
          ((a.value = formatCurrencyOutput(t, n)),
            l && (l.textContent = "Live rate fetched."));
        }
      })
      .catch(function () {
        m()
          .catch(function () {
            return p();
          })
          .catch(function () {
            ((a.value = ""),
              l &&
                (l.textContent =
                  "Unable to fetch rates. Check connection and try again."));
          });
      });
  }
}
function initRoiCalculator() {
  var e = document.querySelector(".home-1-roi-calculator");
  if (e) {
    e.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    var t = e.querySelector('button[type="submit"], [type="submit"]');
    t &&
      t.addEventListener("click", function (e) {
        e.preventDefault();
      });
  }
}
function initBannerTextSlider() {
  const e = document.querySelector(".banner-text-slider");
  let t = null;
  if (e && "undefined" != typeof Swiper) {
    const n = e.querySelectorAll(".swiper-slide").length;
    t = new Swiper(".banner-text-slider", {
      spaceBetween: 0,
      slidesPerView: "auto",
      centeredSlides: !1,
      loop: !0,
      loopAdditionalSlides: Math.max(10, Math.ceil(n / 2)),
      loopedSlides: Math.max(10, Math.ceil(n / 2)),
      speed: 2e3,
      autoplay: { delay: 1, disableOnInteraction: !1, pauseOnMouseEnter: !1 },
      allowTouchMove: !1,
      observer: !0,
      observeParents: !0,
      resizeObserver: !0,
      watchSlidesProgress: !0,
      watchSlidesVisibility: !0,
      on: {
        init: function () {
          this.loopFix();
        },
        loopFix: function () {
          0 === (this.realIndex || 0) && this.slideToLoop(0, 0);
        },
        slideChangeTransitionEnd: function () {
          this.realIndex >= n - 1 && this.loopFix();
        },
      },
    });
    const o = () => {
        try {
          t &&
            !t.destroyed &&
            (t.update?.(),
            t.loopFix?.(),
            t.autoplay && (t.autoplay.stop?.(), t.autoplay.start?.()));
        } catch (e) {}
      },
      i = ((e, t = 120) => {
        let n;
        return (...o) => {
          (clearTimeout(n), (n = setTimeout(() => e(...o), t)));
        };
      })(o, 120);
    (window.addEventListener("resize", i),
      document.addEventListener("visibilitychange", () => {
        "visible" === document.visibilityState && o();
      }),
      setTimeout(o, 50));
  }
}
function initVideoControls(e, t, n, o = !1, i = !1, r = !1) {
  if (!e || !t || !n || "undefined" == typeof gsap) return;
  let a = !1;
  function s(n) {
    const o = e.getBoundingClientRect(),
      i = n.clientX - o.left,
      r = n.clientY - o.top,
      a = t.offsetWidth,
      s = t.offsetHeight,
      l = i - a / 2,
      c = r - s / 2,
      d = o.width - a,
      u = o.height - s;
    return { x: Math.min(Math.max(l, 0), d), y: Math.min(Math.max(c, 0), u) };
  }
  ((n.muted = !0),
    (n.loop = !0),
    r
      ? (n.pause(),
        (n.autoplay = !1),
        (t.innerHTML = '<span class="play-icon">Play</span>'))
      : ((n.autoplay = !0),
        n.play().catch(() => {}),
        (t.innerHTML = '<span class="pause-icon">Pause</span>')),
    o
      ? gsap.set(t, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          scale: 1,
          opacity: r || i ? 1 : 0,
        })
      : gsap.set(t, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          scale: 0,
          opacity: 0,
        }),
    o ||
      (e.addEventListener("mousemove", function (e) {
        if (!a) return;
        const n = s(e);
        gsap.to(t, {
          left: n.x + "px",
          top: n.y + "px",
          xPercent: 0,
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }),
      e.addEventListener("mouseenter", function (e) {
        a = !0;
        const n = s(e);
        (gsap.set(t, {
          left: n.x + "px",
          top: n.y + "px",
          xPercent: 0,
          yPercent: 0,
          scale: 0,
          opacity: 0,
        }),
          gsap.to(t, {
            opacity: 1,
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)",
          }));
      }),
      e.addEventListener("mouseleave", function () {
        ((a = !1),
          gsap.to(t, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          }));
      })));
  const l = function (e) {
    (e.preventDefault(),
      e.stopPropagation(),
      n.paused ? n.play().catch(() => {}) : n.pause());
  };
  (t.addEventListener("click", l),
    e.addEventListener("click", function (t) {
      (t.target !== e && t.target !== n) || l(t);
    }));
  const c = function () {
    n.paused
      ? ((t.innerHTML = '<span class="play-icon">Play</span>'),
        o &&
          !i &&
          gsap.to(t, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          }))
      : ((t.innerHTML = '<span class="pause-icon">Pause</span>'),
        o &&
          !i &&
          gsap.to(t, {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          }));
  };
  (n.addEventListener("play", c),
    n.addEventListener("pause", c),
    n.addEventListener("ended", function () {
      n.loop ||
        ((t.innerHTML = '<span class="play-icon">Play</span>'),
        o
          ? gsap.to(t, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          : gsap.to(t, { opacity: 1, duration: 0.3, ease: "power2.out" }));
    }));
}
(document.addEventListener("DOMContentLoaded", initCurrencyExchangeCalculator),
  document.addEventListener("DOMContentLoaded", initRoiCalculator),
  document.addEventListener("DOMContentLoaded", initBannerTextSlider));
const videoStickyWrapper = document.getElementById("video-sticky-wrapper"),
  videoContainerDesktop = videoStickyWrapper
    ? videoStickyWrapper.querySelector("#video-container")
    : null,
  playButtonDesktop = videoContainerDesktop
    ? videoContainerDesktop.querySelector("#play-button")
    : null,
  videoDesktop = videoContainerDesktop
    ? videoContainerDesktop.querySelector("#video")
    : null;
videoContainerDesktop &&
  playButtonDesktop &&
  videoDesktop &&
  initVideoControls(videoContainerDesktop, playButtonDesktop, videoDesktop, !1);
const videoContainerMobile = document.getElementById("video-container-mobile"),
  playButtonMobile = videoContainerMobile
    ? videoContainerMobile.querySelector("#play-button-mobile")
    : null,
  videoMobile = videoContainerMobile
    ? videoContainerMobile.querySelector("#video-mobile")
    : null;
videoContainerMobile &&
  playButtonMobile &&
  videoMobile &&
  initVideoControls(videoContainerMobile, playButtonMobile, videoMobile, !0);
const videoNormalyWrapper = document.getElementById("video-all-wrapper"),
  videoContainerAll = videoNormalyWrapper
    ? videoNormalyWrapper.querySelector("#video-container")
    : null,
  playButtonAll = videoContainerAll
    ? videoContainerAll.querySelector("#play-button")
    : null,
  videoAll = videoContainerAll
    ? videoContainerAll.querySelector("#video")
    : null;
function initBenefitSlider() {
  if (
    document.querySelector(".benefit-slider") &&
    "undefined" != typeof Swiper
  ) {
    new Swiper(".benefit-slider", {
      loop: !0,
      loopAdditionalSlides: 2,
      spaceBetween: 36,
      centeredSlides: !0,
      slidesPerView: 1,
      autoHeight: !0,
      allowTouchMove: !0,
      speed: 1e3,
      autoplay: { delay: 6e4 },
      pagination: { el: ".benefit-slider-pagination", type: "fraction" },
      navigation: {
        nextEl: ".benefit-slider-button-next",
        prevEl: ".benefit-slider-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1.1 },
        1024: { slidesPerView: 1 },
      },
      on: {
        slideChange: function () {
          this.updateAutoHeight();
        },
        imagesReady: function () {
          this.updateAutoHeight();
        },
      },
    });
  }
}
function initTrustProgress() {
  const e = document.getElementById("trust-indicators"),
    t = document.querySelectorAll(".pie"),
    n = document.querySelectorAll(".progress");
  if (!e || !t.length || !n.length) return;
  function o(e, t, n) {
    e &&
      n &&
      (e.style.setProperty("--percent", t),
      e.setAttribute("data-percent", Math.round(t)),
      (n.textContent = Math.round(t) + "%"));
  }
  t.forEach((e, t) => {
    const o = n[t];
    e &&
      o &&
      (e.style.setProperty("--percent", 0),
      e.setAttribute("data-percent", 0),
      (o.textContent = "0%"));
  });
  const i = new IntersectionObserver(
    (r) => {
      r.forEach((r) => {
        r.isIntersecting &&
          (t.forEach((e, t) => {
            const i = n[t],
              r = parseInt(e.getAttribute("data-target")) || 0;
            e &&
              i &&
              r > 0 &&
              0 === parseInt(e.getAttribute("data-percent")) &&
              (function (e, t, n, i = 2e3) {
                const r = performance.now();
                let a;
                a = requestAnimationFrame(function s(l) {
                  const c = l - r,
                    d = Math.min(c / i, 1),
                    u = 1 - Math.pow(1 - d, 4);
                  (o(e, 0 + (n - 0) * u, t),
                    d < 1 ? (a = requestAnimationFrame(s)) : o(e, n, t));
                });
              })(e, i, r);
          }),
          i.unobserve(e));
      });
    },
    { threshold: 0.3, rootMargin: "0px" },
  );
  i.observe(e);
}
function initTabs(e) {
  const t = document.querySelector(e);
  if (!t) return;
  const n = t.querySelectorAll(".calculator-tab-btn"),
    o = t.querySelectorAll(".calculator-tab-panel");
  n.forEach((e) => {
    e.addEventListener("click", () => {
      const i = e.dataset.tab;
      (n.forEach((e) => e.classList.remove("active")),
        o.forEach((e) => e.classList.remove("active")),
        e.classList.add("active"));
      const r = t.querySelector(`#${i}`);
      if (r) {
        if ((r.classList.add("active"), "undefined" != typeof gsap)) {
          const e = r.querySelector(".emi-calculator-wrapper");
          if (e) {
            const t = Array.from(e.children);
            (gsap.set(t, { y: 100, opacity: 0, filter: "blur(6px)" }),
              gsap.to(t, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.25,
              }));
          }
        }
        initEMICalculatorForPanel(r);
      }
    });
  });
}
function formatCurrency(e) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(e);
}
function formatLargeCurrency(e) {
  if (e >= 1e7) {
    return "₹" + (e / 1e7).toFixed(2) + " Cr";
  } else if (e >= 1e5) {
    return "₹" + (e / 1e5).toFixed(2) + " Lakh";
  } else if (e >= 1e3) {
    return "₹" + (e / 1e3).toFixed(1) + "K";
  }
  return formatCurrency(e);
}
function calculateEMI(e, t, n) {
  const o = t / 100 / 12,
    i = 12 * n;
  if (0 === o) return e / i;
  return (e * o * Math.pow(1 + o, i)) / (Math.pow(1 + o, i) - 1);
}
function updateSliderProgress(e) {
  const t = parseFloat(e.value),
    n = parseFloat(e.min),
    o = ((t - n) / (parseFloat(e.max) - n)) * 100,
    i = e.closest(".slider-container");
  i && i.style.setProperty("--slider-progress", `${o}%`);
}
function initEMICalculatorForPanel(e) {
  if ("true" === e.dataset.emiInitialized)
    return void updateCalculatorForPanel(e);
  const t = e.querySelector(".emi-loan-amount"),
    n = e.querySelector(".emi-loan-term"),
    o = e.querySelector(".emi-interest-rate");
  t &&
    n &&
    o &&
    ((e.dataset.emiInitialized = "true"),
    updateSliderProgress(t),
    updateSliderProgress(n),
    updateSliderProgress(o),
    t.addEventListener("input", () => {
      (updateSliderProgress(t), updateCalculatorForPanel(e));
    }),
    n.addEventListener("input", () => {
      (updateSliderProgress(n), updateCalculatorForPanel(e));
    }),
    o.addEventListener("input", () => {
      (updateSliderProgress(o), updateCalculatorForPanel(e));
    }),
    updateCalculatorForPanel(e));
}
function updateCalculatorForPanel(e) {
  const t = e.querySelector(".emi-loan-amount"),
    n = e.querySelector(".emi-loan-term"),
    o = e.querySelector(".emi-interest-rate"),
    i = e.querySelector(".emi-loan-amount-value"),
    r = e.querySelector(".emi-loan-term-value"),
    a = e.querySelector(".emi-interest-rate-value"),
    s = e.querySelector(".emi-monthly-emi"),
    l = e.querySelector(".emi-interest-amount"),
    c = e.querySelector(".emi-total-amount");
  if (!t || !n || !o) return;
  const d = parseFloat(t.value),
    u = parseFloat(o.value),
    p = parseFloat(n.value);
  ((i.textContent = formatLargeCurrency(d)),
    (r.textContent = p),
    (a.textContent = u.toFixed(1) + "%"));
  const m = calculateEMI(d, u, p),
    f = m * (12 * p),
    y = f - d;
  ((s.textContent = formatCurrency(m)),
    (l.textContent = formatLargeCurrency(y)),
    (c.textContent = formatLargeCurrency(f)));
}
function initEMICalculator() {
  let e;
  (document.querySelectorAll(".calculator-tab-panel").forEach((e) => {
    e.classList.contains("active") && initEMICalculatorForPanel(e);
  }),
    window.addEventListener("resize", () => {
      (clearTimeout(e),
        (e = setTimeout(() => {
          const e = document.querySelector(".calculator-tab-panel.active");
          if (e) {
            const t = e.querySelector(".emi-loan-amount"),
              n = e.querySelector(".emi-loan-term"),
              o = e.querySelector(".emi-interest-rate");
            (t && updateSliderProgress(t),
              n && updateSliderProgress(n),
              o && updateSliderProgress(o));
          }
        }, 250)));
    }));
}
(videoContainerAll &&
  playButtonAll &&
  videoAll &&
  initVideoControls(videoContainerAll, playButtonAll, videoAll, !0, !1, !0),
  document.addEventListener("DOMContentLoaded", initBenefitSlider),
  document.addEventListener("DOMContentLoaded", initTrustProgress),
  initTabs(".calculator-tabs"),
  document.addEventListener("DOMContentLoaded", initEMICalculator),
  $("select").niceSelect());
let preventWheelLightbox = null;
function initCounterAnimation() {
  var e = document.querySelectorAll(".counter");
  if (e.length) {
    var t = new IntersectionObserver(
      function (e) {
        e.forEach(function (e) {
          e.isIntersecting && (i(e.target), t.unobserve(e.target));
        });
      },
      { threshold: 0, rootMargin: "0px" },
    );
    (e.forEach(function (e) {
      r(e) ? i(e) : t.observe(e);
    }),
      requestAnimationFrame(a),
      setTimeout(a, 300),
      setTimeout(a, 800),
      setTimeout(a, 1500),
      window.addEventListener("scroll", a, { passive: !0 }));
    var n = document.getElementById("financial-tools-counters");
    if (n) {
      var o = new IntersectionObserver(
        function (e) {
          e.forEach(function (e) {
            e.isIntersecting &&
              (o.unobserve(e.target),
              e.target.querySelectorAll(".counter").forEach(function (e) {
                if (!e.hasAttribute("data-animated")) {
                  var t = parseInt(e.getAttribute("data-target"), 10) || 0;
                  e.setAttribute("data-animated", "true");
                  var n = performance.now();
                  requestAnimationFrame(function o(i) {
                    var r = Math.min((i - n) / 2e3, 1),
                      a = Math.floor((1 - Math.pow(1 - r, 4)) * t);
                    ((e.textContent = a),
                      r < 1 ? requestAnimationFrame(o) : (e.textContent = t));
                  });
                }
              }));
          });
        },
        { threshold: 0.1 },
      );
      o.observe(n);
    }
  }
  function i(e) {
    var t = parseInt(e.getAttribute("data-target"), 10) || 0;
    if (!e.hasAttribute("data-animated")) {
      e.setAttribute("data-animated", "true");
      var n = performance.now();
      requestAnimationFrame(function o(i) {
        var r = i - n,
          a = Math.min(r / 2e3, 1),
          s = 1 - Math.pow(1 - a, 4),
          l = Math.floor(0 + (t - 0) * s);
        ((e.textContent = l),
          a < 1 ? requestAnimationFrame(o) : (e.textContent = t));
      });
    }
  }
  function r(e) {
    var t = e.getBoundingClientRect(),
      n = window.innerHeight || document.documentElement.clientHeight;
    return t.top < n && t.bottom > 0;
  }
  function a() {
    document.querySelectorAll(".counter").forEach(function (e) {
      e.hasAttribute("data-animated") || (r(e) && i(e));
    });
  }
}
function initDragCursor() {
  const e = document.querySelector(".drag-cursor-wrapper"),
    t = document.getElementById("drag-cursor");
  if (e && t && "undefined" != typeof gsap) {
    let r = !1;
    const a = e.querySelectorAll('a, button, [role="button"]');
    function n(n) {
      const o = e.getBoundingClientRect(),
        i = n.clientX - o.left,
        r = n.clientY - o.top,
        a = t.offsetWidth,
        s = t.offsetHeight,
        l = i - a / 2,
        c = r - s / 2,
        d = o.width - a,
        u = o.height - s;
      return { x: Math.min(Math.max(l, 0), d), y: Math.min(Math.max(c, 0), u) };
    }
    function o(e) {
      if (!r) {
        r = !0;
        const o = n(e);
        (gsap.set(t, {
          left: o.x + "px",
          top: o.y + "px",
          xPercent: 0,
          yPercent: 0,
          scale: 0,
          opacity: 0,
        }),
          gsap.to(t, {
            opacity: 1,
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)",
          }));
      }
    }
    function i() {
      r &&
        ((r = !1),
        gsap.to(t, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        }));
    }
    (gsap.set(t, {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      scale: 0,
      opacity: 0,
    }),
      e.addEventListener("mousemove", function (e) {
        if (!r) return;
        const o = n(e);
        gsap.to(t, {
          left: o.x + "px",
          top: o.y + "px",
          xPercent: 0,
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }),
      e.addEventListener("mouseenter", function (e) {
        o(e);
      }),
      e.addEventListener("mouseleave", function () {
        i();
      }),
      a.forEach(function (n) {
        n !== t &&
          (n.addEventListener("mouseenter", function (e) {
            i();
          }),
          n.addEventListener("mouseleave", function (t) {
            const n = e.getBoundingClientRect(),
              i = t.clientX,
              r = t.clientY;
            i >= n.left && i <= n.right && r >= n.top && r <= n.bottom && o(t);
          }));
      }));
  }
}
function initIntegrationCanvas() {
  const e = document.getElementById("integration-canvas");
  if (!e || "undefined" == typeof Matter) return;
  const {
      Engine: t,
      World: n,
      Bodies: o,
      Runner: i,
      Mouse: r,
      MouseConstraint: a,
      Events: s,
    } = Matter,
    l = e.closest("section");
  if (!l) return;
  const c = [
      "./assets/img/home-v1/integrations/integration-icon-01.svg",
      "./assets/img/home-v1/integrations/integration-icon-02.svg",
      "./assets/img/home-v1/integrations/integration-icon-03.svg",
      "./assets/img/home-v1/integrations/integration-icon-04.svg",
      "./assets/img/home-v1/integrations/integration-icon-05.svg",
      "./assets/img/home-v1/integrations/integration-icon-06.svg",
      "./assets/img/home-v1/integrations/integration-icon-07.svg",
      "./assets/img/home-v1/integrations/integration-icon-08.svg",
      "./assets/img/home-v1/integrations/integration-icon-09.svg",
      "./assets/img/home-v1/integrations/integration-icon-10.svg",
      "./assets/img/home-v1/integrations/integration-icon-11.svg",
      "./assets/img/home-v1/integrations/integration-icon-12.svg",
      "./assets/img/home-v1/integrations/integration-icon-13.svg",
      "./assets/img/home-v1/integrations/integration-icon-14.svg",
      "./assets/img/home-v1/integrations/integration-icon-15.svg",
      "./assets/img/home-v1/integrations/integration-icon-16.svg",
    ],
    d = () => {
      const e = window.innerWidth < 640;
      return {
        iconPaths: e ? c.slice(0, 14) : c,
        iconSize: e ? 60 : 80,
        spacing: e ? 90 : 120,
      };
    };
  let u = d(),
    p = u.iconPaths,
    m = u.iconSize,
    f = u.spacing;
  const y = [],
    v = [];
  let h = [],
    g = 0,
    w = null,
    b = null,
    L = !1,
    E = 0,
    C = 0;
  const S = t.create();
  ((S.world.gravity.y = 0), (S.world.gravity.scale = 0.001));
  let x = !1,
    q = null,
    A = null,
    P = !1;
  function M() {
    (v.length > 0 && (n.remove(S.world, v), (v.length = 0)),
      h.length > 0 && (n.remove(S.world, h), (h.length = 0)));
    const e = Math.ceil(Math.sqrt(p.length)),
      t = E / 2 - ((e - 1) * f) / 2;
    p.forEach((i, r) => {
      const a = r % e,
        s = Math.floor(r / e),
        l = t + a * f + 50 * (Math.random() - 0.5),
        c = -150 - 60 * s + 40 * (Math.random() - 0.5),
        d = o.circle(l, c, m / 2, {
          restitution: 0.4,
          friction: 0.1,
          frictionAir: 0.01,
          density: 8e-4,
          angle: 0.5 * (Math.random() - 0.5),
        });
      ((d.image = y[r]), v.push(d), n.add(S.world, d));
    });
    const i = 100;
    ((h = [
      o.rectangle(E / 2, C + 50, 2 * E, i, {
        isStatic: !0,
        render: { visible: !1 },
      }),
      o.rectangle(-50, C / 2, i, 3 * C, {
        isStatic: !0,
        render: { visible: !1 },
      }),
      o.rectangle(E + 50, C / 2, i, 3 * C, {
        isStatic: !0,
        render: { visible: !1 },
      }),
    ]),
      n.add(S.world, h));
  }
  const I = () => {
    const t = l.getBoundingClientRect();
    ((E = t.width),
      (C = t.height),
      (e.width = E),
      (e.height = C),
      q && (q.pixelRatio = window.devicePixelRatio || 1));
    const n = d();
    ((p.length !== n.iconPaths.length || m !== n.iconSize || f !== n.spacing) &&
      ((u = n),
      (p = u.iconPaths),
      (m = u.iconSize),
      (f = u.spacing),
      g > 0 && ((y.length = 0), (g = 0), k())),
      g === p.length && M());
  };
  let T;
  function k() {
    const e = () => {
      (g++, g === p.length && (M(), B()));
    };
    p.forEach((t) => {
      const n = new Image();
      ((n.onload = e), (n.onerror = e), (n.src = t), y.push(n));
    });
  }
  function B() {
    L ||
      (b || (b = i.create()),
      i.run(b, S),
      (L = !0),
      (function n() {
        L &&
          (t.update(S),
          (function () {
            const t = e.getContext("2d");
            (t.clearRect(0, 0, E, C),
              v.forEach((e) => {
                if (!e.image || !e.image.complete) return;
                const n = e.position,
                  o = e.angle;
                (t.save(), t.translate(n.x, n.y), t.rotate(o));
                const i = m;
                (t.drawImage(e.image, -i / 2, -i / 2, i, i), t.restore());
              }));
          })(),
          (w = requestAnimationFrame(n)));
      })());
  }
  (I(),
    window.addEventListener("resize", () => {
      (clearTimeout(T), (T = setTimeout(I, 250)));
    }),
    (function () {
      ((q = r.create(e)),
        (q.pixelRatio = window.devicePixelRatio || 1),
        (A = a.create(S, {
          mouse: q,
          constraint: { stiffness: 0.2, render: { visible: !1 } },
        })),
        n.add(S.world, A),
        s.on(A, "startdrag", () => {
          ((P = !0), (document.body.style.overflow = "hidden"));
        }),
        s.on(A, "enddrag", () => {
          ((P = !1), (document.body.style.overflow = ""));
        }),
        e.addEventListener(
          "wheel",
          (e) => {
            P && e.preventDefault();
          },
          { passive: !1 },
        ));
      const t = (t) => {
        const n = e.getBoundingClientRect(),
          o = e.width / n.width,
          i = e.height / n.height;
        ((q.position.x = (t.clientX - n.left) * o),
          (q.position.y = (t.clientY - n.top) * i));
      };
      (e.addEventListener("mousemove", t),
        e.addEventListener("mousedown", t),
        e.addEventListener("touchstart", (e) => {
          t(e.touches[0]);
        }),
        e.addEventListener(
          "touchmove",
          (e) => {
            (P && e.preventDefault(), t(e.touches[0]));
          },
          { passive: !1 },
        ));
      const o = () => {
        P && ((P = !1), (document.body.style.overflow = ""));
      };
      (document.addEventListener("mouseup", o),
        document.addEventListener("touchend", o));
    })(),
    k());
  const D = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        e.intersectionRatio >= 0.7
          ? (x || ((x = !0), (S.world.gravity.y = 0.8)),
            L || g !== p.length || B())
          : e.isIntersecting
            ? L || g !== p.length || B()
            : ((L = !1),
              w && (cancelAnimationFrame(w), (w = null)),
              b && i.stop(b));
      });
    },
    { threshold: [0, 0.7, 1] },
  );
  l && D.observe(l);
}
("undefined" != typeof fsLightbox &&
  (document.addEventListener("fslightbox:open", function () {
    if (void 0 !== window.lenis && window.lenis)
      try {
        "function" == typeof window.lenis.stop && window.lenis.stop();
      } catch (e) {
        console.warn("Lenis stop error:", e);
      }
    (document.body && (document.body.style.overflow = "hidden"),
      document.documentElement &&
        (document.documentElement.style.overflow = "hidden"),
      (preventWheelLightbox = function (e) {
        return (e.preventDefault(), e.stopPropagation(), !1);
      }),
      window.addEventListener("wheel", preventWheelLightbox, {
        passive: !1,
        capture: !0,
      }),
      window.addEventListener("touchmove", preventWheelLightbox, {
        passive: !1,
        capture: !0,
      }),
      window.addEventListener("scroll", preventWheelLightbox, {
        passive: !1,
        capture: !0,
      }));
  }),
  document.addEventListener("fslightbox:close", function () {
    if (
      (preventWheelLightbox &&
        (window.removeEventListener("wheel", preventWheelLightbox, {
          capture: !0,
        }),
        window.removeEventListener("touchmove", preventWheelLightbox, {
          capture: !0,
        }),
        window.removeEventListener("scroll", preventWheelLightbox, {
          capture: !0,
        }),
        (preventWheelLightbox = null)),
      void 0 !== window.lenis && window.lenis)
    )
      try {
        ("function" == typeof window.lenis.start && window.lenis.start(),
          document.documentElement &&
            document.documentElement.classList.remove("lenis-stopped"));
      } catch (e) {
        console.warn("Lenis start error:", e);
      }
    (document.body && (document.body.style.overflow = ""),
      document.documentElement &&
        (document.documentElement.style.overflow = ""));
  })),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelectorAll(".video-popup"),
      t = document.getElementById("popup-overlay"),
      n = document.getElementById("popup-video"),
      o = document.getElementById("popup-close");
    function i() {
      if (
        (window._preventWheelPopup &&
          (window.removeEventListener("wheel", window._preventWheelPopup, {
            capture: !0,
          }),
          window.removeEventListener("touchmove", window._preventWheelPopup, {
            capture: !0,
          }),
          window.removeEventListener("scroll", window._preventWheelPopup, {
            capture: !0,
          }),
          (window._preventWheelPopup = null)),
        void 0 !== window.lenis && window.lenis)
      )
        try {
          ("function" == typeof window.lenis.start && window.lenis.start(),
            document.documentElement &&
              document.documentElement.classList.remove("lenis-stopped"));
        } catch (e) {
          console.warn("Lenis start error:", e);
        }
      (document.body && (document.body.style.overflow = ""),
        document.documentElement &&
          (document.documentElement.style.overflow = ""));
    }
    e.length &&
      t &&
      n &&
      (e.forEach(function (e) {
        e.addEventListener("click", function (e) {
          e.preventDefault();
          var o = this.getAttribute("href");
          (o &&
            -1 !== o.indexOf("?") &&
            -1 === o.indexOf("autoplay") &&
            (o += (o.indexOf("?") === o.length - 1 ? "" : "&") + "autoplay=1"),
            (n.src = o || ""),
            t.classList.remove("popup-overlay-none"),
            (function () {
              if (void 0 !== window.lenis && window.lenis)
                try {
                  "function" == typeof window.lenis.stop && window.lenis.stop();
                } catch (e) {
                  console.warn("Lenis stop error:", e);
                }
              function e(e) {
                return (e.preventDefault(), e.stopPropagation(), !1);
              }
              (document.body && (document.body.style.overflow = "hidden"),
                document.documentElement &&
                  (document.documentElement.style.overflow = "hidden"),
                window.addEventListener("wheel", e, {
                  passive: !1,
                  capture: !0,
                }),
                window.addEventListener("touchmove", e, {
                  passive: !1,
                  capture: !0,
                }),
                window.addEventListener("scroll", e, {
                  passive: !1,
                  capture: !0,
                }),
                (window._preventWheelPopup = e));
            })());
        });
      }),
      o &&
        o.addEventListener("click", function () {
          (t.classList.add("popup-overlay-none"), (n.src = ""), i());
        }),
      t.addEventListener("click", function (e) {
        e.target === t &&
          (t.classList.add("popup-overlay-none"), (n.src = ""), i());
      }));
  }),
  document.addEventListener("DOMContentLoaded", initCounterAnimation),
  window.addEventListener("load", function () {
    "function" == typeof initCounterAnimation && initCounterAnimation();
  }),
  document.addEventListener("DOMContentLoaded", initDragCursor),
  document.addEventListener("DOMContentLoaded", initIntegrationCanvas));
const faqHeads = document.querySelectorAll(".faq-head");
function initClientReviewSlider() {
  if (
    document.querySelector(".client-review-slider") &&
    "undefined" != typeof Swiper
  ) {
    const t = new Swiper(".client-review-slider", {
      loop: !0,
      loopAdditionalSlides: 2,
      spaceBetween: 36,
      centeredSlides: !0,
      slidesPerView: 1,
      allowTouchMove: !0,
      speed: 1e3,
      autoHeight: !0,
      autoplay: { delay: 3e3 },
      on: {
        slideChange: function () {
          this.updateAutoHeight();
        },
        imagesReady: function () {
          this.updateAutoHeight();
        },
      },
    });
    var e;
    (window.addEventListener("resize", function () {
      (clearTimeout(e),
        (e = setTimeout(function () {
          t.updateAutoHeight();
        }, 100)));
    }),
      window.addEventListener("load", function () {
        t.updateAutoHeight();
      }));
  }
}
function showLoanCriteriaTab(e) {
  var t = $(".loan-criteria-tab-pane"),
    n = $(".loan-criteria-nav-tabs > li.cycle-tab-item");
  (t.removeClass("active"), n.removeClass("active"));
  var o = t.filter("#" + e);
  if (
    (o.addClass("active"),
    n
      .find('a[href="#' + e + '"]')
      .closest("li")
      .addClass("active"),
    "undefined" != typeof gsap && o.length)
  ) {
    const e = o[0],
      n = e.querySelector("h5,h3"),
      i = e.querySelector("p"),
      r = e.querySelectorAll("ul li"),
      a = e.querySelector("img"),
      s = ["top", "left", "right"][Array.from(t).indexOf(e) % 3];
    (n && gsap.set(n, { y: 50, opacity: 0, filter: "blur(10px)" }),
      i && gsap.set(i, { y: 50, opacity: 0, filter: "blur(10px)" }),
      r.length > 0 && gsap.set(r, { y: 50, opacity: 0, filter: "blur(10px)" }),
      a &&
        ("top" === s
          ? gsap.set(a, { clipPath: "inset(100% 0% 0% 0%)" })
          : "left" === s
            ? gsap.set(a, { clipPath: "inset(0% 0% 0% 100%)" })
            : "right" === s &&
              gsap.set(a, { clipPath: "inset(0% 100% 0% 0%)" })));
    const l = gsap.timeline();
    (n &&
      l.to(
        n,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      ),
      i &&
        l.to(
          i,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
          },
          0.3,
        ),
      r.length > 0 &&
        l.to(
          r,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
          },
          0.3,
        ),
      a &&
        l.to(
          a,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.4,
        ));
  }
  ((t = $(".loan-criteria-tab-pane")),
    (n = $(".loan-criteria-nav-tabs > li.cycle-tab-item")));
  (t.removeClass("active"),
    n.removeClass("active"),
    t.filter("#" + e).addClass("active"),
    n
      .find('a[href="#' + e + '"]')
      .closest("li")
      .addClass("active"));
}
function loanCriteriaTabChange() {
  var e = $(".loan-criteria-nav-tabs > li.cycle-tab-item"),
    t = e.filter(".active"),
    n = (t.next("li").length ? t.next("li") : e.first()).find("a").attr("href");
  n && 0 === n.indexOf("#") && showLoanCriteriaTab(n.slice(1));
}
var tabCycle;
(faqHeads.forEach((e) => {
  e.addEventListener("click", function () {
    const e = this.parentElement,
      t = e.querySelector(".faq-body");
    if (
      (document.querySelectorAll(".faq-wrapper .single-faq").forEach((t) => {
        if (t !== e) {
          t.classList.remove("active");
          const e = t.querySelector(".faq-body");
          e &&
            ((e.style.height = e.scrollHeight + "px"),
            setTimeout(() => {
              e.style.height = "0";
            }, 10),
            setTimeout(() => (e.style.display = "none"), 300));
        }
      }),
      e.classList.contains("active"))
    )
      (e.classList.remove("active"),
        (t.style.height = t.scrollHeight + "px"),
        setTimeout(() => {
          t.style.height = "0";
        }, 10),
        setTimeout(() => (t.style.display = "none"), 300));
    else {
      (e.classList.add("active"), (t.style.display = "block"));
      const n = t.scrollHeight + "px";
      ((t.style.height = "0"),
        setTimeout(() => {
          t.style.height = n;
        }, 10),
        setTimeout(() => (t.style.height = ""), 300));
    }
  });
}),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelector(".next-gen-accordion-wrapper");
    if (!e) return;
    const t = e.querySelectorAll(".next-gen-item"),
      n = document.querySelectorAll(".next-gen-image");
    if (!t.length) return;
    let o = 0,
      i = null,
      r = null,
      a = null;
    const s = ["top", "left", "right", "bottom", "top"];
    function l(e) {
      (r && r.kill(),
        t.forEach((t, n) => {
          const o = t.querySelector(".next-gen-progress-line"),
            i = t.querySelector(".next-gen-description");
          (o && gsap.set(o, { width: "0%" }),
            n === e
              ? (t.classList.add("active"),
                i && gsap.to(i, { maxHeight: 500, opacity: 1, duration: 0.3 }))
              : (t.classList.remove("active"),
                i && gsap.to(i, { maxHeight: 0, opacity: 0, duration: 0.2 })));
        }));
      const o = t[e].querySelector(".next-gen-progress-line");
      (o &&
        (i && i.kill(),
        gsap.set(o, { width: "0%" }),
        (i = gsap.to(o, { width: "100%", duration: 5, ease: "none" }))),
        (r = gsap.timeline()),
        n.forEach((t, n) => {
          const o = s[n];
          n === e
            ? (t.classList.add("active"),
              "top" === o
                ? gsap.set(t, { clipPath: "inset(100% 0% 0% 0%)", zIndex: 10 })
                : "left" === o
                  ? gsap.set(t, {
                      clipPath: "inset(0% 0% 0% 100%)",
                      zIndex: 10,
                    })
                  : "right" === o
                    ? gsap.set(t, {
                        clipPath: "inset(0% 100% 0% 0%)",
                        zIndex: 10,
                      })
                    : "bottom" === o &&
                      gsap.set(t, {
                        clipPath: "inset(0% 0% 100% 0%)",
                        zIndex: 10,
                      }),
              r.to(
                t,
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.6,
                  ease: "power2.out",
                },
                0,
              ))
            : (t.classList.remove("active"),
              "top" === o
                ? gsap.set(t, { clipPath: "inset(100% 0% 0% 0%)", zIndex: 1 })
                : "left" === o
                  ? gsap.set(t, { clipPath: "inset(0% 0% 0% 100%)", zIndex: 1 })
                  : "right" === o
                    ? gsap.set(t, {
                        clipPath: "inset(0% 100% 0% 0%)",
                        zIndex: 1,
                      })
                    : "bottom" === o &&
                      gsap.set(t, {
                        clipPath: "inset(0% 0% 100% 0%)",
                        zIndex: 1,
                      }));
        }));
    }
    function c() {
      ((o = (o + 1) % t.length), l(o));
    }
    function d() {
      (u(), (a = setInterval(c, 5e3)));
    }
    function u() {
      (a && clearInterval(a), (a = null), i && i.pause());
    }
    (l(0),
      d(),
      t.forEach((e, t) => {
        const n = e.querySelector(".next-gen-header");
        n &&
          n.addEventListener("click", () => {
            (u(), (o = t), l(o));
          });
      }),
      e.addEventListener("mouseenter", u),
      e.addEventListener("mouseleave", function () {
        (i && i.resume(), d());
      }));
  }),
  document.addEventListener("DOMContentLoaded", initClientReviewSlider),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelectorAll(".form-tabs");
    e.length &&
      "undefined" != typeof gsap &&
      e.forEach((e) => {
        const t = e.querySelectorAll(".form-tab"),
          n = e.querySelectorAll(".form-tab-panel");
        t.forEach((o) => {
          o.addEventListener("click", function () {
            const o = this.dataset.tab,
              i = e.querySelector(`#${o}`);
            if (!i) return;
            if (
              this.classList.contains("active") &&
              i.classList.contains("active")
            )
              return;
            (t.forEach((e) => e.classList.remove("active")),
              n.forEach((e) => {
                if ((e.classList.remove("active"), e !== i)) {
                  const t = e.querySelector(".form-tab-panel-wrapper");
                  t &&
                    (gsap.killTweensOf(t),
                    gsap.set(t, { y: 100, opacity: 0, filter: "blur(6px)" }));
                }
              }),
              this.classList.add("active"),
              i.classList.add("active"));
            const r = i.querySelector(".form-tab-panel-wrapper");
            r &&
              (gsap.killTweensOf(r),
              gsap.fromTo(
                r,
                { y: 100, opacity: 0, filter: "blur(6px)" },
                {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 0.6,
                  ease: "power2.out",
                },
              ));
          });
        });
      });
  }),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelectorAll(".password-field");
    e.length &&
      e.forEach((e) => {
        const t = e.querySelector(".password-input"),
          n = e.querySelector(".password-toggle");
        n.addEventListener("click", () => {
          const e = "password" === t.type;
          ((t.type = e ? "text" : "password"),
            n.setAttribute("aria-label", e ? "Hide password" : "Show password"),
            n.classList.toggle("active"));
        });
      });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    const e = document.getElementById("priceToggle");
    if (!e) return;
    const t = document.querySelectorAll(".price"),
      n = document.querySelectorAll(".period"),
      o = ["$19", "$49", "$99"],
      i = ["$190", "$490", "$990"];
    e.addEventListener("change", () => {
      const r = e.checked;
      (t.forEach((e, t) => {
        e.textContent = r ? i[t] : o[t];
      }),
        n.forEach((e) => {
          e.textContent = r ? "/ year" : "/ month";
        }));
    });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[action='#']").forEach((e) => {
      const t = e.querySelector("button[type='submit']"),
        n = t?.querySelector(".btn-text"),
        o = t?.querySelector(".loader"),
        i = e.querySelector("#formMessage");
      function r(e, t, n) {
        (e.classList.add("border-red-500"),
          e.classList.remove("border-green-500"),
          t &&
            ((t.textContent = n || "This field is required."),
            t.classList.remove("hidden"),
            (t.style.display = "block"),
            (t.style.opacity = "1")));
      }
      function a(e, t) {
        (e.classList.remove("border-red-500"),
          e.classList.add("border-green-500"),
          t &&
            (t.classList.add("hidden"),
            (t.style.display = "none"),
            (t.style.opacity = "0")));
      }
      t &&
        i &&
        (e
          .querySelectorAll("input[required], textarea[required]")
          .forEach((e) => {
            e.addEventListener("input", () => {
              const t = document.getElementById(`${e.id}-error`);
              if ("email" === e.type) {
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim()) && a(e, t);
              } else e.value.trim() && a(e, t);
            });
          }),
        e.addEventListener("submit", (s) => {
          s.preventDefault();
          let l = !0;
          (i.classList.add("hidden"),
            e
              .querySelectorAll("input[required], textarea[required]")
              .forEach((e) => {
                const t = document.getElementById(`${e.id}-error`),
                  n = e.value.trim();
                n
                  ? "email" !== e.type || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)
                    ? a(e, t)
                    : (r(e, t, "Please enter a valid email address."), (l = !1))
                  : (r(e, t), (l = !1));
              }),
            l &&
              ((t.disabled = !0),
              o && o.classList.remove("hidden"),
              n && (n.textContent = "Sending..."),
              setTimeout(() => {
                (o && o.classList.add("hidden"),
                  (t.disabled = !1),
                  n && (n.textContent = "Send"),
                  "demoForm" === e.id
                    ? (i.textContent = "✅ Demo request sent successfully!")
                    : (i.textContent = "✅ Message sent successfully!"),
                  (i.className =
                    "sm:col-span-2 mt-3 text-center text-sm text-green-400 transition-opacity duration-300"),
                  e.reset(),
                  e.querySelectorAll("input, textarea").forEach((e) => {
                    e.classList.remove("border-green-500", "border-red-500");
                  }),
                  setTimeout(() => i.classList.add("hidden"), 4e3));
              }, 1500)));
        }));
    });
    const e = document.getElementById("accessForm"),
      t = document.getElementById("protected-email"),
      n = document.getElementById("accessMessage"),
      o = document.getElementById("accessBtn");
    if (e && t && o && n) {
      const i = document.getElementById(`${t.id}-error`);
      (e.addEventListener("submit", (r) => {
        r.preventDefault();
        const a = t.value.trim();
        return (
          t.classList.remove("border-green-500", "border-red-500"),
          n.classList.add("hidden"),
          a
            ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)
              ? (t.classList.add("border-green-500"),
                i.classList.add("hidden"),
                (o.disabled = !0),
                (o.textContent = "Verifying..."),
                void setTimeout(() => {
                  ((o.disabled = !1),
                    (o.textContent = "Submit"),
                    (n.textContent = "✅ Verification email sent!"),
                    (n.className =
                      "mt-3 text-center text-sm text-green-400 transition-opacity duration-300"),
                    e.reset(),
                    t.classList.remove("border-green-500"),
                    setTimeout(() => n.classList.add("hidden"), 4e3));
                }, 1200))
              : (t.classList.add("border-red-500"),
                (i.textContent = "Please enter a valid email address."),
                void i.classList.remove("hidden"))
            : (t.classList.add("border-red-500"),
              (i.textContent = "Email is required."),
              void i.classList.remove("hidden"))
        );
      }),
        t.addEventListener("input", () => {
          const e = t.value.trim();
          e &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) &&
            (t.classList.remove("border-red-500"),
            t.classList.add("border-green-500"),
            i.classList.add("hidden"));
        }));
    }
    const i = document.getElementById("footer-newsletter-form"),
      r = document.getElementById("newsletter-email"),
      a = document.getElementById("newsletter-email-error"),
      s = document.getElementById("newsletter-success");
    if (i && r && a) {
      const e = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      (i.addEventListener("submit", function (t) {
        t.preventDefault();
        const n = r.value.trim();
        return (
          r.classList.remove(
            "border-red-500",
            "border-green-500",
            "border-primary",
          ),
          a.classList.add("hidden"),
          (a.textContent = ""),
          s && (s.classList.add("hidden"), (s.textContent = "")),
          n
            ? e.test(n)
              ? (r.classList.add("border-green-500"),
                a.classList.add("hidden"),
                i.reset(),
                r.classList.remove("border-green-500"),
                void (
                  s &&
                  ((s.textContent = "Thank you! You've been subscribed."),
                  s.classList.remove("hidden"),
                  setTimeout(function () {
                    (s.classList.add("hidden"), (s.textContent = ""));
                  }, 4e3))
                ))
              : (r.classList.add("border-red-500"),
                (a.textContent = "Please enter a valid email address."),
                void a.classList.remove("hidden"))
            : (r.classList.add("border-red-500"),
              (a.textContent = "Email is required."),
              void a.classList.remove("hidden"))
        );
      }),
        r.addEventListener("input", function () {
          const t = r.value.trim();
          (a.classList.add("hidden"),
            (a.textContent = ""),
            t && e.test(t)
              ? (r.classList.remove("border-red-500"),
                r.classList.add("border-green-500"))
              : r.classList.remove("border-green-500"));
        }));
    }
    const l = document.getElementById("hero-email-form"),
      c = document.getElementById("hero-email"),
      d = document.getElementById("hero-email-error"),
      u = document.getElementById("hero-email-success");
    if (l && c && d) {
      const e = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      (l.addEventListener("submit", function (t) {
        t.preventDefault();
        const n = c.value.trim();
        return (
          c.classList.remove(
            "border-red-500",
            "border-green-500",
            "border-primary",
          ),
          d.classList.add("hidden"),
          (d.textContent = ""),
          u && (u.classList.add("hidden"), (u.textContent = "")),
          n
            ? e.test(n)
              ? (c.classList.add("border-green-500"),
                d.classList.add("hidden"),
                l.reset(),
                c.classList.remove("border-green-500"),
                void (
                  u &&
                  ((u.textContent = "Thank you! You've been subscribed."),
                  u.classList.remove("hidden"),
                  setTimeout(function () {
                    (u.classList.add("hidden"), (u.textContent = ""));
                  }, 4e3))
                ))
              : (c.classList.add("border-red-500"),
                (d.textContent = "Please enter a valid email address."),
                void d.classList.remove("hidden"))
            : (c.classList.add("border-red-500"),
              (d.textContent = "Email is required."),
              void d.classList.remove("hidden"))
        );
      }),
        c.addEventListener("input", function () {
          const t = c.value.trim();
          (d.classList.add("hidden"),
            (d.textContent = ""),
            t && e.test(t)
              ? (c.classList.remove("border-red-500"),
                c.classList.add("border-green-500"))
              : c.classList.remove("border-green-500"));
        }));
    }
  }),
  $(function () {
    if ($(".loan-criteria-nav-tabs").length) {
      if ("undefined" != typeof gsap) {
        const e = $(".loan-criteria-tab-pane");
        e.each(function (e) {
          const t = this,
            n = $(t),
            o = t.querySelector("h5"),
            i = t.querySelector("p"),
            r = t.querySelectorAll("ul li"),
            a = t.querySelector("img");
          if (
            !n.hasClass("active") &&
            (o && gsap.set(o, { y: 50, opacity: 0, filter: "blur(10px)" }),
            i && gsap.set(i, { y: 50, opacity: 0, filter: "blur(10px)" }),
            r.length > 0 &&
              gsap.set(r, { y: 50, opacity: 0, filter: "blur(10px)" }),
            a)
          ) {
            const t = ["top", "left", "right"][e % 3];
            "top" === t
              ? gsap.set(a, { clipPath: "inset(100% 0% 0% 0%)" })
              : "left" === t
                ? gsap.set(a, { clipPath: "inset(0% 0% 0% 100%)" })
                : "right" === t &&
                  gsap.set(a, { clipPath: "inset(0% 100% 0% 0%)" });
          }
        });
        const t = e.filter(".active");
        if (t.length) {
          const e = t.attr("id");
          e &&
            setTimeout(() => {
              showLoanCriteriaTab(e);
            }, 200);
        }
      }
      $(".loan-criteria-nav-tabs").length &&
        ((tabCycle = setInterval(loanCriteriaTabChange, 5e3)),
        $(".cycle-tab-container .loan-criteria-tab-pane").hover(
          function () {
            clearInterval(tabCycle);
          },
          function () {
            tabCycle = setInterval(loanCriteriaTabChange, 5e3);
          },
        ),
        $(".cycle-tab-item a").on("click", function (e) {
          (e.preventDefault(), clearInterval(tabCycle));
          var t = $(this).attr("href");
          (t && 0 === t.indexOf("#") && showLoanCriteriaTab(t.slice(1)),
            (tabCycle = setInterval(loanCriteriaTabChange, 5e3)));
        }));
    }
  }),
  $(function () {
    var e = $("[data-loan-apply-section]");
    if (e.length) {
      var t = e.find(".loan-apply-step-pane"),
        n = e.find(".loan-apply-step"),
        o = e.find("#loanApplyForm"),
        i = e.find("[data-amount-input]"),
        r = e.find("[data-loan-apply-review]");
      if (o.length) {
        (i.length &&
          i.on("input", function () {
            var e,
              t = $(this).val(),
              n =
                (this.selectionStart,
                (e = (t || "").replace(/[^0-9]/g, ""))
                  ? parseInt(e, 10).toLocaleString()
                  : "");
            $(this).val(n);
            var o = n.length;
            this.setSelectionRange(o, o);
          }),
          e.find(".loan-apply-input").on("input change", function () {
            var e = $(this);
            ($("#" + e.attr("id") + "-error").addClass("hidden"),
              e.removeClass("border-red-500"));
          }),
          e.find(".loan-apply-dob-trigger").on("click", function (e) {
            e.preventDefault();
            var t = document.getElementById("loan-dob");
            if (t)
              if ("function" == typeof t.showPicker)
                try {
                  t.showPicker();
                } catch (e) {
                  t.focus();
                }
              else t.focus();
          }),
          o.on("submit", function (t) {
            var n;
            (t.preventDefault(), u()) &&
              (r.html(
                ((n = ""),
                [
                  {
                    key: "Loan Purpose",
                    getVal: function () {
                      return p("#loan-purpose");
                    },
                  },
                  {
                    key: "Desired Term (Month)",
                    getVal: function () {
                      return p("#desired-term");
                    },
                  },
                  {
                    key: "Date of Birth",
                    getVal: function () {
                      return e.find("#loan-dob").val() || "";
                    },
                  },
                  {
                    key: "Employment Status",
                    getVal: function () {
                      return p("#employment-status");
                    },
                  },
                  {
                    key: "Requested Amount",
                    getVal: function () {
                      return "$ " + (i.val() || "0");
                    },
                  },
                  {
                    key: "Full Legal Name",
                    getVal: function () {
                      return e.find("#full-legal-name").val() || "";
                    },
                  },
                  {
                    key: "Gross Annual Income",
                    getVal: function () {
                      return e.find("#gross-annual-income").val() || "";
                    },
                  },
                  {
                    key: "Phone Number",
                    getVal: function () {
                      return e.find("#loan-phone").val() || "";
                    },
                  },
                ].forEach(function (e) {
                  var t = e.getVal();
                  n +=
                    '<p><strong class="text-title_white">' +
                    e.key +
                    ':</strong> <span class="text-paragraph_white">' +
                    (t || "—") +
                    "</span></p>";
                }),
                n || '<p class="text-paragraph_white">No data to review.</p>'),
              ),
              d(2));
          }),
          e.find(".loan-apply-prev").on("click", function () {
            d(1);
          }),
          e.find(".loan-apply-next-verify").on("click", function () {
            d(3);
          }));
        var a = e.find(".loan-verify-connect-bank"),
          s = e.find(".loan-verify-file-input"),
          l = e.find(".loan-apply-next-verify"),
          c = e.find(".loan-connect-popup");
        (a.on("click", function () {
          c.length &&
            (c.removeClass("hidden").addClass("flex"),
            c.attr("aria-hidden", "false"),
            (function () {
              if (void 0 !== window.lenis && window.lenis)
                try {
                  ("function" == typeof window.lenis.stop &&
                    window.lenis.stop(),
                    document.documentElement &&
                      document.documentElement.classList.add("lenis-stopped"));
                } catch (e) {
                  console.warn("Lenis stop error:", e);
                }
              (document.body && (document.body.style.overflow = "hidden"),
                document.documentElement &&
                  (document.documentElement.style.overflow = "hidden"));
            })());
        }),
          e.on("click", "[data-close-popup]", function (e) {
            (e.preventDefault(), y());
          }),
          s.on("change", function () {
            (f($(this)), m());
          }),
          e.on("click", ".loan-verify-upload-card", function (e) {
            if (
              !$(e.target).closest(
                ".loan-verify-remove-file, .loan-verify-file-input",
              ).length
            ) {
              var t = $(this).find(".loan-verify-file-input");
              t.length && t.trigger("click");
            }
          }),
          e.on("click", ".loan-verify-remove-file", function (e) {
            (e.preventDefault(), e.stopPropagation());
            var t = $(this)
              .closest(".loan-verify-upload-card")
              .find(".loan-verify-file-input");
            (t.val(""), f(t), m());
          }),
          s.each(function () {
            f($(this));
          }),
          m(),
          e.find(".loan-apply-reset").on("click", function () {
            (o[0].reset(),
              i.length && i.val("20,000"),
              e.find(".loan-apply-input").removeClass("border-red-500"),
              e.find('[id$="-error"]').addClass("hidden"),
              e.find(".loan-verify-file-input").val(""),
              e.find(".loan-verify-file-input").each(function () {
                f($(this));
              }),
              m(),
              "function" == typeof $().niceSelect &&
                e.find(".loan-apply-select").each(function () {
                  var e = $(this);
                  (e.next(".nice-select").length && e.niceSelect("destroy"),
                    e.niceSelect());
                }),
              d(1));
          }));
      }
    }
    function d(e) {
      (t.removeClass("active"),
        t.filter('[data-pane="' + e + '"]').addClass("active"),
        n.removeClass("active"),
        n.filter('[data-step="' + e + '"]').addClass("active"));
    }
    function u() {
      var t,
        n = !0;
      (e.find(".loan-apply-input, .loan-apply-select").each(function () {
        var e = $(this),
          t = $("#" + e.attr("id") + "-error"),
          o = e.val();
        !e.attr("required") || (null != o && "" !== String(o).trim())
          ? (t.addClass("hidden"), e.removeClass("border-red-500"))
          : (t.removeClass("hidden"), e.addClass("border-red-500"), (n = !1));
      }),
      n && i.length) &&
        ((t = i.val()), parseInt((t || "").replace(/[^0-9]/g, ""), 10) || 0) <=
          0 &&
        (e.find("#requested-amount-error").removeClass("hidden"),
        i.addClass("border-red-500"),
        (n = !1));
      return n;
    }
    function p(t) {
      var n = e.find(t);
      if (!n.length) return "";
      var o = n.find("option:selected");
      return o.length ? o.text().trim() : n.val() || "";
    }
    function m() {
      l.length &&
        l.prop(
          "disabled",
          !(
            4 === s.length &&
            s.toArray().every(function (e) {
              return e.files && e.files.length > 0;
            })
          ),
        );
    }
    function f(e) {
      var t = e.closest(".loan-verify-upload-card"),
        n = t.find(".loan-verify-upload-default"),
        o = t.find(".loan-verify-upload-selected"),
        i = t.find(".loan-verify-file-name"),
        r = e[0].files && e[0].files[0];
      r
        ? (n.addClass("hidden"), o.removeClass("hidden"), i.text(r.name))
        : (n.removeClass("hidden"), o.addClass("hidden"), i.text(""));
    }
    function y() {
      c.length &&
        (c.addClass("hidden").removeClass("flex"),
        c.attr("aria-hidden", "true"),
        (function () {
          if (void 0 !== window.lenis && window.lenis)
            try {
              ("function" == typeof window.lenis.start && window.lenis.start(),
                document.documentElement &&
                  document.documentElement.classList.remove("lenis-stopped"));
            } catch (e) {
              console.warn("Lenis start error:", e);
            }
          (document.body && (document.body.style.overflow = ""),
            document.documentElement &&
              (document.documentElement.style.overflow = ""));
        })());
    }
  }),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.querySelector(".documentation");
    if (!e) return;
    const t = e.querySelectorAll(".documentation-nav-tab"),
      n = e.querySelectorAll(".documentation-tab-content");
    function o(e, t) {
      if ("undefined" == typeof gsap || !e) return;
      const n = e.querySelector(".grid");
      if (!n) return;
      const o = n.querySelector("p"),
        i = n.querySelector("h4,h3"),
        r = n.querySelectorAll("p"),
        a = r.length > 1 ? r[1] : null,
        s = n.querySelectorAll("ul li"),
        l = n.querySelector("img"),
        c = ["top", "left", "right", "bottom"][t % 4];
      (o && gsap.set(o, { y: 50, opacity: 0, filter: "blur(10px)" }),
        i && gsap.set(i, { y: 50, opacity: 0, filter: "blur(10px)" }),
        a && gsap.set(a, { y: 50, opacity: 0, filter: "blur(10px)" }),
        s.length > 0 &&
          gsap.set(s, { y: 50, opacity: 0, filter: "blur(10px)" }),
        l &&
          ("top" === c
            ? gsap.set(l, { clipPath: "inset(100% 0% 0% 0%)" })
            : "left" === c
              ? gsap.set(l, { clipPath: "inset(0% 0% 0% 100%)" })
              : "right" === c
                ? gsap.set(l, { clipPath: "inset(0% 100% 0% 0%)" })
                : "bottom" === c &&
                  gsap.set(l, { clipPath: "inset(0% 0% 100% 0%)" })));
      const d = gsap.timeline();
      (o &&
        d.to(
          o,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
          },
          0,
        ),
        i &&
          d.to(
            i,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
            },
            0.1,
          ),
        a &&
          d.to(
            a,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
            },
            0.2,
          ),
        s.length > 0 &&
          d.to(
            s,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
            },
            0.3,
          ),
        l &&
          d.to(
            l,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              ease: "power2.inOut",
            },
            0.2,
          ));
    }
    if (
      (t.forEach((i, r) => {
        i.addEventListener("click", function () {
          const i = this.getAttribute("data-tab");
          (t.forEach((e) => e.classList.remove("active")),
            n.forEach((e) => e.classList.remove("active")),
            this.classList.add("active"));
          const a = e.querySelector("#" + i);
          a && (a.classList.add("active"), o(a, r));
        });
      }),
      "undefined" != typeof gsap)
    ) {
      n.forEach((e, t) => {
        const n = e.classList.contains("active"),
          o = e.querySelector(".grid");
        if (!o) return;
        const i = o.querySelector("p"),
          r = o.querySelector("h4"),
          a = o.querySelectorAll("p"),
          s = a.length > 1 ? a[1] : null,
          l = o.querySelectorAll("ul li"),
          c = o.querySelector("img");
        if (
          !n &&
          (i && gsap.set(i, { y: 50, opacity: 0, filter: "blur(10px)" }),
          r && gsap.set(r, { y: 50, opacity: 0, filter: "blur(10px)" }),
          s && gsap.set(s, { y: 50, opacity: 0, filter: "blur(10px)" }),
          l.length > 0 &&
            gsap.set(l, { y: 50, opacity: 0, filter: "blur(10px)" }),
          c)
        ) {
          const e = ["top", "left", "right", "bottom"][t % 4];
          "top" === e
            ? gsap.set(c, { clipPath: "inset(100% 0% 0% 0%)" })
            : "left" === e
              ? gsap.set(c, { clipPath: "inset(0% 0% 0% 100%)" })
              : "right" === e
                ? gsap.set(c, { clipPath: "inset(0% 100% 0% 0%)" })
                : "bottom" === e &&
                  gsap.set(c, { clipPath: "inset(0% 0% 100% 0%)" });
        }
      });
      const t = e.querySelector(".documentation-tab-content.active");
      if (t) {
        const e = Array.from(n).indexOf(t);
        setTimeout(() => {
          o(t, e);
        }, 200);
      }
    }
  }));
var swiper = new Swiper(".loan-option-slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  breakpoints: {
    480: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 3 },
    1536: { slidesPerView: 3 },
  },
  pagination: { el: ".loan-option-slider-pagination", type: "progressbar" },
});
$(document).ready(function () {
  ($(".toc-list").toc({
    content: "div.article-content",
    headings: "h2,h3,h4,h5",
  }),
    (function () {
      const e = document.querySelector("div.article-content"),
        t = document.querySelector(".toc-list");
      if (!e || !t) return;
      const n = e.querySelectorAll("h2, h3, h4, h5");
      if (!n.length) return;
      t.innerHTML = "";
      const o = new Set();
      n.forEach((e, n) => {
        let i = e.getAttribute("id");
        if (!i) {
          const t =
            (e.textContent || e.innerText || "section")
              .toString()
              .trim()
              .toLowerCase()
              .replace(/[\s\W]+/g, "_")
              .replace(/^_+|_+$/g, "") || "section";
          let n = t,
            r = 1;
          for (; o.has(n) || document.getElementById(n); ) n = `${t}_${r++}`;
          ((i = n), e.setAttribute("id", i), o.add(i));
        }
        const r = document.createElement("li"),
          a = document.createElement("a");
        ((a.href = `#${i}`),
          (a.textContent = e.textContent || e.innerText || `Section ${n + 1}`),
          r.appendChild(a),
          t.appendChild(r));
      });
    })(),
    $(document).on("click", ".toc-list a", function (e) {
      const t = $(this).attr("href");
      if (!t || "#" !== t.charAt(0)) return;
      const n = document.querySelector(t);
      if (!n) return;
      e.preventDefault();
      const o = document.querySelector(".header-area"),
        i = o ? o.offsetHeight : 0;
      if (window.lenis && "function" == typeof window.lenis.scrollTo)
        window.lenis.scrollTo(n, { offset: -i, duration: 0.8 });
      else {
        const e = n.getBoundingClientRect().top + window.pageYOffset - i;
        window.scrollTo({ top: e, behavior: "smooth" });
      }
    }),
    (function () {
      const e = document.querySelector("div.article-content"),
        t = document.querySelector(".toc-list");
      if (!e || !t) return;
      const n = Array.from(t.querySelectorAll("a"));
      if (!n.length) return;
      const o = document.querySelector(".header-area"),
        i = () =>
          n
            .map((e) => document.querySelector(e.getAttribute("href")))
            .filter(Boolean);
      let r = i();
      const a = () => {
        const e = (o ? o.offsetHeight : 0) + 8;
        let i = 0;
        for (let t = 0; t < r.length; t++) {
          if (!(r[t].getBoundingClientRect().top - e <= 0)) break;
          i = t;
        }
        var a;
        ((a = i),
          n.forEach((e, t) => {
            const n = e.parentElement;
            n &&
              (t === a
                ? (n.classList.add("active"),
                  e.setAttribute("aria-current", "true"))
                : (n.classList.remove("active"),
                  e.removeAttribute("aria-current")));
          }));
        const s = n[i],
          l = s ? s.parentElement : null;
        if (l) {
          const e = t.getBoundingClientRect(),
            n = l.getBoundingClientRect();
          let o = n.top - e.top + 0.5 * n.height;
          const i = e.height;
          ((o = Math.max(0, Math.min(i, o))),
            t.style.setProperty("--toc-progress", o + "px"));
        }
      };
      (window.lenis && "function" == typeof window.lenis.on
        ? window.lenis.on("scroll", a)
        : window.addEventListener("scroll", a, { passive: !0 }),
        window.addEventListener("resize", () => {
          ((r = i()), a());
        }),
        a());
    })());
});
const tracks = document.querySelectorAll(".marquee-slider");
(tracks.forEach((e) => {
  const t = e.innerHTML;
  e.innerHTML += t;
  let n = 1,
    o = 0;
  (requestAnimationFrame(function t() {
    ((o -= n),
      Math.abs(o) >= e.scrollWidth / 2 && (o = 0),
      (e.style.transform = `translate3d(${o}px, 0, 0)`),
      requestAnimationFrame(t));
  }),
    e.addEventListener("mouseenter", () => (n = 0)),
    e.addEventListener("mouseleave", () => (n = 1)));
}),
  $(document).ready(function () {
    const e = document.querySelectorAll(".count"),
      t = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            e.isIntersecting &&
              ((e) => {
                if (e.data("done")) return;
                e.data("done", !0);
                const t = parseFloat(e.data("value")),
                  n = String(t).includes("."),
                  o = Math.round(1.4 * 45),
                  i = t / o;
                let r = 0,
                  a = 0;
                const s = setInterval(() => {
                  (a++,
                    (r += i),
                    a >= o
                      ? (e.text(t), clearInterval(s))
                      : e.text(n ? r.toFixed(1) : Math.floor(r)));
                }, 1e3 / 45);
              })($(e.target));
          });
        },
        { threshold: 0.4 },
      );
    e.forEach((e) => t.observe(e));
  }));
swiper = new Swiper(".demo-banner-marque-slider", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: !0,
  speed: 5e3,
  autoplay: { delay: 0, disableOnInteraction: !1 },
  freeMode: !0,
  freeModeMomentum: !1,
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
  },
});
document.querySelectorAll(".copy-link-btn").forEach(function (e) {
  e.addEventListener("click", function () {
    navigator.clipboard.writeText(window.location.href).then(function () {
      const t = e.querySelector(".copy-tooltip");
      (t.classList.add("show"),
        setTimeout(function () {
          t.classList.remove("show");
        }, 2e3));
    });
  });
});
