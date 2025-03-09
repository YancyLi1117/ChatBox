"use client";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./layout"; // ✅ Import Dark Mode Context


export default function HomePage() {
  const { darkMode } = useContext(ThemeContext); // ✅ Reads dark mode

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#ffffff", // ✅ Dark mode applies
        color: darkMode ? "#ffffff" : "#000000",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">Welcome to the Chat App</Typography>
      <Typography variant="body1" sx={{ opacity: 0.7 }}>
        Select a chat from the sidebar to start messaging.
      </Typography>
    </Box>
  );
}
