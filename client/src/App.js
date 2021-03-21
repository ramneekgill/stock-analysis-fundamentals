import { Route, Redirect, Switch } from "react-router-dom";
import SearchPage from './Components/SearchPage'
import CompanyAnalysis from './Components/CompanyAnalysis'

function App() {
  return (
    <main className="container">
      <Switch>
        <Route exact path="/about">
          <CompanyAnalysis />
        </Route>
        <Route exact path="/search">
          <SearchPage />
        </Route>
        <Redirect exact from="/" to="/search" />
      </Switch>
    </main>
  );
}

export default App;

