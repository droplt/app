import { BrowserRouter, Route, Switch } from 'react-router-dom';

import apollo, { ApolloProvider } from './helpers/apollo';
import { AuthProvider } from './helpers/auth';
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={apollo}>
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
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
