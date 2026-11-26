// 理念ページ：スクロールでカードなどをふわっと表示（トップページと同じ動き）
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("js-anim");
  const targets = document.querySelectorAll(".sec-head, .card, .kotoba li, .sengen, .outline, .join");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -40px 0px", threshold: 0.1 });
  targets.forEach(el => {
    // 同じ列に並ぶカードは少しずつ遅れて出てくる
    const sibs = el.parentElement ? Array.from(el.parentElement.children) : [];
    const i = sibs.indexOf(el);
    if (el.classList.contains("card") || el.matches(".kotoba li")) el.style.setProperty("--d", (i % 4) * 0.08 + "s");
    el.classList.add("reveal");
    io.observe(el);
  });
})();
