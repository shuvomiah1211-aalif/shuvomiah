import { Code2 } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { Section, hasItems } from "./ui";

const GRADIENTS = [
  "from-indigo-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-cyan-500",
];

export default function Skills() {
  const { profile } = useProfile();
  const groups = profile.skills;
  if (!hasItems(groups)) return null;

  return (
    <Section id="skills" title="দক্ষতা ও প্রযুক্তি" subtitle="যেসব প্রযুক্তি ও টুলস নিয়ে কাজ করি" icon={Code2}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, idx) => (
          <div
            key={group.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition hover:bg-white hover:shadow-lg hover:shadow-indigo-100"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className={`h-8 w-1.5 rounded-full bg-gradient-to-b ${GRADIENTS[idx % GRADIENTS.length]}`} />
              <h3 className="text-lg font-semibold text-slate-900">{group.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
