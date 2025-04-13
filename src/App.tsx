import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Landing from "./components/Landing";
import { ThemeProvider } from "./hooks/useTheme";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Landing />
      </Router>
    </ThemeProvider>
  );
}

export default App;
