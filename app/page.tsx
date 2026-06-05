"use client";

import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import {
  kitchenRanges,
  materials,
  navLinks,
  stats,
  wardrobeRanges,
} from "@/data/content";

type RangeItem = {
  readonly name: string;
  readonly image: string;
};

function RangeList({
  activeIndex,
  items,
  onChange,
}: {
  activeIndex: number;
  items: readonly RangeItem[];
  onChange: (index: number) => void;
}) {
  return (
    <ul className="range-list">
      {items.map((item, index) => (
        <li
          className={index === activeIndex ? "active" : undefined}
          key={item.name}
          onMouseEnter={() => onChange(index)}
        >
          <button
            type="button"
            onClick={() => onChange(index)}
            onFocus={() => onChange(index)}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function RangeMobileGallery({
  items,
  title,
}: {
  items: readonly RangeItem[];
  title: string;
}) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;

    if (!gallery) {
      return;
    }

    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      scrollLeft: gallery.scrollLeft,
    };
    gallery.classList.add("dragging");
    gallery.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;

    if (!gallery || !dragRef.current.dragging) {
      return;
    }

    event.preventDefault();
    gallery.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;
    dragRef.current.dragging = false;
    gallery?.classList.remove("dragging");

    if (gallery?.hasPointerCapture(event.pointerId)) {
      gallery.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      aria-label={`${title} gallery`}
      className="range-mobile-gallery"
      onPointerDown={startDrag}
      onPointerLeave={endDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      ref={galleryRef}
    >
      {items.map((item) => (
        <article className="range-mobile-card" key={item.name}>
          <img src={item.image} alt="" draggable={false} />
          <span>{item.name}</span>
        </article>
      ))}
    </div>
  );
}

function RangeSection({
  copyFirst = true,
  description,
  id,
  items,
  title,
  titleTone,
}: {
  copyFirst?: boolean;
  description: string;
  id: string;
  items: readonly RangeItem[];
  title: string;
  titleTone?: "red";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];
  const copy = (
    <div className="range-copy">
      <h2 className={titleTone === "red" ? "red-title" : undefined}>{title}</h2>
      <p>{description}</p>
      <RangeList activeIndex={activeIndex} items={items} onChange={setActiveIndex} />
    </div>
  );
  const image = (
    <div className="range-image">
      <img src={activeItem.image} alt="" />
      <a href="#contact">Schedule a Consultation</a>
    </div>
  );

  return (
    <section className="range-section" id={id}>
      {copyFirst ? copy : image}
      <RangeMobileGallery items={items} title={title} />
      <a className="range-mobile-cta" href="#contact">
        Schedule a Consultation
      </a>
      {copyFirst ? image : copy}
    </section>
  );
}

function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) {
        return;
      }

      const maxTravel = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.setProperty("--process-travel", `${maxTravel}px`);

      const start = section.offsetTop;
      const end = section.offsetTop + section.offsetHeight - window.innerHeight;
      const range = Math.max(1, end - start);
      const rawProgress =
        window.scrollY <= start
          ? 0
          : window.scrollY >= end
            ? 1
            : Math.min(1, Math.max(0, (window.scrollY - start) / range));
      const progress = Math.min(1, Math.max(0, (rawProgress - 0.15) / 0.85));

      track.style.transform = `translate3d(${-maxTravel * progress}px, 0, 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="process-scroll-section" ref={sectionRef}>
      <div className="process-sticky">
        <div className="process-track" ref={trackRef}>
          <article className="process-panel process-panel-primary">
            <div className="process-copy">
              <h2>Every Stage Managed To Feel Effortless</h2>
              <p>
                We begin by understanding your space, lifestyle, requirements, and
                design direction. From there, our team develops the layout,
                materials, finishes, and 3D visuals, allowing you to approve the
                concept with clarity before production begins. Once finalized, your
                kitchen or wardrobe is produced, installed, and supported with the
                same attention to detail from start to finish.
              </p>
            </div>
            <img src="/images/footer-kitchen.png" alt="" />
          </article>
          <article className="process-panel process-panel-secondary">
            <img src="/images/footer-detail.png" alt="" />
            <p>
              HASS remains available beyond installation with dedicated after-sales
              support and annual maintenance services.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function MaterialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const carousel = carouselRef.current;
      const track = trackRef.current;

      if (!section || !carousel || !track) {
        return;
      }

      const maxTravel = Math.max(0, track.scrollWidth - carousel.clientWidth);
      section.style.setProperty("--materials-travel", `${maxTravel}px`);

      const start =
        window.innerWidth <= 767
          ? section.offsetTop + Math.min(120, window.innerHeight * 0.14)
          : section.offsetTop + Math.min(160, window.innerHeight * 0.2);
      const end = section.offsetTop + section.offsetHeight - window.innerHeight;
      const range = Math.max(1, end - start);
      const progress =
        window.scrollY <= start
          ? 0
          : Math.min(1, Math.max(0, (window.scrollY - start) / range));

      track.style.transform = `translate3d(${-maxTravel * progress}px, 0, 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="materials-scroll-section" ref={sectionRef}>
      <div className="materials-sticky">
        <div className="materials-inner">
          <h2>Materials &amp; Finishes</h2>
          <div className="materials-carousel" aria-label="Materials carousel" ref={carouselRef}>
            <div className="materials-track" ref={trackRef}>
              {materials.map((material) => (
                <article className="material-card" key={material.title}>
                  <img src={material.image} alt="" />
                  <h3>{material.title}</h3>
                  <p>{material.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsultationForm() {
  return (
    <form className="consultation-form">
      <h2>Book a consultation</h2>
      <input aria-label="Full name" placeholder="Full name" />
      <input aria-label="Phone number" placeholder="Phone number" />
      <input aria-label="Email address" placeholder="Email address" type="email" />
      <div className="form-row">
        <button className="field-button" type="button">
          Select a date
          <img alt="" src="/icons/calendar.svg" />
        </button>
        <button className="field-button" type="button">
          Select a time slot
          <img alt="" src="/icons/clock.svg" />
        </button>
      </div>
      <textarea aria-label="Message" placeholder="Message" />
      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <main className="site">
      <div className="hero-shell">
        <section className="hero">
          <div className="hero-image" />
          <header className="header">
            <a className="logo-link" href="#" aria-label="HASS Home">
              <img src="/images/hass-logo.svg" alt="HASS Home" />
            </a>
            <nav aria-label="Primary navigation">
              {navLinks.map((link) => (
                <a href={`#${link.toLowerCase()}`} key={link}>
                  {link}
                </a>
              ))}
            </nav>
            <a className="header-cta" href="#contact">
              Book a Consultation
            </a>
          </header>
          <h1>Premium kitchens and wardrobes, made in Qatar to European standards.</h1>
        </section>

        <div className="announcement">
          A complete HASS digital experience is coming soon. Until then, our team is
          available for consultations and project enquiries.
        </div>
      </div>

      <section className="intro" id="about">
        <img className="intro-image" src="/images/about-kitchen.png" alt="" />
        <p>
          Premium kitchens and wardrobes manufactured locally in{" "}
          <strong>Qatar</strong> to <strong>European quality</strong> standards,
          using carefully selected <strong>German materials</strong>, advanced
          production technology, and precise detailing to deliver spaces that feel
          elegant, functional, and built to last.
        </p>
      </section>

      <section className="stats-section" id="quality">
        <img src="/images/stats-kitchen.png" alt="" />
        <div className="stats-list">
          {stats.map(([number, label]) => (
            <div className="stat" key={number}>
              <span>{number}</span>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <RangeSection
        description="Collection of premium and modern styled kitchens"
        id="kitchens"
        items={kitchenRanges}
        title="Kitchen Ranges"
        titleTone="red"
      />

      <RangeSection
        copyFirst={false}
        description="Elegant wardrobe concepts planned around personal space"
        id="wardrobes"
        items={wardrobeRanges}
        title="Wardrobe Ranges"
      />

      <MaterialsSection />

      <ProcessSection />

      <section className="contact-section" id="contact">
        <div className="contact-info">
          <h2>Connect with the Hass team</h2>
          <div className="contact-details">
            <p>
              C-Ring Road, Building No: 223,
              <br />
              Al Hilal, Doha, Qatar
            </p>
            <p>
              +974 4040 3535
              <br />
              <a href="mailto:info@hasshome.com">info@hasshome.com</a>
            </p>
            <p>
              Mon - Fri
              <br />
              9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
        <ConsultationForm />
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h2>Subscribe to our latest updates!</h2>
            <form className="newsletter">
              <input aria-label="Email address" placeholder="Email Address" type="email" />
              <button type="submit">Submit</button>
            </form>
          </div>
          <p>© 2026 Hass Home. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
