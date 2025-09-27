import React, { useState, useEffect } from 'react';
import API from '../../api';
import PrivateSurveyResultsChart from './PrivateSurveyResultsChart.jsx';
import { Trash2, Eye, EyeOff, XCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivateSurveyList = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdminSurveys = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/portal/surveys/my-surveys');
            setSurveys(data);
        } catch (err) {
            setError('Failed to load your surveys. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminSurveys();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this survey? This action cannot be undone.')) {
            try {
                await API.delete(`/portal/surveys/${id}`);
                setSurveys(surveys.filter(s => s._id !== id));
            } catch (err) {
                alert('Failed to delete survey.');
            }
        }
    };

    const handleToggleVisibility = async (id) => {
        try {
            const { data } = await API.put(`/portal/surveys/${id}/toggle-visibility`);
            setSurveys(surveys.map(s => s._id === id ? data : s));
        } catch (err) {
            alert('Failed to update visibility.');
        }
    };

    const handleCloseSurvey = async (id) => {
        if (window.confirm('Are you sure you want to end this survey now? This will close it to new votes.')) {
            try {
                const { data } = await API.put(`/portal/surveys/${id}/close`);
                setSurveys(surveys.map(s => s._id === id ? data : s));
            } catch (err) {
                alert('Failed to close survey.');
            }
        }
    };

    if (loading) return <p className="text-center mt-8">Loading your surveys...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Your Surveys</h2>
            {surveys.length === 0 ? (
                <p className="text-center text-gray-500">You haven't created any surveys yet.</p>
            ) : (
                <div className="space-y-6">
                    {surveys.map(survey => {
                        const isActive = new Date(survey.deadline) > new Date();
                        return (
                            <div key={survey._id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{survey.title}</h3>
                                        <p className="text-sm text-gray-500">{survey.description}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {isActive ? 'Active' : 'Closed'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleToggleVisibility(survey._id)} className="p-2 text-gray-500 hover:text-indigo-600" title={survey.resultsVisible ? 'Hide Results' : 'Show Results'}>
                                            {survey.resultsVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                        {isActive && (
                                             <button onClick={() => handleCloseSurvey(survey._id)} className="p-2 text-yellow-600 hover:text-yellow-800" title="End Survey Now">
                                                 <XCircle size={20} />
                                             </button>
                                        )}
                                        <button onClick={() => handleDelete(survey._id)} className="p-2 text-red-500 hover:text-red-700" title="Delete Survey">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <PrivateSurveyResultsChart survey={survey} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PrivateSurveyList;