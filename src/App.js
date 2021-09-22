import { Route, Router, Switch, Redirect } from "react-router-dom";
import Users from "./Pages/AdminPages/users";
import Login from "./Pages/PublicPages/login";
import Registration from "./Pages/PublicPages/registration";
import PageNotFound from "./Pages/pageNotFound";
import { createBrowserHistory } from "history";
import { Card } from "react-bootstrap";
import './App.css';

const hist = createBrowserHistory();

function App() {

  let isLoggedIn = localStorage.getItem("is_login");

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "60%" }}>
        <img
          style={{ height: "100vh", width: "100%" }}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="Background"
        />
      </div>
      <div style={{ width: "40%", padding: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card style={{ border: "none" }}>
          <Card.Body>
            <Router history={hist}>
              <Switch>
                <Route path="/login" exact={true} component={Login}></Route>
                <Route
                  path="/registration"
                  exact={true}
                  component={Registration}
                ></Route>
                <Route path="/users" exact={true} component={Users}></Route>
                <Route
                  path="/page_not_found"
                  exact={true}
                  component={PageNotFound}
                />
                {isLoggedIn !== "yes" ? <Redirect to="/login" /> : <Redirect to="/page_not_found" />}
              </Switch>
            </Router>
          </Card.Body>
          <footer
            style={{ textAlign: "center", margin: "15px", color: "gray" }}
          >
            Terms of use Privacy Policy
          </footer>
        </Card>
      </div>
    </div>
  );
}

export default App;
