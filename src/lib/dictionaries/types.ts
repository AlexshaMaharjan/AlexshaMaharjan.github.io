/**
 * A project, as the case-study prev/next ring needs it.
 *
 * `NextProjectNav` is the only reader, and it uses `slug`, `name`, `tags`,
 * `image` and `imageAlt` — nothing else. `projectTag`, `placeholderLabel`,
 * `imageAspect` and `featured` were left over from the editorial homepage that
 * `DECISION-010` replaced with the bento, and were removed once that decision
 * settled the section as a category label plus a title (`ISSUE-010`).
 *
 * `headline`, `description`, `role` and `year` are **deliberately kept** though
 * nothing renders them: they are 48 authored strings across two locales, and
 * they are exactly what a `/work` index page would need (`SUGGESTION-014`).
 * Deleting authored copy to satisfy a type is the wrong trade.
 */
export interface ProjectCopy {
  slug: string;
  name: string;
  headline: string;
  description: string;
  tags: string[];
  role: string;
  year: string;
  image: string;
  imageAlt: string;
  /**
   * The cover's true aspect, e.g. `"1900/1066"`.
   *
   * Removed in SESSION-025 because nothing read it, and back in SESSION-031
   * because `WorkGrid` lays the cards out by it — the whole point of that grid
   * is that a cover is shown at its own proportions rather than cropped to a
   * tile. It must match the exported file exactly; `ui/Image` paints with
   * `object-cover`, so a mismatch is a silent crop.
   */
  imageAspect: string;
}

/**
 * One block of a legal page: a heading and its paragraphs.
 *
 * `address` marks the section that carries the postal address, which is
 * rendered from `LegalCopy.address` rather than written into `body`. There are
 * two sections across the two pages that have to state it — the Impressum's
 * §5 DDG block and the privacy page's controller block — and an address that is
 * typed twice is an address that will one day be right in one place and wrong
 * in the other. It is stated once and shown twice.
 */
export interface LegalSectionCopy {
  heading: string;
  body: string[];
  address?: boolean;
}

export interface LegalPageCopy {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSectionCopy[];
}

/**
 * The two pages German law asks a site like this one for: an Impressum
 * (§ 5 DDG) and a privacy notice (DSGVO) (`MILESTONE-013` task 9).
 *
 * **`address` is stated once and rendered twice.** The Impressum's § 5 DDG block
 * and the privacy page's controller block both have to carry it, and an address
 * typed in two places is one that will one day be right in one and wrong in the
 * other.
 *
 * It shipped as a conspicuous bracketed placeholder for one session, because an
 * address is a fact only the owner has (`DECISION-011`) and inventing one would
 * have been worse than leaving the gap visible. The owner supplied it in
 * SESSION-045.
 *
 * The URLs are `/impressum` and `/datenschutz` in **both** locales. Those are
 * the words a German visitor looks for in a footer and the words a German
 * authority looks for in a URL; translating the paths would make the English
 * side of the site harder to check compliance on, not easier.
 */
export interface LegalCopy {
  impressumNav: string;
  privacyNav: string;
  address: string[];
  impressum: LegalPageCopy;
  privacy: LegalPageCopy;
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
    /**
     * The compact mode switch's accessible name (`MILESTONE-013` task 4).
     *
     * Below `md` the switch is one control rather than two: a track with a knob
     * showing the mode you are *in*, which is how an on/off switch reads. A
     * link has to say where it goes, so what it announces is the mode it takes
     * you to, not the one it is showing.
     */
    switchToPlayground: string;
    switchToPortfolio: string;
    switchToGerman: string;
    switchToEnglish: string;
  };
  /**
   * Names for the page's landmarks. These are announced — a screen reader reads
   * "Primary, navigation" when the user jumps between regions — so leaving them
   * hard-coded meant a German visitor heard English structure round German
   * content (`ISSUE-009`). Unlike the process collage's labels, which sit inside
   * an `aria-hidden` subtree and are inert, these reach the user.
   */
  landmarks: {
    primaryNav: string;
    menu: string;
    footerNav: string;
    projectNav: string;
    processCanvas: string;
  };
  hero: {
    eyebrow: string;
    headlineLines: string[];
    intro: string;
    tags: string;
  };
  process: {
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
  };
  projects: ProjectCopy[];
  resume: ResumeCopy;
  aboutPreview: {
    eyebrow: string;
    heading: string;
    copy: string;
    copyDim: string;
    linkAbout: string;
    playgroundHeading: string;
    playgroundCopy: string;
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
  legal: LegalCopy;
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
    /* `accent` marks the one chip rendered in the accent blue (MILESTONE-010
       task 6c). It is data rather than an index check in About.tsx so the
       German list can mark a different position if it ever reorders. */
    tools: { name: string; accent?: boolean }[];
    aiBody: string;
    aiTags: string[];
    playgroundHeading: string;
    playgroundCopy: string;
    linkPlayground: string;
    loveIntro: string;
    loveWords: string[];
    resumeHeading: string;
    resumeCopy: string;
    resumeCta: string;
    contactCta: string;
  };
  routeLoading: string;
  caseStudy: {
    /** The blue tag that appears over a project cover on hover. */
    viewCaseStudy: string;
    backToProjects: string;
    onThisPage: string;
    designQuestion: string;
    previousProject: string;
    nextProject: string;
    viewAllWork: string;
    role: string;
    contribution: string;
    type: string;
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
