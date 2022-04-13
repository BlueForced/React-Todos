import React from "react";
import { Chip, Typography } from "@mui/material";
import { DateTime } from "luxon";
import ReactDOM from "react-dom";

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

export default DayChip;
