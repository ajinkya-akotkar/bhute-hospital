/* Bhute Hospital — gallery showcase, About grid, filters and lightbox.
   Photo data comes from window.BHUTE_GALLERY (site/data/gallery.js).
   No autoplay: visitors control all navigation. */
(function () {
  "use strict";

  var doc = document;

  var data = (window.BHUTE_GALLERY || []).slice().sort(function (a, b) {
    return (a.order || 999) - (b.order || 999);
  });
  if (!data.length) return;

  var CATEGORIES = ["All", "Conferences", "Clinical Practice", "Hospital"];

  function makeImg(entry, lazy) {
    var im = doc.createElement("img");
    im.src = entry.src;
    im.alt = entry.alt || entry.caption || "";
    if (lazy) im.loading = "lazy";
    im.decoding = "async";
    return im;
  }

  /* ---------------- Lightbox (shared) ---------------- */
  var lightbox = (function () {
    var overlay = doc.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Photo viewer");
    overlay.hidden = true;

    var stage = doc.createElement("div");
    stage.className = "lightbox__stage";
    var big = doc.createElement("img");
    big.className = "lightbox__img";
    big.alt = "";
    stage.appendChild(big);

    function btn(label, path) {
      var b = doc.createElement("button");
      b.type = "button";
      b.className = "lightbox__btn";
      b.setAttribute("aria-label", label);
      b.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"/></svg>';
      return b;
    }
    var prev = btn("Previous photo", "M15 5l-7 7 7 7");
    prev.classList.add("lightbox__prev");
    var next = btn("Next photo", "M9 5l7 7-7 7");
    next.classList.add("lightbox__next");
    var close = btn("Close photo viewer", "M6 6l12 12M18 6L6 18");
    close.classList.add("lightbox__close");

    var capBar = doc.createElement("div");
    capBar.className = "lightbox__caption";
    var cat = doc.createElement("span");
    cat.className = "chip chip--onDark";
    var cap = doc.createElement("span");
    cap.className = "lightbox__captionText";
    var count = doc.createElement("span");
    count.className = "lightbox__count";
    capBar.appendChild(cat);
    capBar.appendChild(cap);
    capBar.appendChild(count);

    overlay.appendChild(stage);
    overlay.appendChild(prev);
    overlay.appendChild(next);
    overlay.appendChild(close);
    overlay.appendChild(capBar);
    doc.body.appendChild(overlay);

    var items = [];
    var index = 0;
    var lastFocus = null;

    function render() {
      var it = items[index];
      big.src = it.src;
      big.alt = it.alt || it.caption || "";
      cat.textContent = it.category || "";
      cap.textContent = it.caption || "";
      count.textContent = index + 1 + " of " + items.length;
    }

    function go(step) {
      index = (index + step + items.length) % items.length;
      render();
    }

    function open(list, start, fromEl) {
      items = list;
      index = start || 0;
      lastFocus = fromEl || null;
      overlay.hidden = false;
      doc.body.classList.add("nav-locked");
      render();
      close.focus();
    }

    function closeBox() {
      overlay.hidden = true;
      doc.body.classList.remove("nav-locked");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    close.addEventListener("click", closeBox);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target === stage) closeBox();
    });

    doc.addEventListener("keydown", function (e) {
      if (overlay.hidden) return;
      if (e.key === "Escape") closeBox();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    });

    var touchX = 0;
    overlay.addEventListener(
      "touchstart",
      function (e) { touchX = e.touches[0].clientX; },
      { passive: true }
    );
    overlay.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    });

    return { open: open };
  })();

  function openable(el, list, i) {
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", "Open photo: " + (list[i].caption || ""));
    function activate() { lightbox.open(list, i, el); }
    el.addEventListener("click", activate);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  }

  /* Shared masonry cell: full photograph at its natural aspect ratio,
     caption and category below the image (never covering the photo). */
  function buildCell(entry, list, i) {
    var cell = doc.createElement("figure");
    cell.className = "gallery-cell";
    cell.appendChild(makeImg(entry, true));
    var bar = doc.createElement("figcaption");
    var chip = doc.createElement("span");
    chip.className = "chip chip--onLight";
    chip.textContent = entry.category || "";
    var text = doc.createElement("span");
    text.textContent = entry.caption || "";
    bar.appendChild(chip);
    bar.appendChild(text);
    cell.appendChild(bar);
    openable(cell, list, i);
    return cell;
  }

  /* ---------------- Homepage carousel (one photo at a time) ---------------- */
  var showcase = doc.getElementById("gallery-showcase");
  if (showcase) {
    var current = 0;
    for (var s = 0; s < data.length; s++) {
      if (data[s].featured) { current = s; break; }
    }

    /* One large photo, landscape frame, object-fit: contain so portrait
       photographs are never cropped or stretched. */
    var frame = doc.createElement("figure");
    frame.className = "showcase__frame";
    var bigImg = doc.createElement("img");
    bigImg.decoding = "async";
    frame.appendChild(bigImg);

    var meta = doc.createElement("div");
    meta.className = "showcase__meta";
    var metaChip = doc.createElement("span");
    metaChip.className = "chip chip--onLight";
    var metaCaption = doc.createElement("span");
    metaCaption.className = "showcase__caption";
    var counter = doc.createElement("span");
    counter.className = "showcase__counter";
    counter.setAttribute("aria-live", "polite");
    meta.appendChild(metaChip);
    meta.appendChild(metaCaption);
    meta.appendChild(counter);

    var controls = doc.createElement("div");
    controls.className = "showcase__controls";

    function navBtn(label, path) {
      var b = doc.createElement("button");
      b.type = "button";
      b.className = "showcase__nav";
      b.setAttribute("aria-label", label);
      b.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"/></svg>';
      return b;
    }
    var prevBtn = navBtn("Previous photo", "M15 5l-7 7 7 7");
    var nextBtn = navBtn("Next photo", "M9 5l7 7-7 7");
    var viewAll = doc.createElement("a");
    viewAll.className = "text-link";
    viewAll.href = "./about.html#gallery";
    viewAll.textContent = "View All Photos";
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    controls.appendChild(viewAll);

    function render() {
      var entry = data[current];
      bigImg.src = entry.src;
      bigImg.alt = entry.alt || entry.caption || "";
      metaChip.textContent = entry.category || "";
      metaCaption.textContent = entry.caption || "";
      counter.textContent = current + 1 + " / " + data.length;
      frame.setAttribute(
        "aria-label",
        "Photo " + (current + 1) + " of " + data.length + ": " + (entry.caption || "")
      );
    }

    function go(step) {
      current = (current + step + data.length) % data.length;
      render();
    }

    prevBtn.addEventListener("click", function () { go(-1); });
    nextBtn.addEventListener("click", function () { go(1); });

    /* Clicking the photo opens the lightbox at the current photo */
    frame.setAttribute("role", "button");
    frame.setAttribute("tabindex", "0");
    frame.addEventListener("click", function () {
      lightbox.open(data, current, frame);
    });
    frame.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        lightbox.open(data, current, frame);
      }
    });

    /* Keyboard: arrows browse the carousel while it is focused */
    frame.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });

    /* Swipe on touch devices */
    var touchX = 0;
    frame.addEventListener(
      "touchstart",
      function (e) { touchX = e.touches[0].clientX; },
      { passive: true }
    );
    frame.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    });

    showcase.appendChild(frame);
    showcase.appendChild(meta);
    showcase.appendChild(controls);
    render();
  }

  /* ---------------- About page grid + filters ---------------- */
  var grid = doc.getElementById("gallery-grid");
  if (grid) {
    var filterWrap = doc.getElementById("gallery-filters");
    var active = "All";

    function visible() {
      if (active === "All") return data;
      return data.filter(function (d) { return d.category === active; });
    }

    function renderGrid() {
      var list = visible();
      grid.innerHTML = "";
      if (!list.length) {
        var empty = doc.createElement("p");
        empty.className = "gallery-grid__empty";
        empty.textContent =
          "No photographs in this category yet. They will appear as soon as they are available.";
        grid.appendChild(empty);
        return;
      }
      for (var i = 0; i < list.length; i++) {
        grid.appendChild(buildCell(list[i], list, i));
      }
    }

    if (filterWrap) {
      for (var c = 0; c < CATEGORIES.length; c++) {
        (function (catName) {
          var b = doc.createElement("button");
          b.type = "button";
          b.className = "gallery-filter";
          b.textContent = catName;
          b.setAttribute("aria-pressed", catName === active ? "true" : "false");
          b.addEventListener("click", function () {
            active = catName;
            var buttons = filterWrap.querySelectorAll(".gallery-filter");
            for (var k = 0; k < buttons.length; k++) {
              buttons[k].setAttribute(
                "aria-pressed",
                buttons[k] === b ? "true" : "false"
              );
            }
            renderGrid();
          });
          filterWrap.appendChild(b);
        })(CATEGORIES[c]);
      }
    }

    renderGrid();
  }
})();
