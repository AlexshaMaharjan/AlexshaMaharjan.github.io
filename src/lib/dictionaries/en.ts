import type { Dictionary } from "./types";
import { PROJECT_TAGS } from "../caseStudies/tags";

const en: Dictionary = {
  meta: {
    title: "Alexsha Maharjan · Portfolio",
    description:
      "I design digital experiences and brand identities with their own character. Portfolio of Alexsha Maharjan, a multidisciplinary designer based in Lübeck, Germany.",
  },
  nav: {
    portfolio: "Portfolio",
    playground: "Archive",
    projects: "Projects",
    about: "About me",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    modeSwitchLabel: "Site mode",
    switchToPlayground: "Switch to the archive",
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
    eyebrow: "Multidisciplinary Designer · Lübeck, Germany",
    headlineLines: ["Hello, I am", "Alexsha Maharjan"],
    intro:
      "I design digital experiences and brand identities with their own character, always keeping the people they are for in mind.",
    tags: "UI/UX · Branding · Visual Design",
  },
  process: {
    scrollCue: "Scroll to explore ↓",
    question: "How do I bring a project to life?",
    srSummary:
      "My process, in five steps: understand what I need to learn before I begin, define what is actually worth solving, explore possibilities through sketches and wireframes, design how it should look and feel, and refine it through testing and iteration.",
    branches: [
      {
        number: "01",
        title: "Understand",
        question: "What do I need to learn before I begin?",
        ariaLabel:
          "Step 1: Understand. What do I need to learn before I begin? Interviews, SWOT market analysis and frustration ratings.",
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
        question: "What should it look and feel like?",
        ariaLabel:
          "Step 4: Design. What should it look and feel like? Type, colour, components and brand applications.",
      },
      {
        number: "05",
        title: "Refine",
        question: "How do I know it works?",
        ariaLabel:
          "Step 5: Refine. How do I know it works? Before and after, usability testing, validation and iteration.",
      },
    ],
  },
  selectedWork: {
    eyebrow: "Selected Projects",
    heading: "Different projects, different perspectives",
    copy: "My work moves between UI/UX, branding, visual design and experimentation. Each project brings a different challenge and gives me room to explore a different side of design.",
  },
  projects: [
    {
      slug: "afono",
      name: "AFONO",
      headline: "Translating Nepali identity into contemporary streetwear.",
      description: "A fictional streetwear brand built from the ground up, from its identity and clothing graphics to its website and digital shopping experience.",
      tags: [...PROJECT_TAGS.afono],
      role: "Brand, Graphic & UI/UX Designer",
      year: "2026",
      image: "/images/hero-afono.webp",
      imageAlt: "The AFONO name beside the shop and landing pages in browser windows",
      imageAspect: "1920/1080",
      accent: "#0A0A0A",
    },
    {
      slug: "surugami",
      name: "Surugami",
      headline: "Building a visual identity around the craft of origami.",
      description: "An origami-inspired brand explored across illustration, print and web design.",
      tags: [...PROJECT_TAGS.surugami],
      role: "Concept, Graphic & Web Designer",
      year: "",
      image: "/images/hero-surugami.webp",
      imageAlt: "The Surugami name beside the website shown across a stack of screens",
      imageAspect: "1920/1080",
      accent: "#D0254D",
    },
    {
      slug: "wikimind",
      name: "WikiMind",
      headline: "Making AI services clear, useful and approachable.",
      description: "A brand identity and website concept for an AI company offering workshops, chatbots and software solutions.",
      tags: [...PROJECT_TAGS.wikimind],
      role: "Brand & UI/UX Designer",
      year: "2026",
      image: "/images/hero-wikimind.webp",
      imageAlt: "The WikiMind name beside the homepage shown on a laptop",
      imageAspect: "1920/1080",
      accent: "#1D28A8",
    },
    {
      slug: "sync-fm",
      name: "Sync FM",
      headline: "Bringing personalisation to the flow of radio.",
      description: "An interactive AI-radio concept combining the continuous experience of traditional radio with selected controls from personalised streaming.",
      tags: [...PROJECT_TAGS["sync-fm"]],
      role: "Interaction & UI Designer",
      year: "",
      image: "/images/hero-sync-fm.webp",
      imageAlt: "The Sync FM name beside a fan of the app's phone screens",
      imageAspect: "1920/1080",
      accent: "#5B377C",
    },
    {
      slug: "barrier-free-kitchen",
      name: "Barrier-Free Kitchen",
      headline: "Designing a kitchen through reach, sight and touch.",
      description: "An inclusive kitchen concept developed around the needs of wheelchair users and people with visual impairments.",
      tags: [...PROJECT_TAGS["barrier-free-kitchen"]],
      role: "Prototyping & 3D Designer",
      year: "",
      image: "/images/hero-barrier-free-kitchen.webp",
      imageAlt: "The Barrier-Free Kitchen name beside three 3D renders of the kitchen in use",
      imageAspect: "1920/1080",
      accent: "#1C5B4A",
    },
    {
      slug: "qis-portal",
      name: "QIS Portal Redesign",
      headline: "Redesigning a fragmented university portal around student tasks.",
      description: "A research-led redesign of a student portal, focused on information architecture, navigation and clearer task flows.",
      tags: [...PROJECT_TAGS["qis-portal"]],
      role: "UX/UI Designer & Researcher",
      year: "2024",
      image: "/images/hero-qis-portal.webp",
      imageAlt: "The QIS Portal name beside the redesigned portal in browser windows",
      imageAspect: "1920/1080",
      accent: "#A80D26",
    },
  ],
  resume: {
    metaTitle: "Résumé · Alexsha Maharjan",
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
        name: "WikiMind: Corporate Design & Website for an AI Company",
        period: "2025",
        place: "Semester project, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Visual identity, UI design and website concept, including a mascot for the visual language",
          "Information architecture, wireframing and high-fidelity prototyping in Figma",
        ],
      },
      {
        name: "Surugami: Brand Identity, Print & Web Design",
        period: "2025",
        place: "Semester project, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Logo, typography and colour system; print-ready layouts for flyers, posters and banners (CMYK, prepress)",
          "Interactive Figma prototype of the brand website",
        ],
      },
      {
        name: "Hibi: Productivity Web App, Design & Development",
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
    eyebrow: "About me",
    heading: "How did I start designing?",
    copy:
      "I grew up in Nepal surrounded by creativity, always making things, experimenting with crafts and creating personalised gifts for people around me. What I enjoyed most was thinking about who it was for, what they would like and what would make it feel meaningful.",
    /*
     * The paragraph that fades out (`MILESTONE-012` task 3). It is the about
     * page's own second paragraph, and it follows `copy` because that is what
     * it follows there too: `copy` ends on what made a gift feel meaningful and
     * this one opens on "That way of thinking", so the two run on rather than
     * restating each other.
     */
    copyDim:
      "That way of thinking eventually led me to design, where understanding people and shaping ideas visually became part of how I work.",
    linkAbout: "Read the whole story →",
    playgroundHeading: "The archive",
    playgroundCopy: "A collection of personal projects, crafts and experiments where I explore ideas, learn and try something new.",
    linkPlayground: "Open the archive",
    portraitAlt: "Portrait of Alexsha Maharjan.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Open to design opportunities.",
    copy: "If my work feels like a fit, take a look at my résumé or get in touch about a role, project or collaboration.",
    resumeCta: "View résumé",
    contactCta: "Contact me",
  },
  footer: {
    tagline: "UI/UX · Branding · Visual Design",
    email: "alexsha.maharjan1@gmail.com",
    linkedin: "linkedin.com/in/alexsham",
    linkedinHref: "https://www.linkedin.com/in/alexsham",
    resume: "Résumé",
    availability: "Open to design opportunities",
    backToTop: "Back to top ↑",
    copyright: "© 2026 Alexsha Maharjan",
  },
  playgroundOutro: {
    eyebrow: "End of the archive",
    heading: "More professional work, this way.",
    copy: "Head back to the portfolio to see my case studies, design process and selected project work.",
    cta: "Back to the portfolio",
  },
  playgroundViewer: {
    made: "Made",
    tools: "Tools",
    type: "Type",
    close: "Close",
    previous: "Previous piece",
    next: "Next piece",
    position: "{n} of {total}",
    collections: "Collections",
    soundOn: "Sound on",
    soundOff: "Sound off",
    prototypeLink: "Figma prototype",
  },
  playgroundPeek: {
    openLabel: "Open the archive",
    cta: "Open the archive",
    note: "have a look",
  },
  legal: {
    impressumNav: "Impressum",
    privacyNav: "Privacy",
    address: ["Alexsha Maharjan", "23562 Lübeck", "Germany"],
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
            "This is a personal portfolio. It sets no cookies of its own, runs no analytics or tracking, and has no accounts and no contact form. The typefaces are served from this site itself. There is one thing loaded from elsewhere: five of the case studies end in an interactive prototype hosted by Figma, and that prototype loads as you reach it. Everything else that arises when you visit are the technical access data the host writes to its logs.",
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
          heading: "Contacting me by email",
          body: [
            "If you write to me, I process your email address and the content of your message in order to answer it. The legal basis is Art. 6 (1) (b) GDPR where your enquiry concerns a contract, and otherwise Art. 6 (1) (f) GDPR. I delete this data once it is no longer needed and no statutory retention period prevents it.",
          ],
        },
        {
          heading: "Figma prototypes",
          body: [
            "Five of the case studies contain an interactive prototype hosted by Figma, Inc., 760 Market St, San Francisco, CA 94102, USA, in a section headed \u201cTry it yourself\u201d. It is embedded in the page and loads as you scroll down to it; it is not loaded on pages that do not contain one, and not before you reach it.",
            "When it loads, your browser connects to figma.com and transmits the data a connection requires, among them your IP address, and Figma may set cookies of their own. The legal basis is Art. 6 (1) (f) GDPR, my legitimate interest in showing the work itself rather than only screenshots of it. I have no access to this data and receive nothing back from Figma. Figma also processes it in the United States. If you would rather it were not loaded, most browsers can block third-party frames and content, and the case studies are complete without it.",
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
    handNoteTools: "and still adding to this list",
    biographyHeading: "Biography",
    biography: [
      "I grew up in Nepal surrounded by creativity, always making things, experimenting with crafts and creating personalised gifts for people around me. What I enjoyed most was not just making something visually appealing, but thinking about who it was for, what they would like and what would make it feel meaningful.",
      "That way of thinking eventually led me to design. I realised that understanding people, making thoughtful choices and shaping ideas visually were already part of how I naturally approached things.",
      "That path brought me from Nepal to Germany, where I am pursuing my bachelor’s degree in Information Technology and Design. Along the way, I have developed as a multidisciplinary designer working across UI/UX, branding, visual design and web design.",
      "For me, good design is not only about how something looks. It is about understanding who it is for and creating something useful, clear and meaningful.",
    ],
    focusHeading: "Professional focus",
    focusItems: ["UI/UX Design", "Brand Identity", "Visual Design", "Web Design", "Interaction Design"],
    toolsHeading: "Tools I use",
    toolsDesignLabel: "Design",
    toolsDesign: ["Figma", "Illustrator", "Photoshop", "Blender", "After Effects"],
    toolsDevLabel: "Development",
    toolsDev: ["HTML", "CSS", "JavaScript", "Vue.js", "Tailwind CSS"],
    toolsAiLabel: "AI & building",
    toolsAi: ["Claude Code", "Claude", "Antigravity", "ChatGPT", "Gemini"],
    aiHeading: "How I use AI",
    aiParagraphs: [
      "AI is part of my design and development process. I use it to plan projects, research topics, brainstorm ideas, explore different design directions, prototype, build interfaces and iterate quickly.",
      "I also work with AI agents and coding tools such as Claude Code and Antigravity to turn ideas into working experiences faster.",
      "The final direction and design decisions still come from me.",
    ],
    projectsHeading: "Projects",
    projectsCopy: "Selected works in UI/UX design, brand identity and web design — from initial concept to final experience.",
    linkProjects: "View projects",
    projectsNote: "this way",
    playgroundHeading: "The archive",
    playgroundCopy: "A collection of personal projects, crafts and experiments where I explore ideas, learn and try something new.",
    linkPlayground: "Open the archive",
    loveIntro: "I love",
    /*
     * The owner's own five, given verbatim (`MILESTONE-019` task 4).
     *
     * `MILESTONE-013` task 10 had picked eight subjects instead — beadwork,
     * typography, packaging, learning languages — on the reasoning that every
     * one of them was something the playground could be asked to show. The
     * owner's answer is that they are not the words they would use about
     * themselves, and that is the only test this line has to pass. It is
     * "I love ___", not a list of tags.
     *
     * Five also happens to be the length this reads best at: `LoveLine`
     * reserves the width of the longest word so the sentence never reflows, and
     * a ninth word only ever widens that reservation.
     */
    loveWords: ["designing", "creating", "painting", "learning new things", "crafting"],
    resumeHeading: "Résumé & contact",
    resumeCopy: "Interested in working together? View my résumé or send me a message.",
    resumeCta: "View résumé",
    contactCta: "Contact me",
  },
  routeLoading: "Loading page…",
  caseStudy: {
    viewCaseStudy: "View case study",
    backToProjects: "← Back to projects",
    onThisPage: "On this page",
    designQuestion: "Design question",
    moreProjects: "More projects",
    viewAllWork: "View all work",
    previousProject: "Previous",
    nextProject: "Next",
    context: "Context",
    role: "Role",
    team: "Team",
    contribution: "Contribution",
    tools: "Tools",
    needs: "Needs",
    prototypeLive: "Live prototype",
    prototypeHint: "Click, scroll and explore the main flows.",
    prototypeNote: "Click to explore the prototype",
  },
  notFound: {
    metaTitle: "Page not found · Alexsha Maharjan",
    eyebrow: "404",
    heading: "This page doesn't exist.",
    copy: "The page you're looking for may have been moved or never existed.",
    backHome: "← Back to home",
  },
};

export default en;
