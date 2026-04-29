
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
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


// Example components (usually in separate files)

const NotFound = () => <h1>NotFound Page</h1>

function App() {

  return (
    <>
      <TitleProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              
              <Route path="contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
              <Route path="contact/view/:id" element={<ProtectedRoute><ContactView /></ProtectedRoute>} />
              
              <Route path="users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
              <Route path="users/view/:id" element={<ProtectedRoute><UserView /></ProtectedRoute>} />
              <Route path="users/edit/:id" element={<ProtectedRoute><UserEdit /></ProtectedRoute>} />
            </Route>

            <Route path="/signin" element={<SignIn />} />
             <Route path="/signup" element={<SignUp />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>
      </TitleProvider>
    </>
  )
}

export default App
