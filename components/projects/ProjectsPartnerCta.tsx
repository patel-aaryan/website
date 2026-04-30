"use client";

import Link from "next/link";
import { Download, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToContact } from "@/lib/scroll";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProjectsPartnerCta({ className }: Readonly<{ className?: string }>) {
  return (
    <Card
      className={cn(
        "bg-card bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[24px_24px]",
        className,
      )}
    >
      <CardContent className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="space-y-2">
            <CardTitle className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
              Looking for a technical partner?
            </CardTitle>
            <CardDescription className="text-base leading-relaxed max-w-2xl">
              I am currently available for high-complexity engineering roles and research
              collaborations in the distributed systems space.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button size="lg" onClick={scrollToContact}>
              Initialize contact
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="size-4" />
                Download resume.pdf
              </Link>
            </Button>
          </div>
        </div>

        <div
          className="relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center lg:mx-0 lg:h-36 lg:w-36"
          aria-hidden
        >
          <div className="absolute inset-0 rotate-6 rounded-lg border border-border bg-muted/40 shadow-xs" />
          <div className="absolute inset-0 -rotate-3 rounded-lg border border-border bg-background/80 shadow-xs" />
          <div className="relative flex size-full items-center justify-center rounded-lg border border-border bg-muted/30">
            <QrCode
              className="size-16 text-muted-foreground/50 sm:size-20"
              strokeWidth={1.25}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
