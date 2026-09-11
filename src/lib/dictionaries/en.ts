import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "Alexsha Maharjan — Portfolio",
    description:
      "Designing intuitive digital experiences and unique brands. Portfolio of Alexsha Maharjan, a digital designer from Lübeck, Germany.",
  },
  nav: {
    portfolio: "Portfolio",
    playground: "Playground",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    modeSwitchLabel: "Site mode",
    switchToPlayground: "Switch to the playground",
    switchToPortfolio: "Switch to the portfolio",
    switchToGerman: "Switch to German",
    switchToEnglish: "Switch to English",
  },
  landmarks: {
    primaryNav: "Primary",
    menu: "Menu",
    footerNav: "Footer",
    projectNav: "Project navigation",
    processCanvas: "My design process",
  },
  hero: {
    eyebrow: "Digital Designer from Lübeck, Germany",
    headlineLines: ["Hello, I am", "Alexsha Maharjan"],
    intro:
      "I design intuitive digital experiences, and I create brands that mean something and look like nobody else's.",
    tags: "UI/UX · Branding · Visual Design",
  },
  process: {
    scrollCue: "Scroll to explore ↓",
    question: "How do I bring a project to life?",
    srSummary:
      "My process, in five steps: understand what feels unclear to people, define what is worth solving, explore possibilities through sketches and wireframes, design how the experience should feel, and refine it through testing and iteration.",
    branches: [
      {
        number: "01",
        title: "Understand",
        question: "What feels unclear to people?",
        ariaLabel:
          "Step 1: Understand. What feels unclear to people? Interviews, SWOT market analysis and frustration ratings.",
      },
      {
        number: "02",
        title: "Define",
        question: "What is actually worth solving?",
        ariaLabel:
          "Step 2: Define. What is actually worth solving? Impact and effort, opportunity statement, success criteria.",
      },
      {
        number: "03",
        title: "Explore",
        question: "How can I make possibilities visible?",
        ariaLabel:
          "Step 3: Explore. How can I make possibilities visible? Sitemaps, sketches and concept directions.",
      },
      {
        number: "04",
        title: "Design",
        question: "What should the experience feel like?",
        ariaLabel:
          "Step 4: Design. What should the experience feel like? Type, colour, components and brand applications.",
      },
      {
        number: "05",
        title: "Refine",
        question: "How do I know it works?",
        ariaLabel:
          "Step 5: Refine. How do I know it works? Before and after, usability testing, validation and iteration.",
      },
    ],
    closeSelection: "Close selection",
  },
  selectedWork: {
    eyebrow: "Selected Projects",
    heading: "Thoughtful design, meaningful impact",
    copy: "My work focuses on creating visual identities and digital experiences that are clear, engaging, and purposeful. From brand systems to user interfaces and experimental projects, I explore how design can communicate ideas, solve problems, and create better experiences for users.",
  },
  projects: [
    {
      slug: "wikimind",
      name: "WikiMind",
      headline: "Making artificial intelligence feel clear, useful and approachable.",
      description:
        "Making complex AI services easier to understand through an approachable identity and a clearly structured website.",
      tags: ["Branding", "UI/UX", "Web Design"],
      role: "Brand & UI/UX Designer",
      year: "2026",
      image: "/images/hero-wikimind.webp",
      imageAlt: "The WikiMind homepage shown on a laptop, beside the case-study title",
      imageAspect: "1900/1066",
    },
    {
      slug: "afono",
      name: "AFONO",
      headline: "Translating Nepali identity into contemporary streetwear.",
      description:
        "A culturally rooted streetwear identity connecting brand strategy, clothing graphics and e-commerce design.",
      tags: ["Branding", "E-commerce", "Graphic Design"],
      role: "Brand, Fashion & UI/UX Designer",
      year: "2026",
      image: "/images/hero-afono.webp",
      imageAlt: "Print lettering from AFONO's HIMAL series",
      imageAspect: "1600/900",
    },
    {
      slug: "sync-fm",
      name: "Sync FM",
      headline: "Giving listeners control without turning radio into another dashboard.",
      description:
        "An interactive AI-radio concept that lets listeners shape information depth, presenter tone and journalistic framing.",
      tags: ["Interaction Design", "Mobile UI", "AI Concept"],
      role: "Interaction & UI Designer",
      year: "",
      image: "/images/hero-sync-fm.webp",
      imageAlt: "Sync FM's home screen with the news dial",
      imageAspect: "1578/1088",
    },
    {
      slug: "barrier-free-kitchen",
      name: "Barrier-Free Kitchen",
      headline: "Designing a kitchen through reach, sight and touch.",
      description:
        "An inclusive kitchen developed through observation, full-scale testing and 3D environmental design.",
      tags: ["Inclusive Design", "Design Research", "3D"],
      role: "Prototyping & 3D Designer",
      year: "",
      image: "/images/hero-barrier-free-kitchen.webp",
      imageAlt: "The barrier-free kitchen modelled in 3D",
      imageAspect: "1900/1069",
    },
    {
      slug: "surugami",
      name: "Surugami",
      headline: "Making origami feel social, contemporary and easy to enter.",
      description:
        "An origami-inspired identity translated into a coherent print campaign and digital experience.",
      tags: ["Branding", "Print Design", "Web Design"],
      role: "Illustration, Poster & Web Design",
      year: "",
      image: "/images/hero-surugami.webp",
      imageAlt: "A Surugami poster inviting people to fold",
      imageAspect: "1900/1189",
    },
    {
      slug: "qis-portal",
      name: "QIS Portal Redesign",
      headline: "Turning a fragmented university portal into a clearer student service.",
      description:
        "A research-led redesign simplifying essential university-administration tasks for students.",
      tags: ["UX Research", "Information Architecture", "Product Design"],
      role: "UX/UI Designer & Researcher",
      year: "2024",
      image: "/images/hero-qis-portal.webp",
      imageAlt: "The redesigned QIS Portal exam page",
      imageAspect: "1900/1069",
    },
  ],
  resume: {
    metaTitle: "Résumé — Alexsha Maharjan",
    name: "Alexsha Maharjan",
    tagline: "UX/UI Design · Corporate Design · Frontend",
    location: "Lübeck, Germany",
    email: "alexsha.maharjan1@gmail.com",
    portfolio: "alexshamaharjan.github.io",
    portfolioHref: "https://alexshamaharjan.github.io",
    linkedin: "linkedin.com/in/alexsham",
    linkedinHref: "https://www.linkedin.com/in/alexsham",
    backToAbout: "← Back to about",
    profileHeading: "Profile",
    profileBody:
      "Student of Information Technology and Design (B.Sc.) at Technische Hochschule Lübeck, with a focus on human-centred design. Designing interfaces and brand identities across coursework and personal projects, alongside frontend implementation with HTML, CSS and Vue.js. German C1, English fluent.",
    educationHeading: "Education",
    education: [
      {
        degree: "Information Technology and Design, B.Sc.",
        period: "03/2024 – 08/2027 (expected)",
        place: "Technische Hochschule Lübeck, Lübeck · current GPA 1.8 (German scale)",
        detail: "Relevant modules: Typography Fundamentals, Design Methodology, Visual Representation Techniques, Web Development",
      },
      {
        degree: "Computer Science, B.Sc. (change of major)",
        period: "09/2022 – 02/2024",
        place: "Technische Hochschule Lübeck, Lübeck",
      },
      {
        degree: "Studienkolleg (foundation programme), Technical Track",
        period: "09/2021 – 08/2022",
        place: "Studienkolleg Coburg, Coburg · Final grade 1.5",
      },
      {
        degree: "Higher Secondary Education (10+2), Science",
        period: "06/2017 – 05/2019",
        place: "GEMS Institute of Higher Education, Kathmandu, Nepal · Instruction in English",
      },
    ],
    projectsHeading: "Selected Projects",
    projects: [
      {
        name: "WikiMind — Corporate Design & Website for an AI Company",
        period: "2025",
        place: "Semester project, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Visual identity, UI design and website concept, including a mascot for the visual language",
          "Information architecture, wireframing and high-fidelity prototyping in Figma",
        ],
      },
      {
        name: "Surugami — Brand Identity, Print & Web Design",
        period: "2025",
        place: "Semester project, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Logo, typography and colour system; print-ready layouts for flyers, posters and banners (CMYK, prepress)",
          "Interactive Figma prototype of the brand website",
        ],
      },
      {
        name: "Hibi — Productivity Web App, Design & Development",
        period: "2025",
        place: "Personal project, Lübeck",
        bullets: [
          "UX/UI concept for to-dos, calendar, journal and mood tracking",
          "Frontend implementation with Vue.js and Tailwind CSS",
        ],
      },
    ],
    experienceHeading: "Practical Experience",
    experience: [
      {
        role: "Working Student: Image Data Annotation / Image Processing",
        period: "07/2024 – 06/2026",
        place: "Nordischer Maschinenbau Rud. Baader GmbH & Co. KG, Lübeck",
        bullets: [
          "Annotation and quality control of image data for AI-driven processing systems",
          "Structured review of large datasets against defined quality standards",
          "Documented results and collaborated with interdisciplinary teams",
        ],
      },
    ],
    furtherHeading: "Further Education & Engagement",
    further: [
      {
        title: "AI Builders Arena",
        place: "opencampus.sh, Kiel",
        description: "Designer in an interdisciplinary team; UX concept and chatbot design for the Waterkant Festival",
        period: "04/2024 – 07/2024",
      },
      {
        title: "“Prompt like a Pro” workshop",
        place: "Technische Hochschule Lübeck, Lübeck",
        description: "AI tools for text and image, project week",
        period: "11/11/2024",
      },
    ],
    skillsHeading: "Skills",
    skills: [
      { label: "Design", value: "UX/UI design, human-centred design, wireframing, prototyping, corporate design, branding, editorial & print design, typography, responsive design" },
      { label: "Software", value: "Figma, Adobe Illustrator, Photoshop, InDesign, Fresco, Blender, Microsoft 365" },
      { label: "Print & Production", value: "Prepress, final artwork, print-ready PDFs, CMYK, packaging design" },
      { label: "Development", value: "HTML5, CSS3, JavaScript, Vue.js, Tailwind CSS, MariaDB, Docker" },
      { label: "Languages", value: "Nepali – native · Newari – native · German – fluent (C1) · English – fluent · Hindi – fluent" },
    ],
    printCta: "Print / Save as PDF",
  },
  aboutPreview: {
    eyebrow: "About",
    heading: "How did I start designing?",
    copy:
      "I grew up in Nepal surrounded by creativity, always making things, experimenting with crafts, and designing personalised gifts for people around me. What I enjoyed most was not just creating something visually appealing, but thinking about the person it was for, what they would like, and what would make it feel meaningful.",
    /*
     * The paragraph that fades out (`MILESTONE-012` task 3). It is the about
     * page's own second paragraph, and it follows `copy` because that is what
     * it follows there too: `copy` ends on what made a gift feel meaningful and
     * this one opens on "That way of thinking", so the two run on rather than
     * restating each other.
     */
    copyDim:
      "That way of thinking eventually led me to design. I realised that many of the things I had naturally enjoyed, understanding people, making thoughtful choices, and shaping ideas visually, were at the heart of user-centred design.",
    linkAbout: "Read the whole story →",
    playgroundHeading: "The playground",
    playgroundCopy: "Everything I make when nobody has asked for it. Personal projects, crafts, experiments, and whatever I happen to be learning at the moment.",
    linkPlayground: "Open the playground",
    portraitAlt: "Portrait of Alexsha Maharjan.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Available for design opportunities.",
    copy: "Interested in my work? View my résumé or contact me about a role, project or collaboration.",
    resumeCta: "View résumé",
    contactCta: "Contact me",
  },
  footer: {
    tagline: "UI/UX, Brand and Visual Designer",
    email: "alexsha.maharjan1@gmail.com",
    linkedin: "linkedin.com/in/alexsham",
    linkedinHref: "https://www.linkedin.com/in/alexsham",
    resume: "Résumé",
    backToTop: "Back to top ↑",
    copyright: "© 2026 Alexsha Maharjan",
  },
  legal: {
    impressumNav: "Impressum",
    privacyNav: "Privacy",
    address: ["Alexsha Maharjan", "[ Street and number ]", "[ Postcode and city ]", "Germany"],
    impressum: {
      title: "Impressum",
      intro:
        "Legal notice for this website, as required of a site published from Germany under § 5 DDG.",
      updated: "Last updated: September 2026",
      sections: [
        {
          heading: "Information pursuant to § 5 DDG",
          body: [],
          address: true,
        },
        {
          heading: "Contact",
          body: ["Email: alexsha.maharjan1@gmail.com"],
        },
        {
          heading: "Responsible for the content under § 18 (2) MStV",
          body: ["Alexsha Maharjan, at the address above."],
        },
        {
          heading: "Liability for content",
          body: [
            "As a service provider I am responsible for my own content on these pages under the general laws, in accordance with § 7 (1) DDG. Under §§ 8 to 10 DDG, however, I am not obliged to monitor transmitted or stored third-party information, or to investigate circumstances that indicate unlawful activity.",
            "Obligations to remove or block the use of information under the general laws are unaffected by this. Liability in that respect is only possible from the point at which a concrete infringement becomes known. If I become aware of any such infringement, I will remove the content immediately.",
          ],
        },
        {
          heading: "Liability for links",
          body: [
            "This site links to external websites over whose content I have no influence, so I cannot accept responsibility for that content. The respective provider or operator of a linked site is always responsible for its content.",
            "The linked pages were checked for possible legal violations at the time they were linked. No unlawful content was apparent at that time. Permanent monitoring of the content of linked pages is not reasonable without concrete evidence of an infringement. If I become aware of any violation, I will remove the link immediately.",
          ],
        },
        {
          heading: "Copyright",
          body: [
            "The content and works on these pages created by me are subject to German copyright law. Reproduction, adaptation, distribution and any kind of exploitation outside the limits of copyright require my written consent. Downloads and copies of this site are permitted for private, non-commercial use only.",
            "Brands, logos and client material shown inside the project case studies remain the property of their respective rights holders and are reproduced here to document design work.",
          ],
        },
        {
          heading: "Consumer dispute resolution",
          body: [
            "I am neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy",
      intro:
        "What happens to data when you visit this site, and what your rights are under the GDPR.",
      updated: "Last updated: September 2026",
      sections: [
        {
          heading: "The short version",
          body: [
            "This is a personal portfolio. It sets no cookies, runs no analytics or tracking, and has no accounts and no contact form. The only data that arises when you visit are the technical access data the host writes to its logs, and the data your browser sends to Google when it fetches the two typefaces this site uses.",
          ],
        },
        {
          heading: "Controller",
          body: ["Email: alexsha.maharjan1@gmail.com"],
          address: true,
        },
        {
          heading: "Hosting",
          body: [
            "This site is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
            "When you open a page, your browser sends technically necessary data to GitHub's servers, which are recorded there in server log files. These usually include your IP address, the date and time of the request, the address requested, the referring URL, and your browser and operating system. This data is not merged with any other source and I do not have access to it.",
            "The legal basis is Art. 6 (1) (f) GDPR, my legitimate interest in providing this website securely and reliably. GitHub also processes this data in the United States.",
          ],
        },
        {
          heading: "Typefaces",
          body: [
            "This site loads the typefaces Inter and Caveat from Google Fonts, a service of Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Your browser fetches the font files directly from Google's servers and transmits your IP address in doing so.",
            "The legal basis is Art. 6 (1) (f) GDPR, my legitimate interest in a consistent presentation of this website.",
          ],
        },
        {
          heading: "Contacting me by email",
          body: [
            "If you write to me, I process your email address and the content of your message in order to answer it. The legal basis is Art. 6 (1) (b) GDPR where your enquiry concerns a contract, and otherwise Art. 6 (1) (f) GDPR. I delete this data once it is no longer needed and no statutory retention period prevents it.",
          ],
        },
        {
          heading: "External links",
          body: [
            "This site links out to external services, among them LinkedIn. The respective provider is responsible for data processing on those pages. No data is transferred to them until you actively follow such a link.",
          ],
        },
        {
          heading: "Encryption",
          body: [
            "This site is served over HTTPS only, so the connection between your browser and the server is encrypted.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You have the right to information about the data stored about you (Art. 15 GDPR), and to rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection to processing (Art. 21). Write to the address above to exercise any of them.",
            "Independently of that, you may lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). This is usually the authority for your place of residence or the authority where I am based.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "I update this notice when the site or the legal position changes. The version published here is the one that applies.",
          ],
        },
      ],
    },
  },
  about: {
    backToHome: "← Back to home",
    eyebrow: "About",
    heading: "How did I start designing?",
    portraitAlt: "Portrait of Alexsha.",
    handNoteOrigin: "Nepal → Germany",
    handNoteMaking: "always making something!",
    portraitTags: ["UI/UX Design", "Branding", "Visual Design"],
    biographyHeading: "Biography",
    biography: [
      "I grew up in Nepal surrounded by creativity, always making things, experimenting with crafts, and designing personalised gifts for people around me. What I enjoyed most was not just creating something visually appealing, but thinking about the person it was for, what they would like, and what would make it feel meaningful.",
      "That way of thinking eventually led me to design. I realised that many of the things I had naturally enjoyed, understanding people, making thoughtful choices, and shaping ideas visually, were at the heart of user-centred design.",
      "That journey eventually brought me from Nepal to Germany, where I am pursuing my bachelor’s degree and growing as a multidisciplinary designer focused on UI/UX, visual design, branding, and web design. Living in a new environment has also broadened the way I see people, culture, and design.",
      "For me, good design is not only about how something looks, but also about understanding who it is for and creating something that feels useful and meaningful.",
    ],
    focusHeading: "Professional focus",
    focusItems: ["UI/UX Design", "Web Design", "Brand Identity", "Graphic Design", "Interaction Design"],
    toolsHeading: "Tools I have learned",
    tools: [
      { name: "Figma" },
      { name: "Adobe Illustrator" },
      { name: "Adobe Photoshop" },
      { name: "Blender" },
      { name: "After Effects" },
      { name: "Artificial Intelligence", accent: true },
    ],
    aiBody:
      "I use AI to think wider, faster: condensing research, playing out directions, sharpening copy, making ideas testable early. The judgement, the craft and the final decisions stay mine.",
    aiTags: ["Research", "Ideation", "Content", "Prototyping"],
    playgroundHeading: "The playground",
    playgroundCopy: "Everything I make when nobody has asked for it. Personal projects, crafts, experiments, and whatever I happen to be learning at the moment.",
    linkPlayground: "Open the playground",
    loveIntro: "I love",
    /*
     * The words are the owner's own subjects, not a generic maker's vocabulary
     * (`MILESTONE-013` task 10). Every one of them is something the site can
     * be asked to show: the beadwork, the paintings and the packaging are
     * cards in the playground, the typography is the calendar series, and the
     * gifts are the thing the biography says the whole career came out of.
     * "drawing, crafting, building, experimenting, learning, exploring" could
     * have been anybody.
     */
    loveWords: [
      "making things by hand",
      "making gifts for people",
      "beadwork",
      "painting",
      "typography",
      "colour",
      "packaging",
      "learning languages",
    ],
    resumeHeading: "Résumé & contact",
    resumeCopy: "Interested in working together? View my résumé or send me a message.",
    resumeCta: "View résumé",
    contactCta: "Contact me",
  },
  routeLoading: "Loading page…",
  caseStudy: {
    backToProjects: "← Back to projects",
    onThisPage: "On this page",
    designQuestion: "Design question",
    previousProject: "← Previous project",
    nextProject: "Next project →",
    viewAllWork: "View all work",
    role: "Role",
    contribution: "Contribution",
    type: "Type",
    tools: "Tools",
    deliverables: "Deliverables",
  },
  notFound: {
    metaTitle: "Page not found — Alexsha Maharjan",
    eyebrow: "404",
    heading: "This page doesn't exist.",
    copy: "The page you're looking for may have been moved or never existed.",
    backHome: "← Back to home",
  },
};

export default en;
