import "./App.css";
import AssemblyLine from "./AssemblyLine/AssemblyLine";

function App() {
  return (
    <AssemblyLine stages={["Idea", "Development", "Testing", "Deployment"]} />
  );
}

export default App;
