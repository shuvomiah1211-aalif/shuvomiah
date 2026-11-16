import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { Meta, Section, hasItems } from "./ui";

export default function Experience() {
  const { profile } = useProfile();
  const items = profile.experience;
  if (!hasItems(items)) return null;

  return (
    <Section id="experience" title="কর্ম-অভিজ্ঞতা" subtitle="আমার পেশাগত যাত্রা ও দায়িত্বসমূহ" icon={Briefcase} alt>
      <ol className="relative mx-auto max-w-3xl border-l-2 border-indigo-200 pl-8">
        {items.map((exp) => (
          <li key={exp.id} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[2.6rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-indigo-500">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:shadow-indigo-100">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{exp.role}</h3>
                  <p className="font-medium text-indigo-600">{exp.organization}</p>
                </div>
                <Meta icon={Calendar}>{exp.period}</Meta>
              </div>
              {exp.location && (
                <div className="mt-2">
                  <Meta icon={MapPin}>{exp.location}</Meta>
                </div>
              )}
              {exp.description && (
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-slate-600">
                  {exp.description.split("\n").filter(Boolean).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
