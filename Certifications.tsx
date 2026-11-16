import { BadgeCheck, ExternalLink } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { Card, Section, hasItems } from "./ui";

export default function Certifications() {
  const { profile } = useProfile();
  const items = profile.certifications;
  if (!hasItems(items)) return null;

  return (
    <Section id="certifications" title="সার্টিফিকেশন ও কোর্স" subtitle="পেশাগত প্রশিক্ষণ ও স্বীকৃত সনদসমূহ" icon={BadgeCheck} alt>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cert) => {
          const body = (
            <Card className="flex h-full items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold leading-snug text-slate-900">{cert.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{cert.issuer}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-emerald-600">{cert.year}</span>
                  {cert.url && <ExternalLink className="h-4 w-4 text-slate-400" />}
                </div>
              </div>
            </Card>
          );
          return cert.url ? (
            <a key={cert.id} href={cert.url} target="_blank" rel="noreferrer" className="block">
              {body}
            </a>
          ) : (
            <div key={cert.id}>{body}</div>
          );
        })}
      </div>
    </Section>
  );
}
