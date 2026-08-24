export interface ProjectCopy {
  slug: string;
  projectTag: string;
  name: string;
  headline: string;
  description: string;
  tags: string[];
  role: string;
  year: string;
  image: string;
  placeholderLabel: string;
  imageAlt: string;
  imageAspect: string;
  featured: boolean;
}

export interface ProcessBranchCopy {
  number: string;
  title: string;
  question: string;
  ariaLabel: string;
}

export interface ResumeEducationEntry {
  degree: string;
  period: string;
  place: string;
  detail?: string;
}

export interface ResumeProjectEntry {
  name: string;
  period: string;
  place: string;
  bullets: string[];
}

export interface ResumeExperienceEntry {
  role: string;
  period: string;
  place: string;
  bullets: string[];
}

export interface ResumeFurtherEntry {
  title: string;
  place: string;
  description: string;
  period: string;
}

export interface ResumeSkillGroup {
  label: string;
  value: string;
}

export interface ResumeCopy {
  metaTitle: string;
  name: string;
  tagline: string;
  location: string;
  email: string;
  portfolio: string;
  portfolioHref: string;
  linkedin: string;
  linkedinHref: string;
  backToAbout: string;
  profileHeading: string;
  profileBody: string;
  educationHeading: string;
  education: ResumeEducationEntry[];
  projectsHeading: string;
  projects: ResumeProjectEntry[];
  experienceHeading: string;
  experience: ResumeExperienceEntry[];
  furtherHeading: string;
  further: ResumeFurtherEntry[];
  skillsHeading: string;
  skills: ResumeSkillGroup[];
  printCta: string;
}

export interface BentoTile {
  /** Case study this tile links to. */
  slug: string;
  /** Label above the title, e.g. "Brand & UI/UX". */
  category: string;
  title: string;
  /** CSS `grid-area`, and the title size that suits the tile's box. */
  gridArea: string;
  fontSize: string;
  /** Optional real image; without it the tile stays flat grey. */
  src?: string;
  alt?: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    portfolio: string;
    playground: string;
    projects: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
    modeSwitchLabel: string;
    switchToGerman: string;
    switchToEnglish: string;
  };
  hero: {
    eyebrow: string;
    headlineLines: string[];
    intro: string;
    tags: string;
  };
  process: {
    label: string;
    scrollCue: string;
    question: string;
    srSummary: string;
    branches: ProcessBranchCopy[];
    closeSelection: string;
  };
  selectedWork: {
    eyebrow: string;
    heading: string;
    copy: string;
    viewCaseStudy: string;
    projectLabel: string;
    /**
     * The bento tiles, in grid order. Kept here rather than in the component so
     * the German homepage is not English (ISSUE-005), and so an image is a data
     * edit (ISSUE-004, DECISION-010). `slug` links the tile to its case study;
     * several projects deliberately appear more than once.
     */
    bento: BentoTile[];
  };
  projects: ProjectCopy[];
  resume: ResumeCopy;
  aboutPreview: {
    annotations: string[];
    eyebrow: string;
    heading: string;
    copy: string;
    linkAbout: string;
    linkPlayground: string;
    portraitAlt: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    copy: string;
    resumeCta: string;
    contactCta: string;
  };
  footer: {
    tagline: string;
    email: string;
    linkedin: string;
    linkedinHref: string;
    resume: string;
    backToTop: string;
    copyright: string;
  };
  playgroundNav: {
    backToPlayground: string;
    allCategories: string;
    experimentEyebrow: string;
  };
  about: {
    backToHome: string;
    eyebrow: string;
    heading: string;
    portraitAlt: string;
    handNoteOrigin: string;
    handNoteMaking: string;
    portraitTags: string[];
    biographyHeading: string;
    biography: string[];
    focusHeading: string;
    focusItems: string[];
    toolsHeading: string;
    tools: string[];
    aiLabel: string;
    aiBody: string;
    aiTags: string[];
    resumeLink: string;
    resumeCaption: string;
    carouselHeading: string;
    carouselItems: { alt: string; caption: string; src?: string }[];
    loveIntro: string;
    loveWords: string[];
    resumeHeading: string;
    resumeCopy: string;
    resumeCta: string;
    contactCta: string;
  };
  routeLoading: string;
  caseStudy: {
    backToProjects: string;
    onThisPage: string;
    designQuestion: string;
    previousProject: string;
    nextProject: string;
    viewAllWork: string;
    role: string;
    contribution: string;
    type: string;
    year: string;
    tools: string;
    deliverables: string;
  };
  notFound: {
    metaTitle: string;
    eyebrow: string;
    heading: string;
    copy: string;
    backHome: string;
  };
}
