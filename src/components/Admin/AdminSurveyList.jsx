// FILE: client/src/components/Admin/AdminSurveyList.jsx

import { useState, useEffect } from 'react';
import API from '../../api';
import SurveyResultsChart from './SurveyResultsChart';

const AdminSurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminSurveys = async () => {
      try {
        const { data } = await API.get('/surveys/admin');
        setSurveys(data);
      } catch (error) {
        console.error("Failed to fetch admin surveys", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminSurveys();
  }, []);

  const handleDelete = async (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey? This is permanent.')) {
      try {
        await API.delete(`/surveys/${surveyId}`);
        setSurveys(surveys.filter(s => s._id !== surveyId));
      } catch (error) {
        console.error("Failed to delete survey", error);
        alert('Could not delete the survey.');
      }
    }
  };

  const handleVisibilityToggle = async (surveyId) => {
    try {
      const { data: updatedSurvey } = await API.patch(`/surveys/${surveyId}/toggle-visibility`);
      setSurveys(surveys.map(s => s._id === surveyId ? updatedSurvey : s));
    } catch (error) {
      console.error("Failed to toggle visibility", error);
      alert('Could not update survey visibility.');
    }
  };

  const handleCloseSurvey = async (surveyId) => {
    if (window.confirm('Are you sure you want to end this survey now? This cannot be undone.')) {
      try {
        await API.patch(`/surveys/${surveyId}/close`);
        // Update the survey in the list to reflect its new "closed" status
        setSurveys(surveys.map(s => 
            s._id === surveyId ? { ...s, deadline: new Date().toISOString() } : s
        ));
      } catch (error) {
        console.error("Failed to close survey", error);
        alert('Could not end the survey.');
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-8">Loading your surveys...</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Your Surveys</h2>
      <div className="space-y-8">
        {surveys.length > 0 ? surveys.map(survey => {
          const isActive = new Date(survey.deadline) > new Date();
          return (
            <div key={survey._id} className="border border-gray-200 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                <div>
                  <h3 className="text-xl font-bold">{survey.title}</h3>
                  <p className="text-sm text-gray-500">
                    Status: {isActive ? `Active, ends on ${new Date(survey.deadline).toLocaleDateString()}` : `Closed on ${new Date(survey.deadline).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  {isActive && (
                    <button 
                      onClick={() => handleCloseSurvey(survey._id)}
                      className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    >
                      End Now
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(survey._id)} 
                    className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                <label htmlFor={`toggle-${survey._id}`} className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id={`toggle-${survey._id}`} className="sr-only" checked={survey.resultsVisible} onChange={() => handleVisibilityToggle(survey._id)} />
                    <div className={`block w-14 h-8 rounded-full ${survey.resultsVisible ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${survey.resultsVisible ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <div className="ml-3 text-gray-700 text-sm font-medium">
                    Results are {survey.resultsVisible ? 'Visible' : 'Hidden'}
                  </div>
                </label>
              </div>

              <SurveyResultsChart data={survey.options} />
            </div>
          );
        }) : <p>You haven't created any surveys yet.</p>}
      </div>
    </div>
  );
};

export default AdminSurveyList;
