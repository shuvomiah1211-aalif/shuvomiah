import { Calendar, Heart, Trophy, Users } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { Card, Meta, Section, hasItems } from "./ui";

/** এক্সট্রা-কারিকুলার কার্যক্রম (ক্লাব, সংগঠন, স্বেচ্ছাসেবা) */
export function Activities() {
  const { profile } = useProfile();
  const items = profile.activities;
  if (!hasItems(items)) return null;

  return (
    <Section id="activities" title="এক্সট্রা-কারিকুলার কার্যক্রম" subtitle="ক্লাব, সংগঠন ও স্বেচ্ছাসেবামূলক কাজ" icon={Users}>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((act) => (
          <Card key={act.id} className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-900">{act.title}</h3>
              <p className="font-medium text-violet-600">{act.organization}</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {act.role && <Meta icon={Heart}>{act.role}</Meta>}
                {act.period && <Meta icon={Calendar}>{act.period}</Meta>}
              </div>
              {act.description && (
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{act.description}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/** অর্জন ও পুরস্কার */
export function Achievements() {
  const { profile } = useProfile();
  const items = profile.achievements;
  if (!hasItems(items)) return null;

  return (
    <Section id="achievements" title="অর্জন ও পুরস্কার" subtitle="স্বীকৃতি ও সাফল্যের তালিকা" icon={Trophy} alt>
      <div className="relative mx-auto grid max-w-4xl gap-5">
        {items.map((ach) => (
          <div
            key={ach.id}
            className="flex items-start gap-5 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200">
              <Trophy className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">{ach.title}</h3>
                {ach.year && <span className="text-sm font-semibold text-amber-600">{ach.year}</span>}
              </div>
              {ach.issuer && <p className="text-sm font-medium text-slate-500">{ach.issuer}</p>}
              {ach.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{ach.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
