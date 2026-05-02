
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserView from './components/UserView';
import UserEdit from './components/UserEdit';

import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import UsersPage from './pages/UsersPage';
import ContactView from './components/ContactView'
import { TitleProvider } from './context/TitleProvider';
import { NotFound } from './pages/NotFound';


function App() {

  return (
    <TitleProvider>
      <Router>
        <Routes>

          <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate replace to="/home" />} />
            <Route index path="home" element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />

            <Route path="contact">
              <Route index element={<ContactPage />} />
              <Route path="view/:id" element={<ContactView />} />
            </Route>

            <Route path="users">
              <Route index element={<UsersPage />} />
              <Route path="view/:id" element={<UserView />} />
              <Route path="edit/:id" element={<UserEdit />} />
            </Route>

          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </TitleProvider>
  )
}

export default App
