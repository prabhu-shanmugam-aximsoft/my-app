
import { Outlet } from "react-router";
import { Sidebar } from "./AppSidebar";
import AppHeader from "./AppHeader";

const LayoutContent: React.FC = () => {


  return (
    <div className="min-h-screen xl:flex">
      <div>
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1">
            <div className="container-fluid mt-4">
              <div className="row">
                <AppHeader />
              </div>
              <div className="row">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <LayoutContent />
  );
};

export default AppLayout;