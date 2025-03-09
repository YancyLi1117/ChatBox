"use client";
import { useParams } from "next/navigation";
import ChatWindow from "../../../components/ChatWindow";
import { useContext } from "react";
import { ThemeContext } from "../../layout"; // ✅ Import Dark Mode Context
import { Box,Typography } from "@mui/material";

export default function ChatDetailPage() {
  const { chatId } = useParams();
  const { darkMode } = useContext(ThemeContext); // ✅ Reads dark mode state

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center", // ✅ Centers horizontally
        alignItems: "center", // ✅ Centers vertically (optional),
        flexDirection: "column"
       
      }}
    >
      <Box
        sx={{
          width: "90%", // ✅ Chat window width
          maxWidth: "800px", // ✅ Limits max width for better UX
          height: "95vh", // ✅ Makes it fill most of the screen height
          display: "flex",
          flexDirection: "column"
          
        
        }}
      >
        <ChatWindow chatId={chatId as string} darkMode={darkMode} />
        
      </Box>
      <Typography variant='caption'>AI can make mistakes. Check important info.</Typography>
    </Box>
  );
}
