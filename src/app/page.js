import AppBar from "./pages/appbar";
import TaskBar from "./pages/taskbar";
import HomeApp from "./pages/homeapp";
import Wave from "react-wavify";
import { LanguageProvider } from "./context/languageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Wave at the bottom */}
        <div className="absolute bottom-0 left-0 w-full -z-10">
          <Wave fill="url(#gradient)" style={{ height: "35dvh" }} points={4} amplitude={30}>
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="10%" stopColor="#27548A" />
                <stop offset="90%" stopColor="#6cb0f8" />
              </linearGradient>
            </defs>
          </Wave>
        </div>

        {/* Foreground Content */}
        <div className="container flex">
          <AppBar />
          <HomeApp />
        </div>
        <TaskBar />
      </div>
    </LanguageProvider>
  );
}
