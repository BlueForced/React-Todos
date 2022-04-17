import React from "react";
import DayChip from "./dayChip";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { DateTime } from "luxon";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowY: "auto",

  ...(!theme.isMobile && {
    "::-webkit-scrollbar": {
      height: "5px",
    },

    "::-webkit-scrollbar-track": {
      background: "ihnerit",
    },

    "::-webkit-scrollbar-thumb": {
      background: theme.palette.custom.dayPickerScroll.thumb,
      borderRadius: "5px",
    },

    "::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.custom.dayPickerScroll.hover,
    },
  }),
}));

const DayPicker = ({ days, day, setDay }) => {
  const currYear = React.useMemo(() => DateTime.now().year, []);

  return (
    <StyledBox
      sx={{
        display: "flex",
        overflowY: "auto",
        maxWidth: "100vw",
      }}
    >
      {days.map((chipDay) => (
        <DayChip
          chipDay={chipDay}
          selectedDay={day}
          setDay={setDay}
          key={chipDay}
          currentYear={currYear}
        />
      ))}
    </StyledBox>
  );
};

export default DayPicker;
