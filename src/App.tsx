import { Route } from 'react-router-dom';
import ChangePassword from './pages/ChangePassword';
import CreatePost from './pages/CreatePost';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

function App() {
  return (
    <>
      <Route path="/" component={Welcome} exact />
      <Route path="/home" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/createPost" component={CreatePost} />
      <Route path="/changePassword/:token" component={ChangePassword} />
      <Route path="/post/:id" component={Post} />
    </>
  );
}

export default App;
