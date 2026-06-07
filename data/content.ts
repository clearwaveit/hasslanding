export type Locale = "en" | "ar";

export type RangeItem = {
  readonly name: string;
  readonly image: string;
};

export type MaterialItem = {
  readonly image: string;
  readonly title: string;
  readonly text: string;
};

export type JourneyItem = {
  readonly title: string;
  readonly text: string;
  readonly image: string;
};

export type PageContent = {
  readonly dir: "ltr" | "rtl";
  readonly lang: Locale;
  readonly navLinks: readonly { readonly label: string; readonly to: string }[];
  readonly headerCta: string;
  readonly heroTitle: string;
  readonly announcement: string;
  readonly intro: readonly {
    readonly text: string;
    readonly strong?: boolean;
  }[];
  readonly stats: readonly (readonly [string, string])[];
  readonly kitchen: {
    readonly title: string;
    readonly description: string;
    readonly cta: string;
    readonly ranges: readonly RangeItem[];
  };
  readonly wardrobe: {
    readonly title: string;
    readonly description: string;
    readonly cta: string;
    readonly ranges: readonly RangeItem[];
  };
  readonly materialsTitle: string;
  readonly materials: readonly MaterialItem[];
  readonly journey: {
    readonly title: string;
    readonly items: readonly JourneyItem[];
  };
  readonly whatsappCta: string;
  readonly contact: {
    readonly title: string;
    readonly address: readonly string[];
    readonly phone: string;
    readonly email: string;
    readonly hours: readonly string[];
  };
  readonly form: {
    readonly title: string;
    readonly name: string;
    readonly phone: string;
    readonly email: string;
    readonly date: string;
    readonly time: string;
    readonly message: string;
    readonly submit: string;
    readonly sending: string;
    readonly success: string;
    readonly error: string;
  };
  readonly footer: {
    readonly title: string;
    readonly emailPlaceholder: string;
    readonly submit: string;
    readonly copyright: string;
    readonly links: readonly {
      readonly label: string;
      readonly modal: "about" | "privacy";
    }[];
    readonly socials: readonly {
      readonly label: string;
      readonly href: string;
      readonly shortLabel: string;
    }[];
  };
  readonly modals: {
    readonly about: {
      readonly title: string;
      readonly body: readonly string[];
    };
    readonly privacy: {
      readonly title: string;
      readonly body: readonly string[];
    };
  };
};

const englishKitchenRanges = [
  {
    name: "Warm European Calm",
    image: "/images/kitchen-main.png",
  },
  {
    name: "Natural Wood",
    image: "/images/about-kitchen.png",
  },
  {
    name: "Luxury Minimal",
    image: "/images/footer-detail.png",
  },
  {
    name: "Clean Contemporary",
    image: "/images/footer-kitchen.png",
  },
  {
    name: "Modern Classic",
    image: "/images/kitchen-main.png",
  },
] as const;

const englishWardrobeRanges = [
  {
    name: "Walk-in Wardrobes",
    image: "/images/wardrobe-left.png",
  },
  {
    name: "Sliding Wardrobes",
    image: "/images/footer-detail.png",
  },
  {
    name: "Hinged Wardrobes",
    image: "/images/stats-kitchen.png",
  },
  {
    name: "Modular Storage",
    image: "/images/wardrobe-left.png",
  },
  {
    name: "Dressing Rooms",
    image: "/images/footer-detail.png",
  },
] as const;

const materialImages = [
  "/images/material-wood.png",
  "/images/material-finish.png",
  "/images/material-stone.png",
  "/images/material-hardware.png",
] as const;

const journeyImages = [
  "/images/footer-kitchen.png",
  "/images/footer-detail.png",
  "/images/stats-kitchen.png",
  "/images/kitchen-main.png",
  "/images/about-kitchen.png",
] as const;

export const pages = {
  en: {
    dir: "ltr",
    lang: "en",
    navLinks: [
      { label: "About", to: "about" },
      { label: "Kitchens", to: "kitchens" },
      { label: "Wardrobes", to: "wardrobes" },
      { label: "Quality", to: "quality" },
      { label: "Contact", to: "contact" },
    ],
    headerCta: "Book a Consultation",
    heroTitle:
      "A new destination for premium kitchens, wardrobes and interior solutions in Qatar with European standards",
    announcement:
      "A complete HASS digital experience is coming soon. Until then, our team is available for consultations and project enquiries.",
    intro: [
      { text: "Premium kitchens and wardrobes manufactured locally in " },
      { text: "Qatar", strong: true },
      { text: " to " },
      { text: "European quality", strong: true },
      {
        text: " standards, using carefully selected ",
      },
      { text: "German materials", strong: true },
      {
        text: ", advanced production technology, and precise detailing to deliver spaces that feel elegant, functional, and built to last.",
      },
    ],
    stats: [
      ["35+", "Years of production mastery"],
      ["360°", "From concept to production"],
      ["100%", "European-standard quality"],
    ],
    kitchen: {
      title: "Kitchen Ranges",
      description: "Collection of premium and modern styled kitchens",
      cta: "Visit Our Showroom",
      ranges: englishKitchenRanges,
    },
    wardrobe: {
      title: "Wardrobe Ranges",
      description: "Elegant wardrobe concepts planned around personal space",
      cta: "Visit Our Showroom",
      ranges: englishWardrobeRanges,
    },
    materialsTitle: "Materials & Finishes",
    materials: [
      {
        image: materialImages[0],
        title: "Authentic European Wood",
        text: "Oak, walnut, and select European veneers",
      },
      {
        image: materialImages[1],
        title: "Modern European Finishes",
        text: "Matte, gloss, and tactile textured surfaces",
      },
      {
        image: materialImages[2],
        title: "Natural Stone & Marble",
        text: "Countertops and refined accent details",
      },
      {
        image: materialImages[3],
        title: "Premium German Hardware",
        text: "Precision-engineered German fittings and mechanisms",
      },
    ],
    journey: {
      title: "Your journey with Hass Home",
      items: [
        {
          title: "Visit our showroom",
          text: "Free consultation, material selection & design guidance",
          image: journeyImages[0],
        },
        {
          title: "Production",
          text: "Crafted with precision and European standards",
          image: journeyImages[1],
        },
        {
          title: "Installation",
          text: "Professional and seamless execution",
          image: journeyImages[2],
        },
        {
          title: "Handover",
          text: "Your dream space brought to life",
          image: journeyImages[3],
        },
        {
          title: "Aftercare service",
          text: "Ongoing support and long-term care for your space",
          image: journeyImages[4],
        },
      ],
    },
    whatsappCta: "Talk to US",
    contact: {
      title: "Connect with the Hass team",
      address: ["C-Ring Road, Building No: 223,", "Al Hilal, Doha, Qatar"],
      phone: "+974 4040 3535",
      email: "info@hasshome.com",
      hours: ["Mon - Fri", "9:00 AM - 6:00 PM"],
    },
    form: {
      title: "Book a consultation",
      name: "Full name",
      phone: "Phone number",
      email: "Email address",
      date: "Select a date",
      time: "Select a time slot",
      message: "Message",
      submit: "Request My Consultation",
      sending: "Sending...",
      success: "Thank you. Your consultation request has been sent.",
      error: "Something went wrong. Please try again or email us directly.",
    },
    footer: {
      title: "Request a brochure",
      emailPlaceholder: "Email Address",
      submit: "Request a brochure",
      copyright: "© 2026 Hass Home. All rights reserved.",
      links: [
        { label: "About Us", modal: "about" },
        { label: "Privacy Policy", modal: "privacy" },
      ],
      socials: [
        { label: "Facebook", href: "#", shortLabel: "f" },
        { label: "LinkedIn", href: "#", shortLabel: "in" },
        { label: "WhatsApp", href: "https://wa.me/97440403535", shortLabel: "wa" },
        { label: "Instagram", href: "#", shortLabel: "ig" },
      ],
    },
    modals: {
      about: {
        title: "About Us",
        body: [
          "For years, HASS has been helping homeowners, designers, contractors, and developers bring exceptional spaces to life through premium kitchen and wardrobe solutions. Combining European standards, German materials, and local manufacturing expertise, we create products that deliver outstanding quality, functionality, and lasting value. Every project is approached with a commitment to craftsmanship, precision, and attention to detail, ensuring results that exceed expectations.",
          "At the heart of HASS is a dedication to innovation, customer satisfaction, and continuous improvement. From the initial consultation to final installation, our experienced team works closely with clients to provide a seamless experience and tailored solutions that reflect their unique vision. Through advanced manufacturing capabilities and a passion for excellence, we continue to set new benchmarks for luxury interiors in Qatar.",
        ],
      },
      privacy: {
        title: "Privacy Policy",
        body: [
          "HASS respects your privacy and uses submitted information only to respond to enquiries, consultation requests, brochure requests, and related customer service communication.",
          "We do not sell personal information. Contact details shared through this website may be stored securely for follow-up, project coordination, and service improvement, and can be removed on request.",
        ],
      },
    },
  },
  ar: {
    dir: "rtl",
    lang: "ar",
    navLinks: [
      { label: "من نحن", to: "about" },
      { label: "المطابخ", to: "kitchens" },
      { label: "الخزائن", to: "wardrobes" },
      { label: "الجودة", to: "quality" },
      { label: "تواصل معنا", to: "contact" },
    ],
    headerCta: "احجز استشارة",
    heroTitle: "وجهة جديدة للمطابخ والخزائن وحلول الديكور الداخلي الفاخرة في قطر وفق المعايير الأوروبية",
    announcement:
      "تجربة HASS الرقمية الكاملة قادمة قريباً. وحتى ذلك الحين، فريقنا متاح للاستشارات واستفسارات المشاريع.",
    intro: [
      { text: "مطابخ وخزائن فاخرة تُصنّع محلياً في " },
      { text: "قطر", strong: true },
      { text: " وفق " },
      { text: "معايير الجودة الأوروبية", strong: true },
      {
        text: "، باستخدام ",
      },
      { text: "مواد ألمانية", strong: true },
      {
        text: " مختارة بعناية، وتقنيات إنتاج متقدمة، وتفاصيل دقيقة لتقديم مساحات أنيقة وعملية ومصممة لتدوم.",
      },
    ],
    stats: [
      ["35+", "سنوات من إتقان التصنيع"],
      ["360°", "من الفكرة إلى الإنتاج"],
      ["100%", "جودة وفق المعايير الأوروبية"],
    ],
    kitchen: {
      title: "تشكيلات المطابخ",
      description: "مجموعة من المطابخ الفاخرة والحديثة",
      cta: "زيارة المعرض",
      ranges: [
        { ...englishKitchenRanges[0], name: "هدوء أوروبي دافئ" },
        { ...englishKitchenRanges[1], name: "خشب طبيعي" },
        { ...englishKitchenRanges[2], name: "فخامة بسيطة" },
        { ...englishKitchenRanges[3], name: "معاصر ونظيف" },
        { ...englishKitchenRanges[4], name: "كلاسيكي حديث" },
      ],
    },
    wardrobe: {
      title: "تشكيلات الخزائن",
      description: "مفاهيم خزائن أنيقة مصممة حول المساحة الشخصية",
      cta: "زيارة المعرض",
      ranges: [
        { ...englishWardrobeRanges[0], name: "خزائن مفتوحة" },
        { ...englishWardrobeRanges[1], name: "خزائن منزلقة" },
        { ...englishWardrobeRanges[2], name: "خزائن بمفصلات" },
        { ...englishWardrobeRanges[3], name: "حلول تخزين معيارية" },
        { ...englishWardrobeRanges[4], name: "غرف ملابس" },
      ],
    },
    materialsTitle: "المواد والتشطيبات",
    materials: [
      {
        image: materialImages[0],
        title: "خشب أوروبي أصيل",
        text: "بلوط وجوز وقشور خشبية أوروبية مختارة",
      },
      {
        image: materialImages[1],
        title: "تشطيبات أوروبية حديثة",
        text: "أسطح مطفية ولامعة وملمسية",
      },
      {
        image: materialImages[2],
        title: "حجر طبيعي ورخام",
        text: "أسطح عمل وتفاصيل بارزة راقية",
      },
      {
        image: materialImages[3],
        title: "إكسسوارات ألمانية فاخرة",
        text: "آليات وتجهيزات ألمانية عالية الدقة",
      },
    ],
    journey: {
      title: "رحلتك مع HASS Home",
      items: [
        {
          title: "زيارة المعرض",
          text: "استشارة مجانية واختيار المواد والتوجيه التصميمي",
          image: journeyImages[0],
        },
        {
          title: "الإنتاج",
          text: "تنفيذ دقيق وفق المعايير الأوروبية",
          image: journeyImages[1],
        },
        {
          title: "التركيب",
          text: "تنفيذ احترافي وسلس",
          image: journeyImages[2],
        },
        {
          title: "التسليم",
          text: "تحويل مساحة أحلامك إلى واقع",
          image: journeyImages[3],
        },
        {
          title: "خدمة ما بعد البيع",
          text: "دعم مستمر وعناية طويلة الأمد بمساحتك",
          image: journeyImages[4],
        },
      ],
    },
    whatsappCta: "تحدث معنا",
    contact: {
      title: "تواصل مع فريق HASS",
      address: ["طريق سي رينغ، مبنى رقم 223،", "الهلال، الدوحة، قطر"],
      phone: "+974 4040 3535",
      email: "info@hasshome.com",
      hours: ["الإثنين - الجمعة", "9:00 صباحاً - 6:00 مساءً"],
    },
    form: {
      title: "احجز استشارة",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      date: "اختر التاريخ",
      time: "اختر الوقت المناسب",
      message: "الرسالة",
      submit: "طلب الاستشارة",
      sending: "جارٍ الإرسال...",
      success: "شكراً لك. تم إرسال طلب الاستشارة.",
      error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.",
    },
    footer: {
      title: "اطلب الكتيب",
      emailPlaceholder: "البريد الإلكتروني",
      submit: "طلب الكتيب",
      copyright: "© 2026 HASS Home. جميع الحقوق محفوظة.",
      links: [
        { label: "من نحن", modal: "about" },
        { label: "سياسة الخصوصية", modal: "privacy" },
      ],
      socials: [
        { label: "فيسبوك", href: "#", shortLabel: "f" },
        { label: "لينكدإن", href: "#", shortLabel: "in" },
        { label: "واتساب", href: "https://wa.me/97440403535", shortLabel: "wa" },
        { label: "إنستغرام", href: "#", shortLabel: "ig" },
      ],
    },
    modals: {
      about: {
        title: "من نحن",
        body: [
          "لسنوات، ساعدت HASS أصحاب المنازل والمصممين والمقاولين والمطورين على تحويل المساحات الاستثنائية إلى واقع من خلال حلول مطابخ وخزائن فاخرة. وبالجمع بين المعايير الأوروبية والمواد الألمانية وخبرة التصنيع المحلي، نصنع منتجات تقدم جودة عالية ووظائف عملية وقيمة تدوم.",
          "في قلب HASS التزام بالابتكار ورضا العملاء والتحسين المستمر. من الاستشارة الأولى وحتى التركيب النهائي، يعمل فريقنا عن قرب مع العملاء لتقديم تجربة سلسة وحلول مخصصة تعكس رؤيتهم، مع مواصلة وضع معايير جديدة للتصميمات الداخلية الفاخرة في قطر.",
        ],
      },
      privacy: {
        title: "سياسة الخصوصية",
        body: [
          "تحترم HASS خصوصيتك وتستخدم المعلومات المقدمة فقط للرد على الاستفسارات وطلبات الاستشارة وطلبات الكتيب وخدمات التواصل المتعلقة بالعملاء.",
          "نحن لا نبيع المعلومات الشخصية. قد يتم حفظ بيانات التواصل المقدمة عبر الموقع بشكل آمن للمتابعة وتنسيق المشاريع وتحسين الخدمة، ويمكن طلب حذفها عند الحاجة.",
        ],
      },
    },
  },
} as const satisfies Record<Locale, PageContent>;
