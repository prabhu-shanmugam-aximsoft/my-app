import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type MenuItem = {
  label: string;
  path: string;
  roles?: string[];
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/home' },
  { label: 'User Management', path: '/users', roles: ['admin'] },
  { label: 'Contact Submission', path: '/contact', roles: ['admin'] },
  { label: 'Profile', path: '/profile' },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth(); // ✅ use reactive auth state

  const role = user?.role;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'active text-white bg-primary' : 'text-white'}`;

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
      style={{ width: '250px', height: '100vh' }}
    >
      {/* ✅ Use div instead of anchor */}
      <div className="d-flex align-items-center mb-3 text-white">
        <span className="fs-4">React App</span>
      </div>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems
          .filter(item => !item.roles || item.roles.includes(role || ''))
          .map(item => (
            <li key={item.path}>
              <NavLink to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};