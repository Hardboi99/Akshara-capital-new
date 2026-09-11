!(function () {
  "use strict";
  if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger)
    return void console.warn(
      "Grid Reveal: GSAP and ScrollTrigger are required",
    );
  const t = {
    wave: function (t, e) {
      const i = [],
        n = Array(e)
          .fill(0)
          .map(() => Array(t).fill(!1));
      for (let s = 0; s < e + t - 1; s++)
        for (let a = Math.max(0, s - t + 1); a <= Math.min(s, e - 1); a++) {
          const e = s - a;
          if (e < t && !n[a][e]) {
            const s = a * t + e;
            (i.push(s), (n[a][e] = !0));
          }
        }
      return i;
    },
    spiral: function (t, e) {
      const i = [],
        n = Math.floor(e / 2),
        s = Math.floor(t / 2),
        a = Array(e)
          .fill(0)
          .map(() => Array(t).fill(!1));
      let r = 0,
        o = 1,
        l = n,
        c = s,
        d = 0,
        g = 0;
      for (; i.length < t * e; ) {
        if (l >= 0 && l < e && c >= 0 && c < t && !a[l][c]) {
          const e = l * t + c;
          (i.push(e), (a[l][c] = !0));
        }
        switch (r) {
          case 0:
            c++;
            break;
          case 1:
            l++;
            break;
          case 2:
            c--;
            break;
          case 3:
            l--;
        }
        (d++, d >= o && ((r = (r + 1) % 4), g++, (d = 0), g % 2 == 0 && o++));
      }
      return i;
    },
    random: function (t, e) {
      const i = t * e,
        n = Array.from({ length: i }, (t, e) => e);
      for (let t = n.length - 1; t > 0; t--) {
        const e = Math.floor(Math.random() * (t + 1));
        [n[t], n[e]] = [n[e], n[t]];
      }
      return n;
    },
    horizontal: function (t, e) {
      const i = [];
      for (let n = 0; n < e; n++) for (let e = 0; e < t; e++) i.push(n * t + e);
      return i;
    },
    vertical: function (t, e) {
      const i = [];
      for (let n = 0; n < t; n++) for (let s = 0; s < e; s++) i.push(s * t + n);
      return i;
    },
  };
  function e(t) {
    const e = window.innerWidth;
    let i, n;
    return (
      e <= 640 && t.hasAttribute("data-cols-sm")
        ? ((i =
            parseInt(t.getAttribute("data-cols-sm")) ||
            parseInt(t.getAttribute("data-cols")) ||
            10),
          (n = t.hasAttribute("data-rows-sm")
            ? parseInt(t.getAttribute("data-rows-sm"))
            : parseInt(t.getAttribute("data-rows")) || 20))
        : e <= 1024 && t.hasAttribute("data-cols-lg")
          ? ((i =
              parseInt(t.getAttribute("data-cols-lg")) ||
              parseInt(t.getAttribute("data-cols")) ||
              10),
            (n = t.hasAttribute("data-rows-lg")
              ? parseInt(t.getAttribute("data-rows-lg"))
              : parseInt(t.getAttribute("data-rows")) || 20))
          : ((i = parseInt(t.getAttribute("data-cols")) || 10),
            (n = parseInt(t.getAttribute("data-rows")) || 20)),
      { cols: i, rows: n }
    );
  }
  class i {
    constructor(t) {
      ((this.element = t),
        (this.masks = []),
        (this.animationTimeline = null),
        (this.isRevealed = !1),
        (this.isAnimating = !1),
        (this.hasPlayedOnce = !1),
        (this.scrollTrigger = null));
      const i = e(t);
      ((this.config = {
        cols: i.cols,
        rows: i.rows,
        animation: t.dataset.animation || "wave",
        bgColor: t.dataset.bgColor || "#003A96",
        trigger: t.dataset.trigger || "top 60%",
        stagger: parseFloat(t.dataset.stagger) || 0.01,
        duration: parseFloat(t.dataset.duration) || 0.5,
        bgImageSelector: t.dataset.bgImage || null,
        playOnce: "false" !== t.dataset.playOnce,
        ease: t.dataset.ease || "power3.out",
      }),
        (this.totalMasks = this.config.cols * this.config.rows),
        (this.uniqueId =
          "grid-reveal-" + Math.random().toString(36).substr(2, 9)),
        this.init());
    }
    init() {
      (this.createMaskContainer(),
        this.generateMasks(),
        this.generateCSS(),
        this.setupBackground(),
        this.setupAnimation(),
        this.setupScrollTrigger());
    }
    createMaskContainer() {
      let t = this.element.querySelector(".grid-reveal-masks");
      (t ||
        ((t = document.createElement("div")),
        (t.className = "grid-reveal-masks"),
        t.setAttribute("data-unique-id", this.uniqueId),
        (this.element.style.position = "relative"),
        this.element.appendChild(t)),
        (this.maskContainer = t));
    }
    generateMasks() {
      ((this.maskContainer.innerHTML = ""), (this.masks = []));
      for (let t = 1; t <= this.totalMasks; t++) {
        const e = document.createElement("div");
        ((e.className = "grid-reveal-mask"),
          e.setAttribute("data-mask-index", t - 1),
          (e.style.backgroundColor = this.config.bgColor),
          this.maskContainer.appendChild(e),
          this.masks.push(e));
      }
    }
    generateCSS() {
      const t = 100 / this.config.cols,
        e = 100 / this.config.rows,
        i = 0.1;
      let n = document.getElementById(`grid-reveal-styles-${this.uniqueId}`);
      n ||
        ((n = document.createElement("style")),
        (n.id = `grid-reveal-styles-${this.uniqueId}`),
        document.head.appendChild(n));
      let s = `\n                [data-unique-id="${this.uniqueId}"] {\n                    position: absolute;\n                    inset: 0;\n                    pointer-events: none;\n                    z-index: 10;\n                    overflow: hidden;\n                }\n                [data-unique-id="${this.uniqueId}"] .grid-reveal-mask {\n                    position: absolute;\n                    inset: 0;\n                    background-size: cover;\n                    background-position: center;\n                    will-change: opacity;\n                    pointer-events: none;\n                    transform: translateZ(0);\n                    backface-visibility: hidden;\n                }\n            `;
      for (let n = 1; n <= this.totalMasks; n++) {
        const a = ((n - 1) % this.config.cols) + 1,
          r = Math.floor((n - 1) / this.config.cols) + 1,
          o = Math.max(0, (a - 1) * t - i),
          l = Math.min(100, a * t + i),
          c = Math.max(0, (r - 1) * e - i),
          d = Math.min(100, r * e + i);
        s += `[data-unique-id="${this.uniqueId}"] .grid-reveal-mask[data-mask-index="${n - 1}"] { \n                    clip-path: polygon(${o}% ${c}%, ${l}% ${c}%, ${l}% ${d}%, ${o}% ${d}%); \n                }\n`;
      }
      n.textContent = s;
    }
    setupBackground() {
      let t = "";
      const e = this.element.hasAttribute("data-bg-image"),
        i = this.element.getAttribute("data-bg-image");
      if (e && i && "" !== i.trim()) {
        if (this.config.bgImageSelector) {
          const e = this.element.querySelector(this.config.bgImageSelector);
          if (e)
            if ("IMG" === e.tagName && e.src) t = e.src;
            else {
              const i = window.getComputedStyle(e).backgroundImage;
              if (i && "none" !== i) {
                const e = i.match(/url\(['"]?([^'"]+)['"]?\)/);
                e && (t = e[1]);
              }
            }
        }
        if (!t) {
          const e = this.element.querySelector("img");
          e && e.src && (t = e.src);
        }
        if (!t) {
          const e = window.getComputedStyle(this.element).backgroundImage;
          if (e && "none" !== e) {
            const i = e.match(/url\(['"]?([^'"]+)['"]?\)/);
            i && (t = i[1]);
          }
        }
      }
      t &&
        this.masks.forEach((e) => {
          ((e.style.backgroundImage = `url(${t})`),
            (e.style.backgroundSize = "cover"),
            (e.style.backgroundPosition = "center"));
        });
    }
    setupAnimation() {
      gsap.set(this.masks, { opacity: 1 });
    }
    playAnimation() {
      if (this.config.playOnce && this.hasPlayedOnce) return;
      if (this.isRevealed && !this.isAnimating) return;
      const e = t[this.config.animation];
      if (!e)
        return void console.warn(
          `Grid Reveal: Unknown animation pattern "${this.config.animation}"`,
        );
      (this.killAllAnimations(), (this.isAnimating = !0));
      const i = e(this.config.cols, this.config.rows);
      ((this.animationTimeline = gsap.timeline({
        onComplete: () => {
          ((this.isAnimating = !1),
            (this.isRevealed = !0),
            (this.hasPlayedOnce = !0));
        },
      })),
        i.forEach((t, e) => {
          this.masks[t] &&
            (gsap.set(this.masks[t], {
              force3D: !0,
              willChange: "opacity, transform",
            }),
            this.animationTimeline.to(
              this.masks[t],
              {
                opacity: 0,
                scale: 1,
                duration: this.config.duration,
                ease: this.config.ease,
                force3D: !0,
              },
              e * this.config.stagger,
            ));
        }));
    }
    killAllAnimations() {
      (this.animationTimeline &&
        (this.animationTimeline.kill(), (this.animationTimeline = null)),
        this.masks.forEach((t) => {
          gsap.killTweensOf(t);
        }),
        (this.isAnimating = !1));
    }
    reset() {
      (this.killAllAnimations(),
        (this.isRevealed = !1),
        (this.hasPlayedOnce = !1),
        gsap.set(this.masks, { opacity: 1 }));
    }
    setupScrollTrigger() {
      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.element,
        start: this.config.trigger,
        onEnter: () => {
          this.playAnimation();
        },
        onEnterBack: () => {
          (this.config.playOnce && this.hasPlayedOnce) || this.playAnimation();
        },
        once: !1,
      });
    }
    destroy() {
      (this.killAllAnimations(),
        this.scrollTrigger && this.scrollTrigger.kill(),
        this.maskContainer && this.maskContainer.remove());
      const t = document.getElementById(`grid-reveal-styles-${this.uniqueId}`);
      t && t.remove();
    }
    reveal() {
      this.playAnimation();
    }
    resetAnimation() {
      this.reset();
    }
  }
  function n() {
    const t = document.querySelectorAll("[data-grid-reveal]"),
      e = [];
    return (
      t.forEach((t) => {
        if (t.gridRevealInstance) return;
        const n = new i(t);
        ((t.gridRevealInstance = n), e.push(n));
      }),
      e
    );
  }
  if (
    ("loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", n)
      : n(),
    "undefined" != typeof MutationObserver)
  ) {
    new MutationObserver(() => {
      n();
    }).observe(document.body, { childList: !0, subtree: !0 });
  }
  function s() {
    document.querySelectorAll("[data-grid-reveal]").forEach((t) => {
      if (!t.gridRevealInstance) return;
      const n = e(t),
        s = t.gridRevealInstance.config.cols,
        a = t.gridRevealInstance.config.rows;
      if (s !== n.cols || a !== n.rows) {
        (t.gridRevealInstance.destroy(), (t.gridRevealInstance = null));
        const e = new i(t);
        t.gridRevealInstance = e;
      }
    });
  }
  let a;
  (window.addEventListener("resize", function () {
    (clearTimeout(a), (a = setTimeout(s, 250)));
  }),
    (window.GridReveal = i),
    (window.initGridReveal = n),
    (window.updateGridRevealResponsive = s));
})();
