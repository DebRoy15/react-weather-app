import { Route, Switch } from "react-router-dom";
import "./App.css";
import WeatherPage from "./Pages/WeatherPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={WeatherPage} />
      </Switch>
    </div>
  );
}

export default App;
