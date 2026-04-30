import type { Metadata } from "next";

const site = {
  name: "Aaryan Patel",
  description:
    "Software engineer and Computer Science student at the University of Waterloo. Building things across web, AI, and mobile.",
  url: "https://www.aaryan-patel.com",
};

export function createMetadata(page?: { title?: string; description?: string }): Metadata {
  const title = page?.title ? `${page.title} | ${site.name}` : site.name;
  const description = page?.description ?? site.description;

  return {
    title,
    description,
    authors: [{ name: site.name }],
    creator: site.name,
    metadataBase: new URL(site.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
