import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Education",
  description:
    "Academic journey and achievements at the University of Waterloo studying Computer Science.",
});

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
