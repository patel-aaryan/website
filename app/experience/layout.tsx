import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Experience",
  description:
    "Professional work experience across software engineering roles in web, AI, and full-stack development.",
});

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
