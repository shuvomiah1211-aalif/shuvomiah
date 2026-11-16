import { useRef, useState, type ReactNode } from "react";
import {
  Award,
  BadgeCheck,
  Briefcase,
  Code2,
  Download,
  Eye,
  FolderGit2,
  GraduationCap,
  Info,
  Languages,
  RotateCcw,
  Trophy,
  Upload,
  User,
  Users,
} from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { ListEditor, ObjectEditor } from "../components/admin/Editors";
import type {
  Achievement,
  Activity,
  Certification,
  Education,
  Experience,
  FieldDef,
  Language,
  Project,
  SkillGroup,
} from "../types";
import { uid } from "../utils/helpers";

/* ================= ফিল্ড ডেফিনিশন ================= */

const PERSONAL_FIELDS: FieldDef[] = [
  { key: "name", label: "পূর্ণ নাম", type: "text", placeholder: "আপনার পূর্ণ নাম" },
  { key: "title", label: "পেশাগত পরিচয় (শিরোনাম)", type: "text", placeholder: "যেমন: সফটওয়্যার ইঞ্জিনিয়ার" },
  { key: "tagline", label: "ছোট ট্যাগলাইন", type: "textarea", placeholder: "এক-দুই লাইনে নিজের সম্পর্কে লিখুন" },
  { key: "email", label: "ইমেইল", type: "text", placeholder: "you@example.com" },
  { key: "phone", label: "ফোন নম্বর", type: "text", placeholder: "+880 1XXX-XXXXXX" },
  { key: "location", label: "বর্তমান অবস্থান", type: "text", placeholder: "শহর, দেশ" },
  { key: "website", label: "ব্যক্তিগত ওয়েবসাইট", type: "url", placeholder: "https://..." },
  { key: "linkedin", label: "LinkedIn লিংক", type: "url", placeholder: "https://linkedin.com/in/..." },
  { key: "github", label: "GitHub লিংক", type: "url", placeholder: "https://github.com/..." },
  {
    key: "photo",
    label: "প্রোফাইল ছবির URL",
    type: "url",
    placeholder: "https://...jpg",
    hint: "খালি রাখলে নামের আদ্যক্ষর দেখানো হবে।",
  },
  { key: "availableForWork", label: "নতুন সুযোগের জন্য উপলব্ধ (ব্যাজ দেখাবে)", type: "boolean" },
];

const ABOUT_FIELDS: FieldDef[] = [
  { key: "summary", label: "সংক্ষিপ্ত পরিচিতি", type: "textarea", placeholder: "নিজের সম্পর্কে বিস্তারিত লিখুন" },
  { key: "careerObjective", label: "ক্যারিয়ার অবজেক্টিভ", type: "textarea", placeholder: "আপনার লক্ষ্য" },
  {
    key: "interests",
    label: "শখ ও আগ্রহ",
    type: "tags",
    placeholder: "প্রোগ্রামিং, বই পড়া, ভ্রমণ",
    hint: "কমা (,) দিয়ে আলাদা করুন।",
  },
];

const LANGUAGE_FIELDS: FieldDef[] = [
  { key: "name", label: "ভাষা", type: "text", placeholder: "ইংরেজি" },
  { key: "level", label: "দক্ষতার স্তর", type: "text", placeholder: "IELTS 7.0 / পেশাগত" },
];

const EXPERIENCE_FIELDS: FieldDef[] = [
  { key: "role", label: "পদবি", type: "text", placeholder: "সিনিয়র ডেভেলপার" },
  { key: "organization", label: "প্রতিষ্ঠান", type: "text", placeholder: "কোম্পানির নাম" },
  { key: "location", label: "স্থান", type: "text", placeholder: "ঢাকা, বাংলাদেশ" },
  { key: "period", label: "সময়কাল", type: "text", placeholder: "জানুয়ারি ২০২৩ – বর্তমান" },
  {
    key: "description",
    label: "দায়িত্ব ও অর্জন",
    type: "textarea",
    placeholder: "প্রতি লাইনে একটি পয়েন্ট লিখুন",
    hint: "প্রতি নতুন লাইন একটি আলাদা বুলেট পয়েন্ট হিসেবে দেখাবে।",
  },
];

const EDUCATION_FIELDS: FieldDef[] = [
  { key: "degree", label: "ডিগ্রি / পরীক্ষা", type: "text", placeholder: "বিএসসি ইন সিএসই" },
  { key: "institution", label: "প্রতিষ্ঠান", type: "text", placeholder: "বিশ্ববিদ্যালয়ের নাম" },
  { key: "location", label: "স্থান", type: "text", placeholder: "শহর, দেশ" },
  { key: "period", label: "সময়কাল", type: "text", placeholder: "২০১৬ – ২০২০" },
  { key: "result", label: "ফলাফল (GPA/CGPA/বিভাগ)", type: "text", placeholder: "CGPA: 3.75 / 4.00" },
  { key: "description", label: "অতিরিক্ত তথ্য (ঐচ্ছিক)", type: "textarea", placeholder: "থিসিস, বিশেষ কোর্স ইত্যাদি" },
];

const CERTIFICATION_FIELDS: FieldDef[] = [
  { key: "title", label: "সার্টিফিকেটের নাম", type: "text", placeholder: "AWS Certified ..." },
  { key: "issuer", label: "প্রদানকারী প্রতিষ্ঠান", type: "text", placeholder: "Coursera, Google ..." },
  { key: "year", label: "সাল", type: "text", placeholder: "২০২৪" },
  { key: "url", label: "সার্টিফিকেট লিংক (ঐচ্ছিক)", type: "url", placeholder: "https://..." },
];

const SKILL_FIELDS: FieldDef[] = [
  { key: "category", label: "দক্ষতার ক্যাটাগরি", type: "text", placeholder: "ফ্রন্ট-এন্ড" },
  {
    key: "items",
    label: "দক্ষতাসমূহ",
    type: "tags",
    placeholder: "React, TypeScript, CSS",
    hint: "কমা (,) দিয়ে আলাদা করুন।",
  },
];

const PROJECT_FIELDS: FieldDef[] = [
  { key: "title", label: "প্রকল্পের নাম", type: "text", placeholder: "প্রকল্পের নাম" },
  { key: "description", label: "বিবরণ", type: "textarea", placeholder: "প্রকল্প সম্পর্কে সংক্ষেপে লিখুন" },
  { key: "tech", label: "ব্যবহৃত প্রযুক্তি", type: "tags", placeholder: "React, Node.js" },
  { key: "link", label: "লিংক (GitHub/Live)", type: "url", placeholder: "https://..." },
  { key: "featured", label: "বিশেষ প্রকল্প হিসেবে দেখাও", type: "boolean" },
];

const ACTIVITY_FIELDS: FieldDef[] = [
  { key: "title", label: "পদ / কার্যক্রম", type: "text", placeholder: "সাধারণ সম্পাদক" },
  { key: "organization", label: "ক্লাব / সংগঠন", type: "text", placeholder: "সংগঠনের নাম" },
  { key: "role", label: "দায়িত্ব", type: "text", placeholder: "নেতৃত্ব ও আয়োজন" },
  { key: "period", label: "সময়কাল", type: "text", placeholder: "২০১৮ – ২০১৯" },
  { key: "description", label: "বিবরণ", type: "textarea", placeholder: "কী কাজ করেছেন" },
];

const ACHIEVEMENT_FIELDS: FieldDef[] = [
  { key: "title", label: "পুরস্কার / অর্জন", type: "text", placeholder: "প্রথম স্থান" },
  { key: "issuer", label: "প্রদানকারী", type: "text", placeholder: "প্রতিষ্ঠানের নাম" },
  { key: "year", label: "সাল", type: "text", placeholder: "২০২৪" },
  { key: "description", label: "বিবরণ (ঐচ্ছিক)", type: "textarea", placeholder: "সংক্ষিপ্ত বিবরণ" },
];

/* ================= ট্যাব কনফিগারেশন ================= */

type TabKey =
  | "personal"
  | "about"
  | "languages"
  | "experience"
  | "education"
  | "certifications"
  | "skills"
  | "projects"
  | "activities"
  | "achievements";

const TABS: { key: TabKey; label: string; icon: typeof User }[] = [
  { key: "personal", label: "ব্যক্তিগত তথ্য", icon: User },
  { key: "about", label: "আমার সম্পর্কে", icon: Info },
  { key: "languages", label: "ভাষাজ্ঞান", icon: Languages },
  { key: "experience", label: "কর্ম-অভিজ্ঞতা", icon: Briefcase },
  { key: "education", label: "শিক্ষাগত যোগ্যতা", icon: GraduationCap },
  { key: "certifications", label: "সার্টিফিকেশন", icon: BadgeCheck },
  { key: "skills", label: "দক্ষতা", icon: Code2 },
  { key: "projects", label: "প্রকল্পসমূহ", icon: FolderGit2 },
  { key: "activities", label: "এক্সট্রা-কারিকুলার", icon: Users },
  { key: "achievements", label: "অর্জন ও পুরস্কার", icon: Trophy },
];

/* ================= অ্যাডমিন পেজ ================= */

export default function Admin() {
  const { profile, revision, setSection, resetProfile, importProfile } = useProfile();
  const [tab, setTab] = useState<TabKey>("personal");
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const flash = (type: "ok" | "err", text: string) => {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 4000);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    flash("ok", "প্রোফাইল ফাইল ডাউনলোড হয়েছে।");
  };

  const handleImport = async (file: File) => {
    const text = await file.text();
    const error = importProfile(text);
    if (error) flash("err", error);
    else flash("ok", "প্রোফাইল সফলভাবে ইমপোর্ট হয়েছে।");
  };

  const handleReset = () => {
    if (!window.confirm("সব পরিবর্তন মুছে ডিফল্ট ডেটায় ফিরে যেতে চান?")) return;
    resetProfile();
    flash("ok", "ডিফল্ট ডেটায় ফিরে যাওয়া হয়েছে।");
  };

  const renderEditor = (): ReactNode => {
    switch (tab) {
      case "personal":
        return (
          <ObjectEditor
            fields={PERSONAL_FIELDS}
            value={profile.personal}
            onChange={(v) => setSection("personal", v)}
          />
        );
      case "about":
        return (
          <ObjectEditor
            fields={ABOUT_FIELDS}
            value={profile.about}
            onChange={(v) => setSection("about", v)}
          />
        );
      case "languages":
        return (
          <ListEditor<Language>
            items={profile.languages}
            fields={LANGUAGE_FIELDS}
            addLabel="ভাষা যোগ করুন"
            createItem={() => ({ id: uid(), name: "", level: "" })}
            onChange={(v) => setSection("languages", v)}
          />
        );
      case "experience":
        return (
          <ListEditor<Experience>
            items={profile.experience}
            fields={EXPERIENCE_FIELDS}
            addLabel="নতুন অভিজ্ঞতা যোগ করুন"
            createItem={() => ({
              id: uid(),
              role: "",
              organization: "",
              location: "",
              period: "",
              description: "",
            })}
            onChange={(v) => setSection("experience", v)}
          />
        );
      case "education":
        return (
          <ListEditor<Education>
            items={profile.education}
            fields={EDUCATION_FIELDS}
            addLabel="নতুন শিক্ষাগত যোগ্যতা যোগ করুন"
            createItem={() => ({
              id: uid(),
              degree: "",
              institution: "",
              location: "",
              period: "",
              result: "",
              description: "",
            })}
            onChange={(v) => setSection("education", v)}
          />
        );
      case "certifications":
        return (
          <ListEditor<Certification>
            items={profile.certifications}
            fields={CERTIFICATION_FIELDS}
            addLabel="নতুন সার্টিফিকেট যোগ করুন"
            createItem={() => ({ id: uid(), title: "", issuer: "", year: "", url: "" })}
            onChange={(v) => setSection("certifications", v)}
          />
        );
      case "skills":
        return (
          <ListEditor<SkillGroup>
            items={profile.skills}
            fields={SKILL_FIELDS}
            addLabel="নতুন দক্ষতা-গ্রুপ যোগ করুন"
            createItem={() => ({ id: uid(), category: "", items: [] })}
            onChange={(v) => setSection("skills", v)}
          />
        );
      case "projects":
        return (
          <ListEditor<Project>
            items={profile.projects}
            fields={PROJECT_FIELDS}
            addLabel="নতুন প্রকল্প যোগ করুন"
            createItem={() => ({
              id: uid(),
              title: "",
              description: "",
              tech: [],
              link: "",
              featured: false,
            })}
            onChange={(v) => setSection("projects", v)}
          />
        );
      case "activities":
        return (
          <ListEditor<Activity>
            items={profile.activities}
            fields={ACTIVITY_FIELDS}
            addLabel="নতুন কার্যক্রম যোগ করুন"
            createItem={() => ({
              id: uid(),
              title: "",
              organization: "",
              role: "",
              period: "",
              description: "",
            })}
            onChange={(v) => setSection("activities", v)}
          />
        );
      case "achievements":
        return (
          <ListEditor<Achievement>
            items={profile.achievements}
            fields={ACHIEVEMENT_FIELDS}
            addLabel="নতুন অর্জন যোগ করুন"
            createItem={() => ({ id: uid(), title: "", issuer: "", year: "", description: "" })}
            onChange={(v) => setSection("achievements", v)}
          />
        );
    }
  };

  const activeTab = TABS.find((t) => t.key === tab)!;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* টপ বার */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold leading-tight">প্রোফাইল এডিটর</h1>
              <p className="text-xs text-slate-500">পরিবর্তনগুলো স্বয়ংক্রিয়ভাবে সেভ হয়</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Eye className="h-4 w-4" /> ওয়েবসাইট দেখুন
            </a>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" /> এক্সপোর্ট
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Upload className="h-4 w-4" /> ইমপোর্ট
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleImport(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              <RotateCcw className="h-4 w-4" /> রিসেট
            </button>
          </div>
        </div>
      </header>

      {notice && (
        <div
          className={`mx-auto mt-4 max-w-7xl rounded-xl px-4 py-3 text-sm font-medium sm:mx-6 ${
            notice.type === "ok"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {notice.text}
        </div>
      )}

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr]">
        {/* সাইডবার ট্যাব */}
        <aside>
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible lg:pb-0">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* মূল এডিটর */}
        <main className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <activeTab.icon className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold">{activeTab.label}</h2>
          </div>
          {/* revision পরিবর্তনে ফর্ম রিমাউন্ট হবে (ইমপোর্ট/রিসেটের পর সঠিক ডেটা দেখাতে) */}
          <div key={revision}>{renderEditor()}</div>
        </main>
      </div>
    </div>
  );
}
