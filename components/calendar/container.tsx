import { NextPage } from "next";
import React from "react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box } from "@chakra-ui/react";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import { current } from "../../const/date";
import { Events } from "../../models/interface";

interface Props {
  handleDateClick: (e: DateClickArg) => Promise<void>;
  handleEventClick: (e: EventClickArg) => Promise<void>;
  event: Events[];
}

const Container: NextPage<Props> = ({
  handleDateClick,
  handleEventClick,
  event,
}) => {
  return (
    <Box
      w={{ base: "95%", sm: "95%", md: "85%", lg: "80%" }}
      p="10px"
      bg="#fff"
      m="20px auto"
      border="1px solid #aaa"
      fontSize={{ base: "6px", sm: "10px", md: "12px", lg: "18px" }}
      lineHeight={{ base: "6px", sm: "8px", md: "10px", lg: "14px" }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="ja"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={event}
        headerToolbar={{
          left: "prev next",
          center: "title",
          right: "today",
        }}
        contentHeight="auto"
        dayCellClassNames={"cell"}
        dayHeaderClassNames={"event"}
        initialDate={`${current.year}-${("0" + current.month).slice(-2)}`}
      />
    </Box>
  );
};

export default Container;
