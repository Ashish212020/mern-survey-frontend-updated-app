// FILE: client/src/pages/SurveyDetailPage.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import SocialShareButtons from '../components/SocialShareButtons';
import { FaCheckCircle } from 'react-icons/fa';

const SurveyDetailPage = () => {
  const { id: surveyId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [voteError, setVoteError] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const { data } = await API.get(`/surveys/${surveyId}`);
        setSurvey(data);
        if (user && data.voters.includes(user.id)) {
          setHasVoted(true);
        } else {
          setHasVoted(false);
        }
      } catch (err) {
        setError('Could not load survey details.');
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [surveyId, user]);

  const handleVote = async () => {
    setVoteError('');
    if (!user) { navigate('/login'); return; }
    if (!selectedOption) { setVoteError('Please select an option to vote.'); return; }

    try {
      const { data: updatedSurvey } = await API.post(`/surveys/${surveyId}/vote`, {
        optionId: selectedOption,
      });
      setSurvey(updatedSurvey);
      setHasVoted(true);
    } catch (err) {
      setVoteError(err.response?.data?.message || 'An error occurred while voting.');
    }
  };

  if (loading) return <p className="text-center mt-8">Loading survey...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!survey) return <p className="text-center mt-8">Survey not found.</p>;

  const imageUrl = 'https://placehold.co/600x400/e0e7ff/4f46e5?text=VoteHub';
  const totalVotes = survey.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-full h-64 object-cover" src={imageUrl} alt={survey.title} />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{survey.title}</h1>
          <p className="text-gray-600 mb-6">{survey.description}</p>
          
          {hasVoted ? (
            survey.resultsVisible ? (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Results:</h3>
                <div className="space-y-3">
                  {survey.options.map(option => {
                    const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
                    return (
                      <div key={option._id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-base font-medium text-gray-700">{option.optionText}</span>
                          <span className="text-sm font-medium text-gray-500">{option.votes} votes ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${percentage}%` }}></div></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 bg-green-50 border border-green-200 rounded-lg">
                <FaCheckCircle className="text-green-500 text-4xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-green-800">Thank you for voting!</h3>
                  <p className="text-green-700">Your vote has been recorded. Results are currently hidden by the admin.</p>
                </div>
              </div>
            )
          ) : (
            <div>
              <div className="space-y-4">
                {survey.options.map((option) => (
                  <label key={option._id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedOption === option._id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>
                    <input type="radio" name="voteOption" value={option._id} checked={selectedOption === option._id} onChange={(e) => setSelectedOption(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                    <span className="ml-3 text-lg font-medium text-gray-800">{option.optionText}</span>
                  </label>
                ))}
              </div>
              {voteError && <p className="text-sm text-red-600 mt-4">{voteError}</p>}
              <div className="mt-8">
                <button onClick={handleVote} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  Cast Your Vote
                </button>
              </div>
            </div>
          )}

          <SocialShareButtons surveyTitle={survey.title} />
        </div>
      </div>
    </div>
  );
};

export default SurveyDetailPage;
