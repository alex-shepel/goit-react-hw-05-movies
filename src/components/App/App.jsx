import Navbar from 'components/Navbar';
import { Route, Switch } from 'react-router-dom';
import s from './App.module.css';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('pages/HomePage'));
const MoviesPage = lazy(() => import('pages/MoviesPage'));

const App = () => {
  return (
    <div className={s.app}>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/movies">
            <MoviesPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
