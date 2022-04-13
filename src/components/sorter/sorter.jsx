import React from "react";
import { MenuItem, Box, TextField } from "@mui/material";
import { sorts } from "./sorterFuncs";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import NearbyErrorOutlinedIcon from "@mui/icons-material/NearbyErrorOutlined";

const MenuBox = ({ icon: Icon, children }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ mr: 1 }} />
      <Box>{children}</Box>
    </Box>
  );
};

const Sorter = ({ sortBy, setSortBy }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        select
        value={sortBy}
        label="Sort By"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <MenuItem value={sorts.dateAdded}>
          <MenuBox icon={CalendarTodayOutlinedIcon}>Date Added</MenuBox>
        </MenuItem>
        <MenuItem value={sorts.dateDue}>
          <MenuBox icon={EventOutlinedIcon}>Date Due</MenuBox>
        </MenuItem>
        <MenuItem value={sorts.importance}>
          <MenuBox icon={NearbyErrorOutlinedIcon}>Importance</MenuBox>
        </MenuItem>
      </TextField>
    </Box>
  );
};

export default Sorter;
