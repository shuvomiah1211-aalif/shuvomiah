/** ইউনিক আইডি তৈরি (অ্যাডমিন থেকে নতুন আইটেম যোগ করার জন্য) */
export const uid = (): string =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

/** "a, b, c" -> ["a", "b", "c"] */
export const splitTags = (text: string): string[] =>
  text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

/** নাম থেকে আদ্যক্ষর (Avatar fallback) */
export const initials = (name: string): string => {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => Array.from(word)[0] ?? "")
    .join("");
  return letters || "🙂";
};
