import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultProfile } from "../data/defaultProfile";
import type { Profile } from "../types";

const STORAGE_KEY = "personal-profile-v1";

/** সেভ করা ডেটার সাথে ডিফল্ট ডেটা মার্জ করে, যাতে নতুন ফিল্ড কখনো মিস না হয় */
function mergeWithDefaults(data: Partial<Profile>): Profile {
  return {
    ...defaultProfile,
    ...data,
    personal: { ...defaultProfile.personal, ...data.personal },
    about: { ...defaultProfile.about, ...data.about },
  };
}

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return mergeWithDefaults(JSON.parse(raw) as Partial<Profile>);
  } catch (err) {
    console.warn("সেভ করা প্রোফাইল পড়া যায়নি, ডিফল্ট ব্যবহার করা হচ্ছে।", err);
  }
  return defaultProfile;
}

interface ProfileContextValue {
  profile: Profile;
  /** ইমপোর্ট/রিসেটের সময় বাড়ে — এডিটর ফর্ম রিফ্রেশ করতে ব্যবহৃত হয় */
  revision: number;
  setSection: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  resetProfile: () => void;
  importProfile: (json: string) => string | null;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [revision, setRevision] = useState(0);

  // প্রতিটি পরিবর্তন স্বয়ংক্রিয়ভাবে ব্রাউজারে সেভ হবে
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.warn("প্রোফাইল সেভ করা যায়নি।", err);
    }
  }, [profile]);

  const setSection = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }) as Profile);
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    setRevision((r) => r + 1);
  };

  const importProfile = (json: string): string | null => {
    try {
      const parsed = JSON.parse(json) as Partial<Profile>;
      if (!parsed || typeof parsed !== "object" || !parsed.personal) {
        return "ফাইলটি সঠিক প্রোফাইল ফরম্যাটে নেই।";
      }
      setProfile(mergeWithDefaults(parsed));
      setRevision((r) => r + 1);
      return null;
    } catch {
      return "JSON ফাইলটি পড়া যায়নি। ফাইলটি ঠিক আছে কিনা দেখুন।";
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profile, revision, setSection, resetProfile, importProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
