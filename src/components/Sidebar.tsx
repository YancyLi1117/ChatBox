"use client";
import { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, ListItemButton, Typography, Box, Divider, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete"; // ✅ Import delete icon
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useRouter, usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { getTheme } from "../styles/theme";

export default function Sidebar({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
  const [open, setOpen] = useState(true);
  const [chats, setChats] = useState<string[]>([]);
  const [hoveredChat, setHoveredChat] = useState<string | null>(null); // ✅ Track hovered chat
  const router = useRouter();
  const pathname = usePathname();
  const theme = getTheme(darkMode);

  // ✅ Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("chat-list");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  // ✅ Auto-load the most recent chat on refresh
  useEffect(() => {
    if (chats.length > 0 && pathname === "/") {
      router.replace(`/chat/${chats[chats.length - 1]}`); // ✅ Load the most recently created chat
    }
  }, [chats, pathname, router]);

  const toggleDrawer = () => setOpen(!open);

  const addChat = () => {
    const newChatId = uuidv4();
    const updatedChats = [...chats, newChatId]; // ✅ Add new chat at the end
    setChats(updatedChats);
    localStorage.setItem("chat-list", JSON.stringify(updatedChats)); // ✅ Preserve chat order
    router.push(`/chat/${newChatId}`);
  };

  // ✅ Delete a chat
  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter((id) => id !== chatId);
    setChats(updatedChats);
    localStorage.setItem("chat-list", JSON.stringify(updatedChats));

    // ✅ If deleting the active chat, redirect to another one
    if (pathname === `/chat/${chatId}` && updatedChats.length > 0) {
      router.replace(`/chat/${updatedChats[updatedChats.length - 1]}`);
    } else if (updatedChats.length === 0) {
      router.replace(`/`);
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 70,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 70,
          transition: "width 0.3s ease-in-out",
          backgroundColor: theme.sidebarBackground,
          color: theme.sidebarText,
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        {/* Title + Menu Button */}
        <ListItem disablePadding sx={{ display: "flex", alignItems: "center", padding: "10px 16px" }}>
          <Box sx={{ flexGrow: 1, ml: open ? "10px" : "0px" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: open ? "20px" : "0px",
                color: theme.sidebarText,
                transition: "opacity 0.3s ease-in-out",
                opacity: open ? 1 : 0,
              }}
            >
              ChatBox
            </Typography>
          </Box>

          <IconButton onClick={toggleDrawer} sx={{ color: theme.sidebarText }}>
            <MenuIcon />
          </IconButton>
        </ListItem>

        {/* Divider Line Under Title */}
        <Divider sx={{ backgroundColor: theme.border }} />

        {/* New Chat Button (Always Visible) */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={addChat}>
              <IconButton>
                <AddIcon sx={{ color: theme.sidebarText }} />
              </IconButton>
              {open && <ListItemText primary="New Chat" />}
            </ListItemButton>
          </ListItem>
        </List>

        {/* Chat List (Hidden When Sidebar is Shrunk) */}
        <Box sx={{ display: open ? "block" : "none", flexGrow: 1 }}> {/* ✅ Hide when collapsed */}
          <List>
            {chats.map((chatId, index) => {
              const isActive = pathname === `/chat/${chatId}`;
              return (
                <ListItem
                  disablePadding
                  key={chatId}
                  sx={{
                    height: "36px",
                    position: "relative",
                    backgroundColor: isActive
                      ? theme.userMessage // ✅ Active chat color adapts to theme
                      : hoveredChat === chatId
                      ? theme.border // ✅ Deeper color on hover
                      : "transparent",
                    boxShadow: isActive ? "0px 2px 8px rgba(0,0,0,0.15)" : "none", // ✅ Active chat shadow
                    transition: "background-color 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: theme.border, // ✅ Subtle color deepening on hover
                      boxShadow: "0px 2px 8px rgba(0,0,0,0.2)", // ✅ Hover effect
                    },
                  }}
                  onMouseEnter={() => setHoveredChat(chatId)}
                  onMouseLeave={() => setHoveredChat(null)}
                >
                  <ListItemButton
                    onClick={() => router.push(`/chat/${chatId}`)}
                    sx={{
                      py: "6px",
                      borderRadius: "8px",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: open ? "14px" : "0px",
                        opacity: open ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                        ml: "40px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: isActive ? theme.userText : theme.sidebarText,
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    >
                      {`Chat ${index + 1}`}
                    </Typography>
                  </ListItemButton>

                  {/* Delete Button (Only Appears on Hover, Stays on Right) */}
                  {hoveredChat === chatId && open && (
                    <Tooltip title="Delete Chat">
                      <IconButton
                        onClick={() => deleteChat(chatId)}
                        sx={{
                          position: "absolute",
                          right: "10px", // ✅ Delete button stays on the right
                          color: theme.sidebarText,
                          "&:hover": { color: "red" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>

      {/* Dark Mode Toggle at Bottom (Doesn't Move) */}
      <ListItem disablePadding sx={{ paddingBottom: "10px" }}>
        <ListItemButton onClick={toggleDarkMode} sx={{ justifyContent: "center" }}>
          <IconButton sx={{ color: theme.sidebarText }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {open && <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />}
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
}
