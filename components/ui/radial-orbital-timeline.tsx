"use client";

import { useState, useEffect, useRef, useMemo, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ExperienceKind } from "@/data/types";

const INNER_ORBIT_RADIUS_DESKTOP_PX = 180;
const OUTER_ORBIT_RADIUS_DESKTOP_PX = 288;

function subscribeMaxSmOrbit(callback: () => void) {
  const mq = globalThis.matchMedia("(max-width: 639px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMaxSmOrbitSnapshot() {
  return globalThis.matchMedia("(max-width: 639px)").matches;
}

function getServerMaxSmOrbitSnapshot() {
  return false;
}

function useIsMaxSmOrbit() {
  return useSyncExternalStore(
    subscribeMaxSmOrbit,
    getMaxSmOrbitSnapshot,
    getServerMaxSmOrbitSnapshot,
  );
}

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  orbitLabel?: string;
  orbitLabelDate?: string;
  date: string;
  content: string;
  tech: string[];
  icon: React.ElementType;
  status: "completed" | "in-progress" | "pending";
  energy?: number;
  ring?: ExperienceKind;
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
  const isMaxSm = useIsMaxSmOrbit();
  const innerOrbitRadiusPx = isMaxSm
    ? Math.round(INNER_ORBIT_RADIUS_DESKTOP_PX * 0.6)
    : INNER_ORBIT_RADIUS_DESKTOP_PX;
  const outerOrbitRadiusPx = isMaxSm
    ? Math.round(OUTER_ORBIT_RADIUS_DESKTOP_PX * 0.6)
    : OUTER_ORBIT_RADIUS_DESKTOP_PX;

  const innerRingItems = useMemo(
    () => timelineData.filter((item) => (item.ring ?? "work") === "work"),
    [timelineData],
  );
  const outerRingItems = useMemo(
    () => timelineData.filter((item) => item.ring === "club" || item.ring === "dance"),
    [timelineData],
  );
  const hasOuterRing = outerRingItems.length > 0;

  const ringListForItem = (item: TimelineItem): TimelineItem[] => {
    switch (item.ring ?? "work") {
      case "work":
        return innerRingItems;
      case "club":
      case "dance":
        return outerRingItems;
      default:
        return innerRingItems;
    }
  };

  const orbitRadiusForItem = (item: TimelineItem): number => {
    switch (item.ring ?? "work") {
      case "work":
        return innerOrbitRadiusPx;
      case "club":
      case "dance":
        return outerOrbitRadiusPx;
      default:
        return innerOrbitRadiusPx;
    }
  };

  const ringIndexForItem = (item: TimelineItem) =>
    ringListForItem(item).findIndex((i) => i.id === item.id);

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

    const item = timelineData.find((i) => i.id === nodeId);
    if (!item) return;

    const ring = ringListForItem(item);
    const totalNodes = ring.length;
    if (totalNodes === 0) return;

    const nodeIndex = ring.findIndex((i) => i.id === nodeId);
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  /** Round so SSR and client produce identical inline styles (avoids hydration mismatch from float noise). */
  const roundPx = (n: number) => Math.round(n * 1000) / 1000;
  /** Match typical serialized CSS opacity precision so SSR and client strings align. */
  const roundOpacity = (n: number) => Number(Math.max(0, Math.min(1, n)).toFixed(6));
  /** Stable px string: same as browser/CSS minimal form (e.g. -100 not -100.000). */
  const fmtPx = (n: number) => String(Number.parseFloat(roundPx(n).toFixed(3)));

  const calculateNodePosition = (index: number, total: number, radiusPx: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = roundPx(radiusPx * Math.cos(radian) + centerOffset.x);
    const y = roundPx(radiusPx * Math.sin(radian) + centerOffset.y);

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
    ? "top-[5.25rem] left-1/2 max-h-[min(70dvh,24rem)] w-[min(100vw-1.25rem,16rem)] -translate-x-1/2 overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 sm:top-20 sm:w-64 sm:max-h-none"
    : "top-[5.25rem] left-1/2 max-h-[min(70dvh,24rem)] w-[min(100vw-1.25rem,18rem)] -translate-x-1/2 overflow-y-auto overscroll-contain bg-card/95 backdrop-blur-lg border-border shadow-lg sm:top-20 sm:max-h-none";

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center overflow-x-clip overflow-y-visible",
        isDark
          ? "h-screen bg-black"
          : cn(
              "rounded-2xl py-6 sm:py-8",
              hasOuterRing
                ? isMaxSm
                  ? "min-h-[400px]"
                  : "min-h-[min(74vh,680px)]"
                : isMaxSm
                  ? "min-h-[340px]"
                  : "min-h-[min(70vh,560px)]",
            ),
        className,
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div
        className={cn(
          "relative flex h-full w-full max-w-4xl items-center justify-center px-1 sm:px-0",
          hasOuterRing
            ? isMaxSm
              ? "min-h-[360px]"
              : "min-h-[min(72vh,640px)]"
            : isMaxSm
              ? "min-h-[300px]"
              : "min-h-[480px]",
        )}
      >
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {hasOuterRing && (
            <div
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed",
                isDark ? "border-white/15" : "border-primary/20",
              )}
              style={{
                width: outerOrbitRadiusPx * 2,
                height: outerOrbitRadiusPx * 2,
              }}
              aria-hidden
            />
          )}

          <div
            className={cn(
              "absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border",
              nodeRingClass,
            )}
            style={{
              width: innerOrbitRadiusPx * 2,
              height: innerOrbitRadiusPx * 2,
            }}
          />

          <div
            className={cn(
              // Same anchor as orbit nodes; above nodes (z ≈ 50–150), below expanded (z-200).
              "absolute left-1/2 top-1/2 z-160 h-14 w-14 shrink-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 shadow-md sm:h-16 sm:w-16",
              isDark
                ? "border-white/35 shadow-black/50"
                : "border-primary/30 ring-2 ring-primary/15",
            )}
          >
            <img
              src="/profile.jpg"
              alt="Aaryan Patel"
              width={256}
              height={256}
              className="pointer-events-none h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          {timelineData.map((item) => {
            const ringIdx = ringIndexForItem(item);
            const ringItems = ringListForItem(item);
            const ringLen = ringItems.length;
            const radiusPx = orbitRadiusForItem(item);
            const position = calculateNodePosition(ringIdx, Math.max(ringLen, 1), radiusPx);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            const nodeStyle: React.CSSProperties = {
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${fmtPx(position.x)}px, ${fmtPx(position.y)}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            const orbitTitle = item.orbitLabel ?? item.company;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className={cn(
                  "absolute cursor-pointer touch-manipulation",
                  // Smooth recenter when a node is open; no transition while auto-rotating (avoids drift).
                  !autoRotate && "transition-[transform,opacity] duration-700 ease-out",
                )}
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
                    "flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-10 sm:w-10 sm:min-h-10 sm:min-w-10",
                    isExpanded ? orbitNodeExpanded + " scale-150 shadow-lg" : orbitNodeIdle,
                    isExpanded && (isDark ? "shadow-white/30" : "shadow-primary/25"),
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" size={16} strokeWidth={1.5} />
                </div>

                <div
                  className={cn(
                    "absolute left-1/2 top-[3.25rem] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col items-center gap-0.5 text-center transition-all duration-300 sm:top-12 sm:max-w-none",
                    isExpanded && "scale-125",
                  )}
                >
                  <span
                    className={cn(
                      "max-w-[9.5rem] text-[10px] font-semibold leading-tight tracking-wider sm:max-w-[11rem] sm:text-xs",
                      nodeLabelClass,
                    )}
                  >
                    {orbitTitle}
                  </span>
                  {item.orbitLabelDate ? (
                    <span
                      className={cn(
                        "whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-widest",
                        isDark ? "text-white/55" : "text-muted-foreground",
                      )}
                    >
                      {item.orbitLabelDate}
                    </span>
                  ) : null}
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
    </div>
  );
}
