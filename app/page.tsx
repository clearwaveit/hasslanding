"use client";

import type { FormEvent, PointerEvent, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Locale, type PageContent, pages } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

type RangeItem = {
  readonly name: string;
  readonly image: string;
};

type MaterialItem = PageContent["materials"][number];
type ModalKey = keyof PageContent["modals"];

function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) {
    return { amount: 0, suffix: "" };
  }

  return {
    amount: Number(match[1]),
    suffix: match[2] || "",
  };
}

function StatNumber({ value }: { value: string }) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const { amount, suffix } = parseStatValue(value);

  useEffect(() => {
    const span = spanRef.current;

    if (!span) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      span.textContent = value;
      return;
    }

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: amount,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        span.textContent = `${Math.round(counter.value)}${suffix}`;
      },
      scrollTrigger: {
        trigger: span,
        start: "top 82%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [amount, suffix, value]);

  return (
    <span aria-label={value} ref={spanRef}>
      0{suffix}
    </span>
  );
}

function useHorizontalDrag<T extends HTMLElement>(scrollRef: RefObject<T | null>) {
  const dragRef = useRef({
    active: false,
    axis: "" as "" | "x" | "y",
    startX: 0,
    startY: 0,
    scrollLeft: 0,
  });

  const stopDrag = (event: PointerEvent<T>) => {
    const element = scrollRef.current;
    dragRef.current.active = false;
    dragRef.current.axis = "";
    element?.classList.remove("dragging");

    if (element?.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
  };

  return {
    onPointerDown: (event: PointerEvent<T>) => {
      const element = scrollRef.current;

      if (!element) {
        return;
      }

      dragRef.current = {
        active: true,
        axis: "",
        startX: event.clientX,
        startY: event.clientY,
        scrollLeft: element.scrollLeft,
      };

      element.classList.add("dragging");
      element.setPointerCapture(event.pointerId);
    },
    onPointerLeave: stopDrag,
    onPointerMove: (event: PointerEvent<T>) => {
      const element = scrollRef.current;
      const drag = dragRef.current;

      if (!element || !drag.active) {
        return;
      }

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;

      if (!drag.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 6) {
        drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";

        if (drag.axis === "y") {
          stopDrag(event);
          return;
        }
      }

      if (drag.axis === "x") {
        event.preventDefault();
        element.scrollLeft = drag.scrollLeft - deltaX;
      }
    },
    onPointerUp: stopDrag,
  };
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <rect height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" width="15" x="2.5" y="4.5" />
      <path d="M2.5 8h15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 2.5v3M13 2.5v3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 10V5.5M10 10h3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  );
}

function Icon({ name }: { name: string }) {
  if (name.toLowerCase().includes("whatsapp")) {
    return (
      <svg aria-hidden="true" className="whatsapp-icon" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        />
      </svg>
    );
  }

  if (name.toLowerCase().includes("facebook")) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M14 8.4V6.8c0-.7.2-1.1 1.1-1.1h1.6V3.1c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v1.3H7.5v3h2.7V21H14v-9.6h2.7l.4-3H14Z" />
      </svg>
    );
  }

  if (name.toLowerCase().includes("linked")) {
    return (
      <svg aria-hidden="true" className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
        <text
          dominantBaseline="central"
          fill="currentColor"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="22"
          fontWeight="700"
          letterSpacing="-1.1"
          textAnchor="middle"
          x="12"
          y="12.5"
        >
          in
        </text>
      </svg>
    );
  }

  if (name.toLowerCase().includes("instagram")) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.4-2.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

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
  const dragHandlers = useHorizontalDrag(galleryRef);

  return (
    <div
      aria-label={`${title} gallery`}
      className="range-mobile-gallery"
      ref={galleryRef}
      {...dragHandlers}
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
  cta,
  copyFirst = true,
  description,
  id,
  items,
  title,
  titleTone,
}: {
  cta: string;
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
      <a href="#contact">{cta}</a>
    </div>
  );

  return (
    <section className="range-section" id={id}>
      {copyFirst ? copy : image}
      <RangeMobileGallery items={items} title={title} />
      <a className="range-mobile-cta" href="#contact">
        {cta}
      </a>
      {copyFirst ? image : copy}
    </section>
  );
}

function JourneySection({ content }: { content: PageContent["journey"] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dragHandlers = useHorizontalDrag(trackRef);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    const isMobileView = window.innerWidth <= 767;

    const getViewportWidth = () => {
      if (isMobileView && sticky) {
        return sticky.clientWidth;
      }

      return window.innerWidth;
    };

    const context = gsap.context(() => {
      const getTravel = () => Math.max(0, track.scrollWidth - getViewportWidth());

      const getScrollDistance = () => {
        const travel = getTravel();

        return isMobileView ? travel + Math.round(window.innerHeight * 0.15) : travel;
      };

      const syncTravel = () => {
        section.style.setProperty(
          "--process-travel",
          isMobileView ? "0px" : `${getTravel()}px`
        );
      };

      syncTravel();

      gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.9,
          pin: isMobileView ? ".process-sticky" : false,
          pinReparent: isMobileView,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: syncTravel,
        },
      });
    }, section);

    const refreshScroll = () => ScrollTrigger.refresh();

    window.addEventListener("load", refreshScroll);
    window.addEventListener("resize", refreshScroll);

    requestAnimationFrame(() => {
      requestAnimationFrame(refreshScroll);
    });

    return () => {
      window.removeEventListener("load", refreshScroll);
      window.removeEventListener("resize", refreshScroll);
      context.revert();
    };
  }, []);

  return (
    <section className="process-scroll-section" ref={sectionRef}>
      <div className="process-sticky" ref={stickyRef}>
        <div className="process-track" ref={trackRef} {...(isMobile ? {} : dragHandlers)}>
          <article className="process-panel process-panel-intro">
            <h2>{content.title}</h2>
          </article>
          {content.items.map((item) => (
            <article className="journey-card" key={item.title}>
              <img src={item.image} alt="" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialsSection({
  materials,
  title,
}: {
  materials: readonly MaterialItem[];
  title: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dragHandlers = useHorizontalDrag(carouselRef);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const carousel = carouselRef.current;
    const track = trackRef.current;

    if (!section || !carousel || !track) {
      return;
    }

    const isMobileView = window.innerWidth <= 767;

    const context = gsap.context(() => {
      const getTravel = () => {
        if (isMobileView) {
          return Math.max(0, track.scrollWidth - carousel.clientWidth);
        }

        const lastCard = track.lastElementChild as HTMLElement | null;

        if (!lastCard) {
          return 0;
        }

        return Math.max(0, lastCard.offsetLeft + lastCard.offsetWidth - carousel.clientWidth);
      };

      const getScrollDistance = () => {
        const travel = getTravel();

        return isMobileView ? travel + Math.round(window.innerHeight * 0.15) : travel;
      };

      const syncTravel = () => {
        section.style.setProperty(
          "--materials-travel",
          isMobileView ? "0px" : `${getTravel()}px`
        );
      };

      syncTravel();

      gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.9,
          pin: isMobileView ? ".materials-sticky" : false,
          pinReparent: isMobileView,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: syncTravel,
        },
      });
    }, section);

    const refreshScroll = () => ScrollTrigger.refresh();

    window.addEventListener("load", refreshScroll);
    window.addEventListener("resize", refreshScroll);

    requestAnimationFrame(() => {
      requestAnimationFrame(refreshScroll);
    });

    return () => {
      window.removeEventListener("load", refreshScroll);
      window.removeEventListener("resize", refreshScroll);
      context.revert();
    };
  }, []);

  return (
    <section className="materials-scroll-section" ref={sectionRef}>
      <div className="materials-sticky">
        <div className="materials-inner">
          <h2>{title}</h2>
          <div
            className="materials-carousel"
            aria-label="Materials carousel"
            ref={carouselRef}
            {...(isMobile ? {} : dragHandlers)}
          >
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

function ConsultationForm({
  content,
}: {
  content: PageContent["form"];
}) {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeSelectRef = useRef<HTMLSelectElement>(null);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const openDatePicker = () => {
    const input = dateInputRef.current;

    if (!input) {
      return;
    }

    input.focus({ preventScroll: true });

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {
        // Browser blocked showPicker; fall back to click.
      }
    }

    input.click();
  };

  const openTimePicker = () => {
    const select = timeSelectRef.current;

    if (!select) {
      return;
    }

    select.focus({ preventScroll: true });

    if (typeof select.showPicker === "function") {
      try {
        select.showPicker();
      } catch {
        // Browser blocked showPicker.
      }
    }
  };

  const formatDate = (value: string) => {
    if (!value) {
      return "";
    }

    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      message: String(data.get("message") || ""),
    };

    setIsSubmitting(true);
    setStatus(content.sending);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setSelectedDate("");
      setSelectedTime("");
      setStatus(content.success);
    } catch {
      setStatus(content.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="consultation-form" onSubmit={submitForm}>
      <h2>{content.title}</h2>
      <input aria-label={content.name} name="name" placeholder={content.name} required />
      <input aria-label={content.phone} name="phone" placeholder={content.phone} required />
      <input aria-label={content.email} name="email" placeholder={content.email} required type="email" />
      <div className="form-row">
        <label className="field-picker" onClick={openDatePicker}>
          <span>{selectedDate ? formatDate(selectedDate) : content.date}</span>
          <span className="field-picker-icon">
            <CalendarIcon />
          </span>
          <input
            ref={dateInputRef}
            aria-label={content.date}
            name="date"
            onChange={(event) => setSelectedDate(event.target.value)}
            type="date"
            value={selectedDate}
          />
        </label>
        <label className="field-picker field-picker-time" onClick={openTimePicker}>
          <span>{selectedTime || content.time}</span>
          <span className="field-picker-icon">
            <ClockIcon />
          </span>
          <select
            ref={timeSelectRef}
            aria-label={content.time}
            name="time"
            onChange={(event) => setSelectedTime(event.target.value)}
            value={selectedTime}
          >
            <option value="">{content.time}</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
      </div>
      <textarea aria-label={content.message} name="message" placeholder={content.message} />
      <button className="submit-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? content.sending : content.submit}
      </button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}

export function HomePage({ locale = "en" }: { locale?: Locale }) {
  const content = pages[locale];
  const pageRef = useRef<HTMLElement | null>(null);
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalContent = activeModal ? content.modals[activeModal] : null;

  useEffect(() => {
    const page = pageRef.current;

    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(".hero-image", { scale: 1.04 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".header", { autoAlpha: 0, y: -18, duration: 0.8 })
        .from(".hero h1", { autoAlpha: 0, y: 26, duration: 0.9 }, "-=0.35")
        .from(".hero-copy-cta", { autoAlpha: 0, y: 18, duration: 0.65 }, "-=0.35")
        .from(".announcement", { autoAlpha: 0, y: 16, duration: 0.55 }, "-=0.35");

      gsap.to(".hero-image", {
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      });

      gsap.utils.toArray<HTMLElement>(".intro-image, .intro p").forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 34,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.from(".stat", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 76%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".range-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".range-copy h2, .range-copy p, .range-list li"), {
          autoAlpha: 0,
          y: 22,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });

        gsap.from(section.querySelector(".range-image img"), {
          autoAlpha: 0,
          scale: 1.03,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      });

      gsap.from(".materials-inner h2", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".materials-scroll-section",
          start: "top 76%",
          once: true,
        },
      });

      gsap.from(".material-card", {
        autoAlpha: 0,
        y: 28,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".materials-scroll-section",
          start: "top 68%",
          once: true,
        },
      });

      gsap.from(".process-panel-intro h2, .journey-card", {
        autoAlpha: 0,
        y: 26,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".process-scroll-section",
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".contact-info, .consultation-form", {
        autoAlpha: 0,
        y: 28,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 74%",
          once: true,
        },
      });

      gsap.from(".footer-inner > *", {
        autoAlpha: 0,
        y: 18,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".footer",
          start: "top 82%",
          once: true,
        },
      });
    }, page);

    return () => {
      context.revert();
    };
  }, [locale]);

  return (
    <main
      className={`site ${content.dir === "rtl" ? "site-rtl" : ""}`}
      dir={content.dir}
      lang={content.lang}
      ref={pageRef}
    >
      <div className="hero-shell">
        <section className="hero" id="home">
          <video
            className="hero-image"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/banner-1.mp4" type="video/mp4" />
          </video>
          <header className="header">
            <a className="logo-link" href="#" aria-label="HASS Home">
              <img src="/images/hass-logo.svg" alt="HASS Home" />
            </a>
            <nav aria-label="Primary navigation">
              {content.navLinks.map((link) => (
                <a href={`#${link.to}`} key={link.to}>
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              className="mobile-menu-toggle"
              type="button"
              aria-expanded={isMenuOpen}
              aria-label="Open navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </header>
          <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`} aria-label="Mobile navigation">
            {content.navLinks.map((link) => (
              <a href={`#${link.to}`} key={link.to} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <h1>{content.heroTitle}</h1>
          <a className="hero-copy-cta" href="#contact">
            {content.headerCta}
          </a>
        </section>

        <div className="announcement">{content.announcement}</div>
      </div>

      <a className="whatsapp-cta" href="https://wa.me/97440403535" target="_blank" rel="noreferrer">
        <span aria-hidden="true">
          <Icon name="WhatsApp" />
        </span>
        {content.whatsappCta}
      </a>

      <section className="intro" id="about">
        <img className="intro-image" src="/images/about-kitchen.png" alt="" />
        <p>
          {content.intro.map((part, index) =>
            "strong" in part && part.strong ? (
              <strong key={`${part.text}-${index}`}>{part.text}</strong>
            ) : (
              part.text
            )
          )}
        </p>
      </section>

      <section className="stats-section" id="quality">
        <img src="/images/stats-kitchen.png" alt="" />
        <div className="stats-list">
          {content.stats.map(([number, label]) => (
            <div className="stat" key={number}>
              <StatNumber value={number} />
              <p>{label}</p>
              <span aria-hidden="true" className="stat-line" />
            </div>
          ))}
        </div>
      </section>

      <RangeSection
        cta={content.kitchen.cta}
        description={content.kitchen.description}
        id="kitchens"
        items={content.kitchen.ranges}
        title={content.kitchen.title}
        titleTone="red"
      />

      <RangeSection
        cta={content.wardrobe.cta}
        copyFirst={false}
        description={content.wardrobe.description}
        id="wardrobes"
        items={content.wardrobe.ranges}
        title={content.wardrobe.title}
      />

      <MaterialsSection materials={content.materials} title={content.materialsTitle} />

      <JourneySection content={content.journey} />

      <section className="contact-section" id="contact">
        <ConsultationForm content={content.form} />
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-contact">
            <h2>{content.contact.title}</h2>
            <div className="contact-details">
              <p>
                {content.contact.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <p>
                {content.contact.phone}
                <br />
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
              </p>
              <p>
                {content.contact.hours.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-brochure">
              <h2>{content.footer.title}</h2>
              <form className="newsletter">
                <input
                  aria-label={content.footer.emailPlaceholder}
                  placeholder={content.footer.emailPlaceholder}
                  type="email"
                />
                <button type="submit">{content.footer.submit}</button>
              </form>
            </div>
            <div className="footer-social-block">
              <div className="social-links">
                {content.footer.socials.map((social) => (
                  <a href={social.href} key={social.label} aria-label={social.label} target="_blank" rel="noreferrer">
                    <Icon name={social.label} />
                  </a>
                ))}
              </div>
              <div className="footer-legal-links">
                {content.footer.links.map((link) => (
                  <button key={link.modal} onClick={() => setActiveModal(link.modal)} type="button">
                    {link.label}
                  </button>
                ))}
                <p>{content.footer.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {modalContent ? (
        <div className="modal-backdrop" role="presentation">
          <section className="content-modal" role="dialog" aria-modal="true" aria-labelledby="footer-modal-title">
            <button className="modal-close" onClick={() => setActiveModal(null)} type="button" aria-label="Close">
              x
            </button>
            <h2 id="footer-modal-title">{modalContent.title}</h2>
            {modalContent.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </div>
      ) : null}
    </main>
  );
}

export default function Home() {
  return <HomePage />;
}
