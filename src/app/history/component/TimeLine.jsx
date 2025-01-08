"use client";

import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { CalendarMonth } from "@mui/icons-material";
import { parseISO, format } from "date-fns";
import { Place } from "@mui/icons-material";

export default function TimeLine({ dataHistory }) {
  return (
    <>
      <Timeline position="alternate-reverse">
        {dataHistory?.map((historyData, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              {/* index 0 -> kanan
              index 1-> kiri */}
              <Place/>
              {historyData?.destination}
              <div className="">
                <CalendarMonth className="mr-2" />
                {format(parseISO(historyData?.created_at), "yyyy-MM-dd")}
              </div>
              <img
                src={historyData?.photo}
                className={`w-56 bg-red-300  mt-2 ${
                  index % 2 == 0 ? "float-right" : "float-left"
                }`}
              />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}
