// ============================================================
//  ব্যক্তিগত ওয়েবসাইটের সব ডেটার টাইপ ডেফিনিশন
// ============================================================

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo: string;
  availableForWork: boolean;
}

export interface AboutInfo {
  summary: string;
  careerObjective: string;
  interests: string[];
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  result: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured: boolean;
}

export interface Activity {
  id: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface Profile {
  personal: PersonalInfo;
  about: AboutInfo;
  languages: Language[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: SkillGroup[];
  projects: Project[];
  activities: Activity[];
  achievements: Achievement[];
}

/** অ্যাডমিন ফর্মের প্রতিটি ফিল্ডের বর্ণনা */
export type FieldType = "text" | "textarea" | "tags" | "boolean" | "url";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
}
