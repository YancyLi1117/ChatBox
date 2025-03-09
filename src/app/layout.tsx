"use client";
import { useState, useEffect, createContext } from "react";
import Sidebar from "../components/Sidebar";
import { getTheme } from "../styles/theme";
import Head from "next/head"; // ✅ Import Head for title

export const ThemeContext = createContext({ darkMode: false, toggleDarkMode: () => {} });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(savedTheme === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const theme = getTheme(darkMode);

  return (
    <html lang="en">
      <Head> {/* ✅ Adds a proper title and meta description */}
        <title>ChatBox</title>
        <meta name="description" content="A smart chat application powered by AI" />
      </Head>
      <body
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          height: "100vh",
          backgroundColor: theme.background,
          color: theme.text, 
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main
            style={{
              flexGrow: 1,
              backgroundColor: theme.chatBackground,
              transition: "background-color 0.3s ease",
            }}
          >
            {children}
          </main>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
