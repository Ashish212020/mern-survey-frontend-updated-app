import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import { CheckCircle } from 'lucide-react';

const PrivateSurveyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const { data } = await API.get(`/portal/surveys/${id}`);
                setSurvey(data);
                // Check if the current user's ID is in the list of voters
                if (data.voters.includes(user._id)) {
                    setHasVoted(true);
                }
            } catch (err) {
                setError('Could not load survey. You may not be eligible or it may not exist.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSurvey();
    }, [id, user._id]);

    const handleVote = async () => {
        if (!selectedOption) {
            setError('Please select an option to vote.');
            return;
        }
        try {
            const { data } = await API.post(`/portal/surveys/${id}/vote`, { optionId: selectedOption });
            setSurvey(data);
            setHasVoted(true);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to cast vote.');
        }
    };

    if (loading) return <div className="text-center py-10">Loading survey...</div>;
    if (error && !survey) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!survey) return <div className="text-center py-10">Survey not found.</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <button onClick={() => navigate('/portal/student/dashboard')} className="mb-6 text-indigo-600 hover:underline">
                &larr; Back to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-900">{survey.title}</h1>
                    <p className="text-gray-600 mt-2">Posted by: {survey.createdBy?.name || 'Admin'}</p>
                    <p className="text-gray-700 mt-4">{survey.description}</p>
                </div>

                <div className="px-8 py-6 bg-gray-50">
                    {hasVoted ? (
                         <div className="text-center">
                            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                            <h2 className="mt-4 text-2xl font-semibold text-gray-800">Thank you for voting!</h2>
                            <p className="mt-2 text-gray-600">Your vote has been successfully recorded.</p>
                         </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cast Your Vote</h2>
                            <div className="space-y-3">
                                {survey.options.map((option) => (
                                    <label key={option._id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors">
                                        <input
                                            type="radio"
                                            name="voteOption"
                                            value={option._id}
                                            checked={selectedOption === option._id}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <span className="ml-3 text-lg text-gray-700">{option.optionText}</span>
                                    </label>
                                ))}
                            </div>
                            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                            <button
                                onClick={handleVote}
                                disabled={!selectedOption}
                                className="w-full mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Submit Vote
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivateSurveyDetailPage;
