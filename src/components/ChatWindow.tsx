"use client";
import { useEffect, useState, useRef } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import { connectWebSocket } from "../websocket/socket"; // ✅ Uses WebSocket-like API for AI
import { getTheme } from "../styles/theme";
import SendIcon from "@mui/icons-material/Send";

interface Message {
  sender: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  chatId: string;
  darkMode: boolean;
}

const MAX_MESSAGES = 100; // ✅ Limit chat history

export default function ChatWindow({ chatId, darkMode }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const theme = getTheme(darkMode);
  const wsRef = useRef<WebSocket | null>(null); // ✅ Store WebSocket instance

  // ✅ Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat-${chatId}`);
    if (savedMessages) {
      try {
        const parsedMessages: Message[] = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages.slice(-MAX_MESSAGES)); // ✅ Load only last 100 messages
        }
      } catch (error) {
        console.error("Error parsing messages from localStorage:", error);
      }
    } else {
      setMessages([]); // ✅ Reset messages if no history exists
    }
  }, [chatId]);

  // ✅ Set up WebSocket-like API to receive AI responses
  useEffect(() => {
    wsRef.current = connectWebSocket((aiResponse: string) => {
      setMessages((prev) => {
        const newMessages: Message[] = [...prev, { sender: "assistant", content: aiResponse }];

        if (newMessages.length > MAX_MESSAGES) {
          newMessages.splice(0, newMessages.length - MAX_MESSAGES); // ✅ Keep only last 100 messages
        }

        localStorage.setItem(`chat-${chatId}`, JSON.stringify(newMessages)); // ✅ Save updated messages
        return newMessages;
      });

      setLoading(false);
    });

    // ❌ Removed wsRef.current.close() because it's not a real WebSocket
  }, [chatId]);

  // ✅ Handle user message sending
  const handleSend = () => {
    if (message.trim() && wsRef.current) { // ✅ Now `wsRef.current` is properly defined
      const newMessages: Message[] = [...messages, { sender: "user", content: message }];

      if (newMessages.length > MAX_MESSAGES) {
        newMessages.splice(0, newMessages.length - MAX_MESSAGES); // ✅ Keep only last 100 messages
      }

      setMessages(newMessages);
      localStorage.setItem(`chat-${chatId}`, JSON.stringify(newMessages)); // ✅ Save user message
      setMessage("");
      setLoading(true);

      // ✅ Send message to OpenAI API via WebSocket-like API
      wsRef.current.send(JSON.stringify({ message }));
    }
  };

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        backgroundColor: theme.chatBackground,
        padding: "20px",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", padding: "20px" }}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                maxWidth: "60%",
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor: msg.sender === "user" ? theme.userMessage : theme.assistantMessage,
                color: msg.sender === "user" ? theme.userText : theme.assistantText,
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {msg.content}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", padding: "10px 20px" }}>
          <CircularProgress size={20} sx={{ color: theme.userMessage }} />
        </Box>
      )}

      {/* Message Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px",
          backgroundColor: theme.inputBackground,
          borderTop: `1px solid ${theme.border}`,
          borderRadius: 5,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          multiline
          minRows={1}
          maxRows={5}
          sx={{
            borderRadius: 3,
            "& fieldset": { border: "none" },
            backgroundColor: theme.inputBackground,
            color: theme.inputText,
            overflow: "hidden",
          }}
          InputProps={{
            style: { color: theme.inputText },
          }}
        />
        <IconButton
          onClick={handleSend}
          disabled={loading || message.trim() === ""}
          sx={{
            marginLeft: "10px",
            borderRadius: "50%",
            backgroundColor: theme.userMessage,
            color: "#fff",
            "&:hover": { backgroundColor: theme.userMessageHover },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
