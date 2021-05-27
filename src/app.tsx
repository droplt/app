import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './helpers/auth';
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';
import apollo, { ApolloProvider } from './services/apollo';

const App = () => {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <UserPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
