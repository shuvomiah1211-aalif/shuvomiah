import { ExternalLink, FolderGit2, Star } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { Badge, Card, Section, hasItems } from "./ui";

export default function Projects() {
  const { profile } = useProfile();
  const items = profile.projects;
  if (!hasItems(items)) return null;

  return (
    <Section id="projects" title="প্রকল্পসমূহ" subtitle="আমার উল্লেখযোগ্য কাজের নমুনা" icon={FolderGit2}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-md shadow-indigo-200">
                <FolderGit2 className="h-6 w-6" />
              </div>
              {project.featured && (
                <Badge tone="amber">
                  <Star className="mr-1 h-3 w-3 fill-current" /> বিশেষ প্রকল্প
                </Badge>
              )}
            </div>

            <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>

            {project.tech.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                প্রকল্প দেখুন <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
