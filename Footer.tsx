import { Settings } from "lucide-react";
import { useProfile } from "../context/ProfileContext";

export default function Footer() {
  const { profile } = useProfile();
  return (
    <footer className="bg-slate-900 py-8 text-slate-400 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-white">{profile.personal.name}</span>। সর্বস্বত্ব সংরক্ষিত।
        </p>
        <div className="flex items-center gap-4">
          <a href="#top" className="hover:text-white">উপরে ফিরুন ↑</a>
          <a href="#/admin" className="inline-flex items-center gap-1 hover:text-white">
            <Settings className="h-3.5 w-3.5" /> এডিট
          </a>
        </div>
      </div>
    </footer>
  );
}
