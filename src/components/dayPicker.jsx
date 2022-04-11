import React from "react";
import { Chip, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { DateTime } from "luxon";
import ReactDOM from "react-dom";

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

const DayChip = ({ selectedDay, chipDay, setDay }) => {
  const chipRef = React.useRef();
  const day = React.useMemo(
    () => "'" + DateTime.fromISO(chipDay).toLocal().toFormat("yy LLL dd"),
    [chipDay]
  );

  React.useLayoutEffect(() => {
    if (selectedDay === chipDay) {
      const node = ReactDOM.findDOMNode(chipRef.current);
      node.scrollIntoView({ inline: "center", behavior: "smooth" });
    }
  }, [selectedDay, chipDay]);

  return (
    <Chip
      ref={chipRef}
      sx={{ m: 1 }}
      label={<Typography variant="body2">{day}</Typography>}
      onClick={() => setDay(chipDay)}
      clickable={selectedDay !== chipDay}
      color="primary"
      variant={selectedDay === chipDay ? "filled" : "outlined"}
    />
  );
};

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
