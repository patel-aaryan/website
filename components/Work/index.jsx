import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

function Work() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <Timeline className="w-full max-w-full mx-auto">
      {data.education.map((school, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot></TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {school.name}
            </Typography>
            <Typography>{school.major}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default Work;
