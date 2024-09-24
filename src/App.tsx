import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect, useState } from "react";
import "@elastic/eui/dist/eui_theme_dark.css"
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";

function App() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((meet) => meet.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setIsInitialTheme] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("fusionmeet-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("fusionmeet-theme", "light")
    }
  }, [])

  useEffect(() => {
    if (isInitialTheme) setIsInitialTheme(false);
    else {
      window.location.reload()
    }
  }, [isDarkTheme])
  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "0b5cFF" }
    }
  }
  return (
    <ThemeSelector>
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    </EuiProvider>
    </ThemeSelector>

  );
}

export default App;
