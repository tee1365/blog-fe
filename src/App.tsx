import { Box, Button } from '@chakra-ui/react';
import { Link, Route, Switch } from 'react-router-dom';
import ChangePassword from './pages/ChangePassword';
import CreatePost from './pages/CreatePost';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Switch>
      <Route path="/" component={Welcome} exact />
      <Box>
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/createPost" component={CreatePost} />
        <Route path="/changePassword/:token" component={ChangePassword} />
        <Box position="fixed" right="10vh" bottom="10vh">
          <Link to="/createPost">
            <Button>add</Button>
          </Link>
        </Box>
      </Box>
    </Switch>
  );
}

export default App;
