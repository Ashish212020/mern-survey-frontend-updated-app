import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import PrivateSurveyCard from '../components/PortalAdmin/PrivateSurveyCard';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const { data } = await API.get('/portal/surveys/active');
                setSurveys(data);
            } catch (err) {
                setError('Failed to fetch surveys. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSurveys();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/portal');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center font-bold text-indigo-600">
                            Student Voting Portal
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Welcome, {user?.name}!</span>
                            <button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Eligible Surveys</h1>
                    {loading ? (
                        <p>Loading surveys...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : surveys.length === 0 ? (
                        <p>There are currently no active surveys you are eligible for.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {surveys.map((survey) => (
                                <PrivateSurveyCard key={survey._id} survey={survey} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
