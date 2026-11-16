import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { GithubIcon, LinkedinIcon, Section } from "./ui";

export default function Contact() {
  const { profile } = useProfile();
  const p = profile.personal;

  const details = [
    { icon: Mail, label: "ইমেইল", value: p.email, href: `mailto:${p.email}` },
    { icon: Phone, label: "ফোন", value: p.phone, href: `tel:${p.phone.replace(/[^+\d]/g, "")}` },
    { icon: MapPin, label: "ঠিকানা", value: p.location, href: "" },
    { icon: Globe, label: "ওয়েবসাইট", value: p.website, href: p.website },
  ].filter((d) => d.value);

  return (
    <Section id="contact" title="যোগাযোগ" subtitle="নতুন প্রজেক্ট, সুযোগ বা যেকোনো আলোচনার জন্য আমাকে মেসেজ করুন" icon={MessageCircle} alt>
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {details.map((d) => {
            const content = (
              <>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <d.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-slate-400">{d.label}</p>
                  <p className="truncate font-medium text-slate-800">{d.value}</p>
                </div>
              </>
            );
            return d.href ? (
              <a
                key={d.label}
                href={d.href}
                target={d.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {content}
              </a>
            ) : (
              <div key={d.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                {content}
              </div>
            );
          })}

          <div className="flex gap-3 pt-2">
            {p.linkedin && (
              <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-indigo-600">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-indigo-600">
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-xl shadow-indigo-200 lg:col-span-3 sm:p-10">
          <h3 className="text-2xl font-bold">চলুন, একসাথে কিছু তৈরি করি!</h3>
          <p className="mt-3 leading-relaxed text-indigo-100">
            আপনার কোনো প্রজেক্ট, চাকরির সুযোগ বা পরামর্শের প্রয়োজন থাকলে সরাসরি ইমেইল করুন। সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${p.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Mail className="h-4 w-4" /> ইমেইল পাঠান
            </a>
            {p.phone && (
              <a
                href={`tel:${p.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> কল করুন
              </a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
