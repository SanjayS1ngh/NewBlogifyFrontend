import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import FollowRequests from './pages/FollowRequests';
import CreateBlog from './pages/CreateBlog';
const App = () => {
  return (
    <Routes>
      <Route
        path='/' element={<Login />}
      />
      <Route
        path='/register' element={<Register />}
      />
      <Route
        path='/dashboard' element={<Dashboard />}
      />
      <Route
        path='/users' element={<Users />}
      />
      <Route
        path='/users/:userId' element={<UserProfile />}
      />
      <Route
        path='/follow-requests' element={<FollowRequests />}
      />
      <Route
        path='/create-blog' element={<CreateBlog />}
      />
    </Routes>
  );
}

export default App;
