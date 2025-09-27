// FILE: client/src/pages/AdminDashboard.jsx

import CreateSurveyForm from '../components/Admin/CreateSurveyForm';
import AdminSurveyList from '../components/Admin/AdminSurveyList'; // Import the new component

const AdminDashboard = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Form for creating new surveys */}
        <CreateSurveyForm />

        {/* List of existing surveys with charts and delete buttons */}
        <AdminSurveyList />
      </div>
    </div>
  );
};

export default AdminDashboard;
