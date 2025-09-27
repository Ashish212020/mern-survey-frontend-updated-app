import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreatePrivateSurveyForm from '../components/PortalAdmin/CreatePrivateSurveyForm.jsx';
import PrivateSurveyList from '../components/PortalAdmin/PrivateSurveyList.jsx';

const CollegeAdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/portal'); // Redirect to the portal landing page after logout
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Dashboard Header */}
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center font-bold text-indigo-600">
                            College Admin Portal
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Welcome, {user?.name}!</span>
                            <button 
                                onClick={handleLogout} 
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Component to create new private surveys */}
                    <CreatePrivateSurveyForm />
                    
                    {/* A visual divider */}
                    <hr className="my-12 border-gray-300" />

                    {/* Component to list and manage existing private surveys */}
                    <PrivateSurveyList />

                </div>
            </main>
        </div>
    );
};

export default CollegeAdminDashboard;

