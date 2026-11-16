import { useEffect, useState } from "react";
import { Menu, Settings, X } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { initials } from "../utils/helpers";

const NAV_ITEMS = [
  { href: "#about", label: "পরিচিতি" },
  { href: "#experience", label: "অভিজ্ঞতা" },
  { href: "#education", label: "শিক্ষা" },
  { href: "#skills", label: "দক্ষতা" },
  { href: "#projects", label: "প্রকল্প" },
  { href: "#activities", label: "কার্যক্রম" },
  { href: "#contact", label: "যোগাযোগ" },
];

export default function Navbar() {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 print:hidden transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-200">
            {initials(profile.personal.name)}
          </span>
          <span
            className={`hidden font-semibold sm:inline ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            {profile.personal.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-indigo-500/10 hover:text-indigo-600 ${
                  scrolled ? "text-slate-700" : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#/admin"
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Settings className="h-4 w-4" />
              এডিট
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`rounded-lg p-2 lg:hidden ${scrolled ? "text-slate-800" : "text-white"}`}
          aria-label="মেনু খুলুন"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <ul className="space-y-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#/admin"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 font-medium text-indigo-600 hover:bg-indigo-50"
              >
                ⚙ প্রোফাইল এডিট করুন
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
