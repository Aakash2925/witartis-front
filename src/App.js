import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { ApiProvider } from "./context/GlobalState";
import { AddTask } from './components/AddTask';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div style={{ maxWidth: "80rem", margin: "4rem auto" }}>
      <ApiProvider>
        <Router>
          <Switch>
            {/* <Route exact path="/" component={() => <Home users={users} setUsers={setUsers} />} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/add" component={AddTask} />
          </Switch>
        </Router>
      </ApiProvider>
    </div>
  )
}

export default App
