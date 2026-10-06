/* ==========================================================================
   CHIVONZ — projects.js
   Proje sayfası kategori filtreleri (statik veri, veri-cat nitelikleri)
   ========================================================================== */
(function () {
    "use strict";

    function ready(fn) {
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
        else fn();
    }

    ready(function () {
        var filters = document.getElementById("projectFilters");
        var grid = document.getElementById("projectsGrid");
        var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll("[data-cat]")) : [];
        var empty = document.getElementById("projectsEmpty");
        if (!filters || !grid || !cards.length) return;

        function apply(cat) {
            var shown = 0;
            cards.forEach(function (card) {
                var show = cat === "ALL" || card.getAttribute("data-cat") === cat;
                card.classList.toggle("is-hidden", !show);
                if (show) shown++;
            });
            if (empty) empty.style.display = shown ? "none" : "block";
        }

        filters.addEventListener("click", function (e) {
            var pill = e.target.closest("[data-filter]");
            if (!pill) return;
            filters.querySelectorAll(".filter-pill").forEach(function (p) {
                p.classList.toggle("is-active", p === pill);
                p.setAttribute("aria-pressed", p === pill ? "true" : "false");
            });
            apply(pill.getAttribute("data-filter"));
        });

        apply("ALL");
    });
})();