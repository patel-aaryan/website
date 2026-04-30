"use client";

import { useState, useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  orbitLabel?: string;
  date: string;
  content: string;
  tech: string[];
  icon: React.ElementType;
  status: "completed" | "in-progress" | "pending";
  energy?: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  variant?: "themed" | "dark";
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  variant = "themed",
  className,
}: Readonly<RadialOrbitalTimelineProps>) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const centerOffset = { x: 0, y: 0 };
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isDark = variant === "dark";

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (Number.parseInt(key, 10) !== id) {
          newState[Number.parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (prev[id]) {
        setAutoRotate(true);
      } else {
        setAutoRotate(false);
        centerViewOnNode(id);
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval> | undefined;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  /** Round so SSR and client produce identical inline styles (avoids hydration mismatch from float noise). */
  const roundPx = (n: number) => Math.round(n * 1000) / 1000;
  /** Match typical serialized CSS opacity precision so SSR and client strings align. */
  const roundOpacity = (n: number) =>
    Number(Math.max(0, Math.min(1, n)).toFixed(6));
  /** Stable px string: same as browser/CSS minimal form (e.g. -100 not -100.000). */
  const fmtPx = (n: number) => String(Number.parseFloat(roundPx(n).toFixed(3)));

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = roundPx(radius * Math.cos(radian) + centerOffset.x);
    const y = roundPx(radius * Math.sin(radian) + centerOffset.y);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = roundOpacity(
      Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))),
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return isDark
          ? "text-white bg-black border-white"
          : "text-primary-foreground bg-primary border-primary";
      case "in-progress":
        return isDark
          ? "text-black bg-white border-black"
          : "text-foreground bg-muted border-border";
      case "pending":
        return isDark
          ? "text-white bg-black/40 border-white/50"
          : "text-muted-foreground bg-muted/60 border-border";
      default:
        return isDark
          ? "text-white bg-black/40 border-white/50"
          : "text-muted-foreground bg-muted";
    }
  };

  const nodeRingClass = isDark ? "border-white/10" : "border-border/60";
  const nodeLabelClass = isDark
    ? expandedItems
      ? "text-white"
      : "text-white/70"
    : "text-foreground";
  const orbitNodeIdle = isDark
    ? "bg-black text-white border-white/40"
    : "bg-card text-foreground border-border";
  const orbitNodeExpanded = isDark
    ? "bg-white text-black border-white"
    : "bg-primary text-primary-foreground border-primary";
  const detailCardClass = isDark
    ? "top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10"
    : "top-20 left-1/2 -translate-x-1/2 w-[min(100vw-2rem,18rem)] bg-card/95 backdrop-blur-lg border-border shadow-lg";

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center overflow-hidden",
        isDark ? "h-screen bg-black" : "min-h-[min(70vh,560px)] rounded-2xl py-8",
        className,
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full min-h-[480px] w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div
            className={cn(
              "absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse",
              !isDark && "ring-2 ring-primary/20",
            )}
          >
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-white/20 opacity-70" />
            <div
              className="absolute h-24 w-24 animate-ping rounded-full border border-white/10 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <Briefcase className="relative h-7 w-7 text-white/90" aria-hidden />
          </div>

          <div className={cn("absolute h-96 w-96 rounded-full border", nodeRingClass)} />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            const nodeStyle: React.CSSProperties = {
              transform: `translate(${fmtPx(position.x)}px, ${fmtPx(position.y)}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            const orbitCaption = item.orbitLabel ?? item.company;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: isDark
                      ? "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)"
                      : "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                    width: `${(item.energy ?? 60) * 0.5 + 40}px`,
                    height: `${(item.energy ?? 60) * 0.5 + 40}px`,
                    left: `-${((item.energy ?? 60) * 0.5 + 40 - 40) / 2}px`,
                    top: `-${((item.energy ?? 60) * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isExpanded ? orbitNodeExpanded + " scale-150 shadow-lg" : orbitNodeIdle,
                    isExpanded && (isDark ? "shadow-white/30" : "shadow-primary/25"),
                  )}
                >
                  <Icon className="h-4 w-4" size={16} strokeWidth={1.5} />
                </div>

                <div
                  className={cn(
                    "absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300",
                    nodeLabelClass,
                    isExpanded && "scale-125",
                  )}
                >
                  {orbitCaption}
                </div>

                {isExpanded && (
                  <Card className={cn("absolute overflow-visible", detailCardClass)}>
                    <div
                      className={cn(
                        "absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2",
                        isDark ? "bg-white/50" : "bg-border",
                      )}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between gap-2">
                        <Badge className={cn("px-2 text-xs", getStatusStyles(item.status))}>
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span
                          className={cn(
                            "shrink-0 text-xs font-mono",
                            isDark ? "text-white/50" : "text-muted-foreground",
                          )}
                        >
                          {item.date}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "mt-1 text-[11px] font-mono font-semibold uppercase tracking-wide",
                          isDark ? "text-white/60" : "text-muted-foreground",
                        )}
                      >
                        {item.company}
                      </p>
                      <CardTitle
                        className={cn(
                          "mt-1 text-sm leading-snug",
                          isDark ? "text-white" : "text-card-foreground",
                        )}
                      >
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={cn(
                        "text-xs leading-relaxed",
                        isDark ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      <p>{item.content}</p>

                      {item.tech.length > 0 && (
                        <div
                          className={cn(
                            "mt-4 border-t pt-3",
                            isDark ? "border-white/10" : "border-border",
                          )}
                        >
                          <p
                            className={cn(
                              "mb-2 text-[10px] font-mono font-semibold uppercase tracking-wider",
                              isDark ? "text-white/50" : "text-muted-foreground",
                            )}
                          >
                            Tech
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.tech.map((t) => (
                              <Badge
                                key={t}
                                variant="secondary"
                                className="font-normal text-[10px]"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.energy !== undefined && (
                        <div
                          className={cn(
                            "mt-4 border-t pt-3",
                            isDark ? "border-white/10" : "border-border",
                          )}
                        >
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span
                              className={isDark ? "text-white/70" : "text-muted-foreground"}
                            >
                              Energy
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full bg-linear-to-r from-blue-500 to-purple-500"
                              style={{ width: `${item.energy}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p
        className={cn(
          "pointer-events-none mt-8 px-4 text-center text-xs",
          isDark ? "text-white/40" : "text-muted-foreground",
        )}
      >
        Click a node to see role details. Click anywhere else to resume orbit.
      </p>
    </div>
  );
}
