import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import en from "./en";
import de from "./de";

const dictionaries: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type {
  Dictionary,
  ProjectCopy,
  ProcessBranchCopy,
  ResumeCopy,
  ResumeEducationEntry,
  ResumeProjectEntry,
  ResumeExperienceEntry,
  ResumeFurtherEntry,
  ResumeSkillGroup,
} from "./types";
