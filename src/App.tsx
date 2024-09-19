import {EuiProvider} from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"

function App() {
  return (
    <EuiProvider>
      <div className="text-red ">
     <h1>Hello world </h1>
    </div>
    </EuiProvider>
    
  );
}

export default App;
