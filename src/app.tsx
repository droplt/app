import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApolloWrapper } from './helpers/apollo';
import { AuthWrapper } from './helpers/auth';
import { FirebaseWrapper } from './helpers/firebase';
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <FirebaseWrapper>
      <AuthWrapper>
        <ApolloWrapper>
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
        </ApolloWrapper>
      </AuthWrapper>
    </FirebaseWrapper>
  );
};

export default App;
