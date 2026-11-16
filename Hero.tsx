import { ArrowDown, Globe, Mail, MapPin, Phone, Printer } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { GithubIcon, LinkedinIcon } from "./ui";
import { initials } from "../utils/helpers";

export default function Hero() {
  const { profile } = useProfile();
  const p = profile.personal;

  const socials = [
    { href: `mailto:${p.email}`, label: "ইমেইল", icon: Mail, show: !!p.email },
    { href: p.linkedin, label: "LinkedIn", icon: LinkedinIcon, show: !!p.linkedin },
    { href: p.github, label: "GitHub", icon: GithubIcon, show: !!p.github },
    { href: p.website, label: "ওয়েবসাইট", icon: Globe, show: !!p.website },
  ].filter((s) => s.show);

  return (
    <header
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white"
    >
      {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড */}
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 md:grid-cols-[1.4fr_1fr] md:pb-28 md:pt-36">
        <div className="space-y-6 text-center md:text-left">
          {p.availableForWork && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              নতুন সুযোগের জন্য প্রস্তুত
            </span>
          )}

          <div className="space-y-3">
            <p className="text-lg text-indigo-100">স্বাগতম, আমি</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {p.name}
            </h1>
            <p className="text-xl font-medium text-indigo-100 sm:text-2xl">{p.title}</p>
          </div>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-indigo-100/90 md:mx-0">
            {p.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Mail className="h-4 w-4" /> যোগাযোগ করুন
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <ArrowDown className="h-4 w-4" /> আমার কাজ দেখুন
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/25 print:hidden"
            >
              <Printer className="h-4 w-4" /> সিভি প্রিন্ট
            </button>
          </div>

          {socials.length > 0 && (
            <div className="flex justify-center gap-3 md:justify-start">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-indigo-600"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* প্রোফাইল কার্ড */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm rounded-3xl bg-white/15 p-6 shadow-2xl backdrop-blur-md ring-1 ring-white/30">
            <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white to-indigo-200 ring-4 ring-white/50 shadow-xl">
              {p.photo ? (
                <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-5xl font-extrabold text-indigo-600">
                  {initials(p.name)}
                </span>
              )}
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {p.location && (
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-indigo-200" />
                  <span>{p.location}</span>
                </li>
              )}
              {p.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-indigo-200" />
                  <span>{p.phone}</span>
                </li>
              )}
              {p.email && (
                <li className="flex items-center gap-3 break-all">
                  <Mail className="h-4 w-4 shrink-0 text-indigo-200" />
                  <span>{p.email}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
