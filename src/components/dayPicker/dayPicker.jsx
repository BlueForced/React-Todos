import React from "react";
import DayChip from "./dayChip";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  display: flex;
  overflow-y: auto;

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ihnerit;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.grey[400]};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.grey[500]};
  }
`;

const DayPicker = ({ days, day, setDay }) => {
  return (
    <StyledBox
      sx={{
        display: "flex",
        overflowY: "auto",
      }}
    >
      {days.map((chipDay) => (
        <DayChip
          chipDay={chipDay}
          selectedDay={day}
          setDay={setDay}
          key={chipDay}
        />
      ))}
    </StyledBox>
  );
};

export default DayPicker;
