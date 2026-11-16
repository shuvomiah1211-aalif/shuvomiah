import type { Profile } from "../types";

/**
 * ডিফল্ট প্রোফাইল ডেটা।
 * ওয়েবসাইটের সব লেখা এখান থেকেই আসে। সরাসরি এখানে পরিবর্তন করতে পারেন,
 * অথবা ওয়েবসাইটের "/#/admin" পেজ থেকে সহজে এডিট করতে পারেন।
 */
export const defaultProfile: Profile = {
  personal: {
    name: "আপনার নাম",
    title: "সফটওয়্যার ইঞ্জিনিয়ার | ওয়েব ডেভেলপার",
    tagline:
      "মানুষের জীবনকে সহজ করে এমন কার্যকর ও সুন্দর ডিজিটাল সমাধান তৈরি করাই আমার লক্ষ্য।",
    email: "you@example.com",
    phone: "+880 1XXX-XXXXXX",
    location: "ঢাকা, বাংলাদেশ",
    website: "https://example.com",
    linkedin: "https://linkedin.com/in/yourname",
    github: "https://github.com/yourname",
    photo: "",
    availableForWork: true,
  },

  about: {
    summary:
      "আমি একজন উৎসাহী সফটওয়্যার ইঞ্জিনিয়ার, যার রয়েছে ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট, ডেটাবেস ডিজাইন ও ইউজার-ফ্রেন্ডলি ইন্টারফেস তৈরির বাস্তব অভিজ্ঞতা। নতুন প্রযুক্তি শেখা ও সমস্যার সৃজনশীল সমাধান খুঁজে বের করা আমার সবচেয়ে বড় আনন্দ।",
    careerObjective:
      "একটি উদ্ভাবনী ও সহযোগিতামূলক প্রতিষ্ঠানে কাজ করে নিজের দক্ষতাকে কাজে লাগিয়ে প্রযুক্তির মাধ্যমে বাস্তব সমস্যার সমাধান করতে চাই এবং ক্রমাগত নিজেকে উন্নত করতে চাই।",
    interests: ["প্রোগ্রামিং", "ওপেন-সোর্স", "বই পড়া", "ফটোগ্রাফি", "ভ্রমণ", "ফুটবল"],
  },

  languages: [
    { id: "lang-1", name: "বাংলা", level: "মাতৃভাষা" },
    { id: "lang-2", name: "ইংরেজি", level: "পেশাগত দক্ষতা (লিখন ও বলা)" },
  ],

  experience: [
    {
      id: "exp-1",
      role: "সিনিয়র ওয়েব ডেভেলপার",
      organization: "উদাহরণ টেক লিমিটেড",
      location: "ঢাকা, বাংলাদেশ",
      period: "জানুয়ারি ২০২৩ – বর্তমান",
      description:
        "React ও Node.js দিয়ে একাধিক ওয়েব অ্যাপ্লিকেশন ডেভেলপ ও মেইনটেইন করা।\nটিম লিডারদের সাথে প্রজেক্ট পরিকল্পনা ও কোড রিভিউ পরিচালনা।\nAPI পারফরম্যান্স ৪০% পর্যন্ত উন্নত করা।",
    },
    {
      id: "exp-2",
      role: "জুনিয়র সফটওয়্যার ডেভেলপার",
      organization: "উদাহরণ সফটওয়্যার হাউস",
      location: "ঢাকা, বাংলাদেশ",
      period: "জুলাই ২০২০ – ডিসেম্বর ২০২২",
      description:
        "ক্লায়েন্ট প্রজেক্টের জন্য ফ্রন্ট-এন্ড কম্পোনেন্ট তৈরি।\nডাটাবেস স্কিমা ডিজাইন ও মাইগ্রেশনে সহায়তা।",
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "বিএসসি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
      institution: "উদাহরণ বিশ্ববিদ্যালয়",
      location: "ঢাকা, বাংলাদেশ",
      period: "২০১৬ – ২০২০",
      result: "CGPA: 3.75 / 4.00",
      description: "অভিসন্দর্ভ: মেশিন লার্নিং ভিত্তিক রোগ নির্ণয় ব্যবস্থা।",
    },
    {
      id: "edu-2",
      degree: "উচ্চমাধ্যমিক (HSC) – বিজ্ঞান বিভাগ",
      institution: "উদাহরণ সরকারি কলেজ",
      location: "ঢাকা, বাংলাদেশ",
      period: "২০১৪ – ২০১৬",
      result: "GPA: 5.00 / 5.00",
      description: "",
    },
    {
      id: "edu-3",
      degree: "মাধ্যমিক (SSC) – বিজ্ঞান বিভাগ",
      institution: "উদাহরণ উচ্চ বিদ্যালয়",
      location: "কুমিল্লা, বাংলাদেশ",
      period: "২০০৯ – ২০১৪",
      result: "GPA: 5.00 / 5.00",
      description: "",
    },
  ],

  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "২০২৪",
      url: "https://aws.amazon.com/certification/",
    },
    {
      id: "cert-2",
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Coursera / Meta",
      year: "২০২২",
      url: "https://www.coursera.org/",
    },
  ],

  skills: [
    {
      id: "skill-1",
      category: "ফ্রন্ট-এন্ড",
      items: ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      id: "skill-2",
      category: "ব্যাক-এন্ড",
      items: ["Node.js", "Express", "PostgreSQL", "REST API", "Authentication"],
    },
    {
      id: "skill-3",
      category: "টুলস ও অন্যান্য",
      items: ["Git & GitHub", "Docker", "Linux", "Figma", "Problem Solving"],
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "ই-কমার্স ড্যাশবোর্ড",
      description:
        "পণ্য, অর্ডার ও স্টক ম্যানেজমেন্টের জন্য একটি রেসপন্সিভ অ্যাডমিন ড্যাশবোর্ড। রিয়েল-টাইম রিপোর্ট ও ভূমিকাভিত্তিক অ্যাক্সেস কন্ট্রোল রয়েছে।",
      tech: ["React", "Node.js", "PostgreSQL"],
      link: "https://github.com/yourname",
      featured: true,
    },
    {
      id: "proj-2",
      title: "টাস্ক ম্যানেজমেন্ট অ্যাপ",
      description:
        "ছোট টিমের জন্য প্রজেক্ট ও টাস্ক ট্র্যাক করার ওয়েব অ্যাপ। ড্র্যাগ-অ্যান্ড-ড্রপ বোর্ড ও নোটিফিকেশন সিস্টেম আছে।",
      tech: ["TypeScript", "React", "Firebase"],
      link: "https://github.com/yourname",
      featured: false,
    },
    {
      id: "proj-3",
      title: "স্বাস্থ্য তথ্য অ্যাপ",
      description:
        "রোগীর তথ্য ও অ্যাপয়েন্টমেন্ট ম্যানেজ করার মোবাইল-ফ্রেন্ডলি ওয়েব অ্যাপ্লিকেশন।",
      tech: ["Vue.js", "Express", "MongoDB"],
      link: "",
      featured: false,
    },
  ],

  activities: [
    {
      id: "act-1",
      title: "সভাপতি",
      organization: "উদাহরণ প্রোগ্রামিং ক্লাব",
      role: "নেতৃত্ব ও আয়োজন",
      period: "২০১৮ – ২০১৯",
      description:
        "ক্যাম্পাসে সপ্তাহিক কোডিং ওয়ার্কশপ ও আন্তঃবিশ্ববিদ্যালয় হ্যাকাথন আয়োজন করা।",
    },
    {
      id: "act-2",
      title: "স্বেচ্ছাসেবক",
      organization: "উদাহরণ রক্তদান সংগঠন",
      role: "সদস্য",
      period: "২০১৫ – বর্তমান",
      description: "রক্তদান ক্যাম্পেইন ও দুর্যোগকালীন ত্রাণ বিতরণে অংশগ্রহণ।",
    },
  ],

  achievements: [
    {
      id: "ach-1",
      title: "জাতীয় পর্যায়ে প্রোগ্রামিং কনটেস্ট – রানার্স-আপ",
      issuer: "জাতীয় আইসিটি প্রতিযোগিতা",
      year: "২০১৯",
      description: "৪০০+ দলের মধ্যে ২য় স্থান অর্জন।",
    },
    {
      id: "ach-2",
      title: "ডিন'স অ্যাওয়ার্ড",
      issuer: "উদাহরণ বিশ্ববিদ্যালয়",
      year: "২০১৮",
      description: "একাডেমিক ও সহ-শিক্ষা কার্যক্রমে ভালো অবদানের জন্য।",
    },
  ],
};
