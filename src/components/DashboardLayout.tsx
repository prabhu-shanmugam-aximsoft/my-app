import { Sidebar } from "./AppSidebar";
import AppHeader from "./AppHeader";
// Card Component
interface CardProps {
  title: string;
  value: string | number;
}

export const DashboardCard: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6 className="card-title text-muted">{title}</h6>
          <h3>{value}</h3>
        </div>
      </div>
    </div>
  );
};

// Table Component
interface TableProps {
  data: { id: number; name: string; email: string }[];
}

export const DataTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Users</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




// Main Dashboard Layout



export const DashboardLayout: React.FC = () => {
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <AppHeader />
        <div className="container-fluid mt-4">
          <div className="row">
            <DashboardCard title="Users" value={120} />
            <DashboardCard title="Revenue" value="$5,000" />
            <DashboardCard title="Orders" value={320} />
            <DashboardCard title="Visits" value={1500} />
          </div>

          <div className="row">
            <div className="col-12">
              <DataTable data={sampleData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;