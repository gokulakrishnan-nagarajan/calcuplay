import { HashRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import GamePage from "./components/GamePage";

import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './App.scss';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage></LandingPage>
        </Route>
        <Route exact path="/game/:operation">
          <GamePage></GamePage>
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
