/* CHIVONZ — main.js
   Global behaviors: nav glass, mobile menu, page transitions,
   reveal-on-scroll, magnetic buttons, cursor glow. Progressive: safe without JS.
   Content is visible by default; if any code path fails, the page still shows.
*/
(function () {
    "use strict";

    var prefersReducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var finePointer = !!(window.matchMedia && window.matchMedia("(pointer: fine)").matches);

    /* Gate the entrance animation. js-transition hides the shell; body.page-enter
       reveals it. If anything below throws, forceReveal() still shows content. */
    document.documentElement.classList.add("js-transition");

    function revealPage() {
        if (prefersReducedMotion) {
            document.body.classList.add("page-enter");
            return;
        }
        requestAnimationFrame(function () {
            document.body.classList.add("page-enter");
        });
    }

    function forceReveal() {
        if (!document.body.classList.contains("page-enter")) {
            document.body.classList.add("page-enter");
        }
    }
    window.addEventListener("error", function () {
        setTimeout(forceReveal, 60);
    });

    function safe(fn) {
        try {
            fn();
        } catch (err) {
            if (window.console) console.warn("[CHIVONZ]", err);
            forceReveal();
        }
    }

    /* ---------- Footer year ---------- */
    function initFooterYear() {
        var yearEl = document.getElementById("footerYear");
        if (yearEl) {
            yearEl.textContent = String(new Date().getFullYear());
        }
    }

    /* ---------- Page transitions ---------- */
    function initTransitions() {
        var overlay = document.getElementById("pageTransition");
        if (!overlay) return;
        document.addEventListener("click", function (e) {
            var link = e.target.closest ? e.target.closest("a[href]") : null;
            if (!link) return;
            var href = link.getAttribute("href");
            if (!href) return;
            if (href.charAt(0) === "#") return;
            if (href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("javascript:") === 0) return;
            if (link.origin !== window.location.origin) return;
            if (link.target || prefersReducedMotion || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
            e.preventDefault();
            overlay.classList.add("is-leaving");
            setTimeout(function () {
                window.location.href = href;
            }, 420);
        });
    }

    /* ---------- Header glass on scroll ---------- */
    function initHeaderScroll() {
        var header = document.getElementById("siteHeader");
        if (!header) return;
        function syncHeader() {
            header.classList.toggle("scrolled", window.scrollY > 10);
        }
        syncHeader();
        window.addEventListener("scroll", syncHeader, { passive: true });
    }

    /* ---------- Fullscreen mobile menu ---------- */
    function initMenu() {
        var burger = document.getElementById("navBurger");
        var menu = document.getElementById("mobileMenu");
        if (!burger || !menu) return;
        function setMenu(open) {
            burger.classList.toggle("open", open);
            menu.classList.toggle("open", open);
            burger.setAttribute("aria-expanded", open ? "true" : "false");
            menu.setAttribute("aria-hidden", open ? "false" : "true");
            document.body.style.overflow = open ? "hidden" : "";
        }
        burger.addEventListener("click", function () {
            setMenu(!menu.classList.contains("open"));
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setMenu(false);
        });
    }

    /* ---------- Reveal on scroll ---------- */
    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        if (!items.length) return;
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            for (var i = 0; i < items.length; i++) items[i].classList.add("in");
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
        for (var j = 0; j < items.length; j++) io.observe(items[j]);
    }

    /* ---------- Magnetic buttons ---------- */
    function initMagnetic() {
        if (!finePointer || prefersReducedMotion) return;
        var btns = document.querySelectorAll(".btn-magnetic");
        for (var i = 0; i < btns.length; i++) (function (btn) {
            var bound = false;
            btn.addEventListener("mousemove", function (e) {
                if (!bound) {
                    btn.style.transition = "transform 0.18s cubic-bezier(.22,1,.36,1)";
                    bound = true;
                }
                var r = btn.getBoundingClientRect();
                var dx = e.clientX - (r.left + r.width / 2);
                var dy = e.clientY - (r.top + r.height / 2);
                btn.style.transform = "translate(" + dx * 0.18 + "px, " + dy * 0.32 + "px)";
            });
            btn.addEventListener("mouseleave", function () {
                bound = false;
                btn.style.transition = "transform 0.4s cubic-bezier(.22,1,.36,1)";
                btn.style.transform = "";
            });
        })(btns[i]);
    }

    /* ---------- Cursor glow ---------- */
    function initCursorGlow() {
        if (!finePointer) return;
        var glow = document.createElement("div");
        glow.className = "cursor-glow";
        glow.setAttribute("aria-hidden", "true");
        document.body.appendChild(glow);
        document.body.classList.add("has-glow");
        glow.style.setProperty("--mx", "-200px");
        glow.style.setProperty("--my", "-200px");
        var x = -200, y = -200, tx = -200, ty = -200, raf = null;
        window.addEventListener("mousemove", function (e) {
            tx = e.clientX;
            ty = e.clientY;
            if (!raf) {
                raf = requestAnimationFrame(function step() {
                    x += (tx - x) * 0.16;
                    y += (ty - y) * 0.16;
                    glow.style.setProperty("--mx", x + "px");
                    glow.style.setProperty("--my", y + "px");
                    raf = requestAnimationFrame(step);
                });
            }
        });
    }

    /* Kick off: reveal immediately, then wire features (each guarded). */
    revealPage();
    safe(initFooterYear);
    safe(initTransitions);
    safe(initHeaderScroll);
    safe(initMenu);
    safe(initReveal);
    safe(initMagnetic);
    safe(initCursorGlow);
})();