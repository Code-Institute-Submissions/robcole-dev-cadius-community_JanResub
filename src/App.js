import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from './pages/auth/SignInForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path='/' render={() => <h1>Home Page</h1>} />
          <Route exact path='/servers' render={() => <h1>Servers</h1>} />
          <Route exact path='/tutorials' render={() => <h1>Tutorials</h1>} />
          <Route exact path='/profile' render={() => <h1>Profile</h1>} />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
