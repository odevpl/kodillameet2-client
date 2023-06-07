import "./App.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import AppointmentPanel from "./modules/AppointmentPanel";

function App() {
  return (
    <div className="App">
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <AppointmentPanel />
      </ThemeProvider>
      ;
    </div>
  );
}

export default App;
