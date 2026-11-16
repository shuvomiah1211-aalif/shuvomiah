import { Calendar, GraduationCap, MapPin, Trophy } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { Badge, Card, Meta, Section, hasItems } from "./ui";

export default function Education() {
  const { profile } = useProfile();
  const items = profile.education;
  if (!hasItems(items)) return null;

  return (
    <Section id="education" title="শিক্ষাগত যোগ্যতা" subtitle="একাডেমিক পটভূমি ও অর্জন" icon={GraduationCap}>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((edu) => (
          <Card key={edu.id} className="flex flex-col">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{edu.degree}</h3>
            <p className="mt-1 font-medium text-indigo-600">{edu.institution}</p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {edu.period && <Meta icon={Calendar}>{edu.period}</Meta>}
              {edu.location && <Meta icon={MapPin}>{edu.location}</Meta>}
            </div>

            {edu.result && (
              <div className="mt-4">
                <Badge tone="emerald">
                  <Trophy className="mr-1.5 h-3.5 w-3.5" />
                  {edu.result}
                </Badge>
              </div>
            )}

            {edu.description && (
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{edu.description}</p>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
