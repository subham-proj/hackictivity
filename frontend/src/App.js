import "./App.css";
import { Switch, Route } from "react-router-dom";

import Login from "./Screens/LoginScreen.js";
import Register from "./Screens/RegisterScreen.js";
import Header from "./Components/Header";
import HomeScreen from "./Screens/HomeScreen";
import AdminPanel from "./Screens/AdminPanel";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/adminPanel" component={AdminPanel} />
        <Route exact path="/" component={HomeScreen} />
      </Switch>
    </div>
  );
}

export default App;
