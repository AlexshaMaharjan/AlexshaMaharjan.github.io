/**
 * A project, as the case-study prev/next ring needs it.
 *
 * `MoreProjectsNav` is the only reader, and it uses `slug`, `name`, `tags`,
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
   *
   * All six are `"1920/1080"` since `MILESTONE-018` task 1 — the covers were
   * rebuilt in Figma as one set at 1600x900 and exported at 2x, so the grid now
   * lays out two even rows instead of six different rectangles.
   */
  imageAspect: string;
  /**
   * The project's own colour, taken from the title on its cover.
   *
   * It is the cover's accent and nothing else's: the site's `accent` token is
   * one blue for the whole site, and this is the blue/purple/red/green each
   * project is actually drawn in. `WorkGrid` paints the "View case study" tag
   * that follows the cursor in it (`MILESTONE-018` task 2), which is the same
   * rule the playground already follows — `DECISION-049` put the hover tag on a
   * collage piece in its own card's colour rather than in the site's ink.
   *
   * Written as a hex literal rather than a token because these are six
   * one-off brand colours, not a palette: nothing else on the site may use
   * them, and a token would invite exactly that.
   */
  accent: string;
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
  place?: string;
  description?: string;
  period: string;
  bullets?: string[];
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
  /**
   * `exploreCue` and `closeSelection` were here until SESSION-049. Both existed
   * only because the map answered to a pointer — one told a reader the clusters
   * had gone live, the other labelled the ✕ that released a locked one — and
   * the map does not (`process/HeroProcess`). `scrollCue` stays: it invites the
   * reader into a sequence that is still there.
   */
  process: {
    scrollCue: string;
    question: string;
    srSummary: string;
    branches: ProcessBranchCopy[];
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
    /** The blue status line under the tagline. */
    availability: string;
    backToTop: string;
    copyright: string;
  };
  /** The closing band of the playground, after the last card. */
  playgroundOutro: {
    eyebrow: string;
    heading: string;
    copy: string;
    cta: string;
  };
  /**
   * The piece viewer — what opens when a picture on a collage is clicked
   * (`SESSION-049`, owner task 9).
   *
   * Five labels and three control names. They are here rather than on the slot
   * because they are the *viewer's* chrome and do not vary by picture, which is
   * also what makes them the first thing on this page to be translated rather
   * than hard-coded: `ui/Lightbox` still says "Close", "Previous" and "Next" in
   * English on a German page, and the playground no longer goes through it.
   */
  playgroundViewer: {
    /** Row labels down the right-hand column. */
    made: string;
    tools: string;
    type: string;
    close: string;
    previous: string;
    next: string;
    /** `"3 of 14"` — `{n}` and `{total}` are substituted. */
    position: string;
    /** Names the viewer's colour filter for a screen reader. */
    collections: string;
    /** The sound toggle, which says the state it is in. */
    soundOn: string;
    soundOff: string;
    /** The link under a piece's description, when it has a Figma prototype. */
    prototypeLink: string;
  };
  /** The clickable sample of the playground, and the arrow into its button. */
  playgroundPeek: {
    /** The stack's accessible name; the button beside it says the same thing. */
    openLabel: string;
    cta: string;
    /** The hand-written note beside the button. */
    note: string;
  };
  legal: LegalCopy;
  about: {
    backToHome: string;
    eyebrow: string;
    heading: string;
    portraitAlt: string;
    handNoteOrigin: string;
    handNoteMaking: string;
    handNoteTools: string;
    biographyHeading: string;
    biography: string[];
    focusHeading: string;
    focusItems: string[];
    toolsHeading: string;
    toolsDesignLabel: string;
    toolsDesign: string[];
    toolsDevLabel: string;
    toolsDev: string[];
    toolsAiLabel: string;
    toolsAi: string[];
    aiHeading: string;
    aiParagraphs: string[];
    projectsHeading: string;
    projectsCopy: string;
    linkProjects: string;
    projectsNote: string;
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
    moreProjects: string;
    viewAllWork: string;
    previousProject: string;
    nextProject: string;
    /** The facts strip's labels, in `FactsStrip`'s own order. */
    context: string;
    role: string;
    team: string;
    contribution: string;
    tools: string;
    /** The label over a persona card's closing needs line. */
    needs: string;
    /**
     * The three labels on a `prototype` block's frame (`MILESTONE-020` task 2).
     *
     * A tester scrolled past an embedded Figma prototype believing it was one
     * more screenshot, which it had every reason to look like: the player sat
     * in the same bordered, rounded box as every `Figure` on the page, under a
     * caption in the same type. These are the words that say otherwise —
     * `prototypeLive` names the thing, `prototypeHint` says what to do with it,
     * and `prototypeNote` is the same instruction in the owner's own hand.
     *
     * **All three are instructions now** (owner, SESSION-049). The note read
     * *"this one really works"*, which is a claim about the artefact rather than
     * an invitation to the reader: it answers "is this real?", a question nobody
     * had asked, and leaves "what do I do with it?" unanswered. The owner asked
     * for the imperative instead, and the hint moved with it so the two are not
     * the same sentence twice — the note says *what* (use the website), the hint
     * says *how* (click, drag, scroll).
     */
    prototypeLive: string;
    prototypeHint: string;
    prototypeNote: string;
  };
  notFound: {
    metaTitle: string;
    eyebrow: string;
    heading: string;
    copy: string;
    backHome: string;
  };
}
