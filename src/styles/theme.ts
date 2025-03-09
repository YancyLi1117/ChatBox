// src/styles/theme.ts
export const lightTheme = {
  background: "#f7f8fc",
  chatBackground: "#ffffff",
  userMessage: "#007aff",
  userText: "#ffffff",
  assistantMessage: "#f1f1f1",
  assistantText: "#333",
  sidebarBackground: "#ffffff",
  sidebarText: "#000",
  inputBackground: "#f1f1f1",
  inputText: "#000",
  border: "#ddd",
  userMessageHover: "#005ecb",
  text: "#000", // ✅ Added this property for global text color
};

export const darkTheme = {
  background: "#121212",
  chatBackground: "#1e1e1e",
  userMessage: "#007aff",
  userText: "#ffffff",
  assistantMessage: "#2C2C2C",
  assistantText: "#ffffff",
  sidebarBackground: "#222",
  sidebarText: "#ffffff",
  inputBackground: "#333",
  inputText: "#ffffff",
  border: "#444",
  userMessageHover: "#005ecb",
  text: "#ffffff", // ✅ Added this property for global text color
};

export const getTheme = (darkMode: boolean) => (darkMode ? darkTheme : lightTheme);
