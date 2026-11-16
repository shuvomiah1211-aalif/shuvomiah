import { Heart, Languages, Target, User } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { Badge, Card, Section } from "./ui";

export default function About() {
  const { profile } = useProfile();
  const { about, languages } = profile;

  return (
    <Section id="about" title="আমার সম্পর্কে" subtitle="আমার পরিচয়, লক্ষ্য ও আগ্রহের সংক্ষিপ্ত বিবরণ" icon={User}>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-slate-900">
              <User className="h-5 w-5 text-indigo-600" /> সংক্ষিপ্ত পরিচিতি
            </h3>
            <p className="whitespace-pre-line leading-relaxed text-slate-600">{about.summary}</p>
          </Card>

          <Card>
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-slate-900">
              <Target className="h-5 w-5 text-indigo-600" /> ক্যারিয়ার লক্ষ্য
            </h3>
            <p className="whitespace-pre-line leading-relaxed text-slate-600">{about.careerObjective}</p>
          </Card>
        </div>

        <div className="space-y-6">
          {languages.length > 0 && (
            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Languages className="h-5 w-5 text-indigo-600" /> ভাষাজ্ঞান
              </h3>
              <ul className="space-y-3">
                {languages.map((lang) => (
                  <li key={lang.id}>
                    <p className="font-medium text-slate-800">{lang.name}</p>
                    <p className="text-sm text-slate-500">{lang.level}</p>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {about.interests.length > 0 && (
            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Heart className="h-5 w-5 text-rose-500" /> শখ ও আগ্রহ
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Section>
  );
}
