
import { NavLink } from 'react-router';

// Sidebar Component
export const Sidebar: React.FC = () => {
  const currentUserRole = localStorage.getItem('userrole'); // assume stored at login
  const isAdmin = currentUserRole === 'admin';

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '250px', height: '100vh' }}>
      <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">React App</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
            <NavLink to="/home" className={({ isActive }) =>
              `nav-link ${isActive ? 'active text-white bg-primary' : 'text-white'}`
            }>Dashboard</NavLink>
          </li>
        {isAdmin && (<>
          <li>
            <NavLink to="/users" className={({ isActive }) =>
              `nav-link ${isActive ? 'active text-white bg-primary' : 'text-white'}`
            }>User Management</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) =>
              `nav-link ${isActive ? 'active text-white bg-primary' : 'text-white'}`
            }>Contact Submission</NavLink>
          </li>
        </>
        )}
        <li>
          <NavLink to="/profile" className={({ isActive }) =>
            `nav-link ${isActive ? 'active text-white bg-primary' : 'text-white'}`
          }>Profile</NavLink>
        </li>

      </ul>
    </div>
  );
};




