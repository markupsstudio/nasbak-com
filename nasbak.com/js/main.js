/**site behaviourr */

import { estateListings } from "./data.js";

/*   Estate & unit listings builds the "Our Estates" section and the
   contact form's "I'm interested in" dropdown from js/data.js. i just add,
   edit, or remove an estate or a unit, in that file — this code never
   needs to change!!!.  */

function unitInterestLabel(estate, unit) {
  return `${estate.name} — ${unit.type}, ${unit.sqm} (${unit.priceDisplay})`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderEstateListings() {
  const container = document.getElementById("estates-listings");
  if (!container) return;

  container.innerHTML = estateListings
    .map((estate) => {
      const unitCards = estate.units
        .map((unit) => {
          const label = unitInterestLabel(estate, unit);
          const typeLine = unit.beds ? `${unit.beds} ${unit.type}` : unit.type;
          return `
            <article class="unit-card">
              <div class="unit-card__image-wrap">
                <img src="${unit.image}" alt="${unit.imageAlt}" class="unit-card__image" loading="lazy" width="400" height="300">
                <span class="unit-card__badge">${unit.sqm}</span>
              </div>
              <div class="unit-card__body">
                <p class="unit-card__type">${typeLine}</p>
                <p class="unit-card__price">${unit.priceDisplay}</p>
                <a href="#contact" class="unit-card__cta" data-interest="${label}">Enquire about this unit</a>
              </div>
            </article>
          `;
        })
        .join("");

      return `
        <div class="estate-group reveal" id="estate-${slugify(estate.name)}">
          <div class="estate-group__header">
            <div>
              <h3 class="estate-group__name">${estate.name}</h3>
              <p class="estate-group__location">${estate.location}</p>
            </div>
            <span class="chip"><span class="chip__dot"></span>${estate.titleType}</span>
          </div>
          <div class="unit-grid">${unitCards}</div>
        </div>
      `;
    })
    .join("");
}

function renderInterestOptions() {
  const select = document.getElementById("interest");
  if (!select) return;

  const optgroupsHtml = estateListings
    .map((estate) => {
      const options = estate.units
        .map((unit) => {
          const label = unitInterestLabel(estate, unit);
          const optionText = unit.beds
            ? `${unit.beds} ${unit.type}, ${unit.sqm} (${unit.priceDisplay})`
            : `${unit.type}, ${unit.sqm} (${unit.priceDisplay})`;
          return `<option value="${label}">${optionText}</option>`;
        })
        .join("");
      return `<optgroup label="${estate.name}">${options}</optgroup>`;
    })
    .join("");

  select.insertAdjacentHTML("beforeend", optgroupsHtml);
}

/* --------------------------------------------------------------------------
   Mobile navigation toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu whenever a nav link 
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* --------------------------------------------------------------------------
   Header elevation on scroll
   -------------------------------------------------------------------------- */
function initHeaderScrollState() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const updateState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", updateState, { passive: true });
  updateState();
}

/* --------------------------------------------------------------------------
   Active nav link while scrolling (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initActiveNavLinks() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");
  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const headerHeight =
    parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 84;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      // Only same-page anchor links (href="#...") are scroll-tracked. Links
      // that point to another page (e.g. "about.html") are left alone, so a
      // page can set its own nav link active in the HTML without this
      // observer clearing it.
      if (href.startsWith("#")) {
        link.classList.toggle("is-active", href === `#${id}`);
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: `-${headerHeight + 10}px 0px -55% 0px`, threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

function initPropertyEnquiryLinks() {
  const interestField = document.getElementById("interest");
  if (!interestField) return;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-interest]");
    if (trigger) {
      interestField.value = trigger.dataset.interest;
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const validators = {
    name: (value) => value.trim().length > 1,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    phone: (value) => value.trim().length >= 7,
    message: (value) => value.trim().length > 4,
  };

  const setFieldError = (fieldName, hasError) => {
    const input = form.elements[fieldName];
    const group = input?.closest('.form-group');
    group?.classList.toggle('has-error', hasError);
  };

  Object.keys(validators).forEach((fieldName) => {
    form.elements[fieldName]?.addEventListener('input', () => setFieldError(fieldName, false));
  });

  const showStatus = (message, type) => {
    status.textContent = message;
    status.className = `form-status is-visible is-${type}`;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let isValid = true;
    Object.entries(validators).forEach(([fieldName, validate]) => {
      const input = form.elements[fieldName];
      const fieldIsValid = input ? validate(input.value) : true;
      setFieldError(fieldName, !fieldIsValid);
      if (!fieldIsValid) isValid = false;
    });

    if (!isValid) {
      showStatus('Please check the highlighted fields and try again.', 'error');
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      interest: form.elements.interest.value || 'General enquiry',
      message: form.elements.message.value.trim(),
    };

    const subjectText = `Website enquiry — ${data.interest}`;
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nInterest: ${data.interest}\n\nMessage:\n${data.message}`
    );

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn?.textContent;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '7755488d-0182-463c-bd0c-d3dbb02a925f',
          subject: subjectText,
          from_name: data.name,
          ...data,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Request failed');

      showStatus(
        'Thank you — your enquiry has been sent. We typically respond within one business day.',
        'success'
      );
      form.reset();
    } catch (error) {
      showStatus(
        'We could not send that automatically. Your email app should open with your message ready to send — or call us using the details on the left.',
        'error'
      );
      window.location.href = `mailto:nasbakgroup@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}
/* --------------------------------------------------------------------------
   Footer year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   Scroll reveal — fades/slides .reveal elements in as they enter the
   viewport.--- */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!elements.length || prefersReducedMotion || !("IntersectionObserver" in window)) return;

  // Elements that share a parent (e.g. cards in the same grid) get a
  // slightly longer delay than the last, so grids cascade in rather than
  // popping in all at once.
  const siblingGroups = new Map();
  elements.forEach((el) => {
    const parent = el.parentElement;
    if (!siblingGroups.has(parent)) siblingGroups.set(parent, []);
    siblingGroups.get(parent).push(el);
  });
  siblingGroups.forEach((group) => {
    group.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    });
  });

  elements.forEach((el) => el.classList.add("reveal--pending"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal--pending");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Stat counters — animates each .stat__number from 0 up to its
   data-count-to value once it scrolls into view. The markup already shows
   the correct final value (e.g. "100+"), so if JS never runs, or
   IntersectionObserver isn't supported, or the visitor prefers reduced
   motion, that correct value is simply what visitors see — the count-up
   is only ever added on top of it, never required to show the right
   number.
   -------------------------------------------------------------------------- */
function animateStatNumber(el) {
  const target = parseFloat(el.dataset.countTo);
  if (Number.isNaN(target)) return;

  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function initStatCounters() {
  const counters = document.querySelectorAll(".stat__number[data-count-to]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!counters.length || prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStatNumber(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => observer.observe(el));
}

function initTestimonialSlider() {
  const slider = document.getElementById("testimonial-slider");
  if (!slider) return;

  const track = slider.querySelector(".testimonial-slider__track");
  const slides = slider.querySelectorAll(".testimonial-slide");
  const dots = slider.querySelectorAll(".testimonial-slider__dot");
  if (!track || slides.length < 2) return;

  const DISPLAY_MS = 4000;
  const SWIPE_THRESHOLD = 40;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = 0;

  function goTo(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  let touchStartX = null;
  track.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const diff = touchStartX - event.changedTouches[0].clientX;
    if (diff > SWIPE_THRESHOLD) goTo(index + 1);
    else if (diff < -SWIPE_THRESHOLD) goTo(index - 1);
    touchStartX = null;
  });

  goTo(0);

  if (!prefersReducedMotion) {
    setInterval(() => goTo(index + 1), DISPLAY_MS);
  }
}

/* --------------------------------------------------------------------------
   Init
   -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
  renderEstateListings();
  renderInterestOptions();
  initMobileNav();
  initHeaderScrollState();
  initActiveNavLinks();
  initPropertyEnquiryLinks();
  initContactForm();
  initFooterYear();
  initScrollReveal();
  initStatCounters();
  initTestimonialSlider();
});
