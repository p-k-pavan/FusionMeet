import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect, useState } from "react";
import "@elastic/eui/dist/eui_theme_dark.css"
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import { setToasts } from "./redux/slices/MeetingSlice";
import VideoConference from "./pages/VideoConference";

function App() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((meet) => meet.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setIsInitialTheme] = useState(true);
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);

  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };

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
          <Route path="/create1on1" element={<OneOnOneMeeting />} />
          <Route path="/video-conference" element={<VideoConference />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
        <EuiGlobalToastList 
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={5000}
        />
      </EuiThemeProvider>
    </EuiProvider>
    </ThemeSelector>

  );
}

export default App;
