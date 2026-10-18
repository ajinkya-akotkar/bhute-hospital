/* Bhute Hospital — shared behaviour. Keep uncompressed size well under 20KB. */

/* Central configuration for unverified operational information.
   Empty values hide the related actions. Do not insert fake values. */
const hospital = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "Akola, Maharashtra, India",
  mapUrl: "",
  timings: "",
  emergencyPhone: ""
};

(function () {
  "use strict";

  var doc = document;

  /* ---- Mobile navigation ---- */
  var navToggle = doc.getElementById("nav-toggle");
  var mobileNav = doc.getElementById("mobile-nav");

  function openNav() {
    mobileNav.classList.add("is-open");
    doc.body.classList.add("nav-locked");
    navToggle.setAttribute("aria-expanded", "true");
    var first = mobileNav.querySelector("a");
    if (first) first.focus();
  }

  function closeNav(returnFocus) {
    mobileNav.classList.remove("is-open");
    doc.body.classList.remove("nav-locked");
    navToggle.setAttribute("aria-expanded", "false");
    if (returnFocus) navToggle.focus();
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      if (mobileNav.classList.contains("is-open")) {
        closeNav(false);
      } else {
        openNav();
      }
    });

    mobileNav.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav(true);
    });

    var closeBtn = mobileNav.querySelector(".mobile-nav__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeNav(true);
      });
    }
  }

  /* ---- Accordion (smooth grid-rows transition) ---- */
  var buttons = doc.querySelectorAll(".accordion__btn");
  for (var i = 0; i < buttons.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        var panel = doc.getElementById(btn.getAttribute("aria-controls"));
        if (panel) {
          if (expanded) {
            panel.classList.remove("is-open");
          } else {
            panel.classList.add("is-open");
          }
        }
      });
    })(buttons[i]);
  }

  /* ---- Reveal on scroll ---- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = doc.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    for (var r = 0; r < revealItems.length; r++) {
      revealItems[r].classList.add("is-visible");
    }
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        for (var e = 0; e < entries.length; e++) {
          if (entries[e].isIntersecting) {
            entries[e].target.classList.add("is-visible");
            observer.unobserve(entries[e].target);
          }
        }
      },
      { threshold: 0.12 }
    );
    for (var v = 0; v < revealItems.length; v++) {
      observer.observe(revealItems[v]);
    }
  }

  /* ---- Hide actions with unverified values ---- */
  function hide(selector) {
    var nodes = doc.querySelectorAll(selector);
    for (var n = 0; n < nodes.length; n++) {
      var row = nodes[n].closest("li, .field, .contact-item");
      (row || nodes[n]).style.display = "none";
    }
  }

  if (!hospital.phone) hide("[data-action='call']");
  if (!hospital.whatsapp) hide("[data-action='whatsapp']");
  if (!hospital.email) hide("[data-action='email']");
  if (!hospital.mapUrl) hide("[data-action='map']");
  if (!hospital.timings) hide("[data-action='timings']");
  if (!hospital.emergencyPhone) hide("[data-action='emergency']");

  var anyMobileAction = hospital.phone || hospital.whatsapp;
  var actionBar = doc.querySelector(".action-bar");
  if (actionBar && anyMobileAction) {
    doc.body.classList.add("has-action-bar");
    actionBar.classList.add("has-actions");
  }

  /* ---- Missing-image placeholders ----
     Until authentic photography is supplied, failed image loads are
     converted into styled placeholders instead of broken icons. */
  function handleMissingImages() {
    var imgs = doc.querySelectorAll("img");
    for (var m = 0; m < imgs.length; m++) {
      (function (img) {
        function markMissing() {
          var parent = img.closest(".portrait, .media-card__image, .gallery__item");
          if (parent) {
            parent.classList.add("is-missing");
          }
          img.style.display = "none";
        }
        if (img.complete && img.naturalWidth === 0) {
          markMissing();
        } else {
          img.addEventListener("error", markMissing);
        }
      })(imgs[m]);
    }

    /* If every gallery photo is missing, replace the grid with a notice */
    var gallery = doc.querySelector(".gallery");
    if (gallery) {
      var items = gallery.querySelectorAll(".gallery__item");
      var missing = 0;
      for (var g = 0; g < items.length; g++) {
        if (items[g].classList.contains("is-missing")) missing++;
      }
      if (items.length > 0 && missing === items.length) {
        gallery.style.display = "none";
        var empty = doc.querySelector(".gallery__empty");
        if (empty) empty.removeAttribute("hidden");
      }
    }
  }

  if (doc.readyState === "complete") {
    handleMissingImages();
  } else {
    window.addEventListener("load", handleMissingImages);
  }

  /* ---- Appointment form ---- */
  var form = doc.getElementById("appointment-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var invalid = [];
      var fields = form.querySelectorAll("[required]");
      for (var f = 0; f < fields.length; f++) {
        var field = fields[f];
        var wrap = field.closest(".field");
        var valid = field.type === "checkbox" ? field.checked : field.value.trim() !== "";
        if (wrap) wrap.classList.toggle("is-invalid", !valid);
        if (!valid) invalid.push(field);
      }
      if (invalid.length) {
        invalid[0].focus();
        return;
      }
      /* No backend endpoint is approved yet. If a verified WhatsApp number
         exists in config, submit builds a prefilled WhatsApp message so the
         request still reaches the hospital. Otherwise show a clear
         alternative instead of pretending the request was sent. */
      if (hospital.whatsapp) {
        var name = form.elements.name.value.trim();
        var speciality = form.elements.speciality;
        var specialityText = speciality.options[speciality.selectedIndex].text;
        var date = form.elements.date.value;
        var message = "Hello Bhute Hospital, I would like to request an appointment."
          + " Name: " + name
          + ", Speciality: " + specialityText
          + ", Preferred date: " + date + ".";
        window.open("https://wa.me/" + hospital.whatsapp + "?text=" + encodeURIComponent(message), "_blank");
        return;
      }
      var fallback = doc.getElementById("form-fallback");
      if (fallback) fallback.removeAttribute("hidden");
      form.querySelector("button[type='submit']").disabled = true;
    });
  }
})();