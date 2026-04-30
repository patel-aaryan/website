import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Projects",
  description: "A collection of projects spanning web development, AI, mobile apps, and more.",
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
