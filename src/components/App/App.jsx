import HomePage from 'components/HomePage';
import Navbar from 'components/Navbar';
import MoviesPage from 'components/MoviesPage';
import { Route, Switch } from 'react-router-dom';
import s from './App.module.css';

const App = () => {
  return (
    <div className={s.app}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
