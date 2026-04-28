import {useEffect, useState } from "react";
import {  useNavigate } from "react-router";
import { useTitle } from "../context/TitleProvider";

// Navbar Component
export const AppHeader: React.FC = () => {

  const navigate = useNavigate();

  const { title } = useTitle();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  interface UserData {
    name: string;
    count: number;
  }

  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("currentuser");
    if (savedData) {
      const parsedData: UserData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <span className="navbar-brand">{title}</span>

        <div className="dropdown ms-auto">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {data?.name}
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <a className="dropdown-item" href="#" onClick={() => navigate('/profile')}>Profile</a>
            </li>
            {/*  <li>
              <a className="dropdown-item" href="#">Settings</a>
            </li> */}
            <li><hr className="dropdown-divider" /></li>
            <li>
              <a className="dropdown-item text-danger" href="#" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
