// FILE: client/src/pages/HomePage.jsx

import { useState, useEffect } from 'react';
import API from '../api'; // Import our configured axios instance
import SurveyCard from '../components/SurveyCard'; // Import the new card component

const HomePage = () => {
  // 1. Set up state variables to hold our data and loading status.
  const [surveys, setSurveys] = useState([]); // `surveys` will be an array of survey objects.
  const [loading, setLoading] = useState(true); // `loading` is true by default.
  const [error, setError] = useState(null);     // `error` will hold any error messages.

  // 2. Use the `useEffect` hook to fetch data when the component first renders.
  useEffect(() => {
    // Define an async function to fetch the surveys.

      console.log('HomePage component has mounted. Attempting to fetch surveys...');
    const fetchActiveSurveys = async () => {
      try {
        // 3. Make the API call to our backend endpoint.
        const { data } = await API.get('/surveys/active');
        setSurveys(data); // If successful, update the `surveys` state with the fetched data.
      } catch (err) {
        setError('Failed to load surveys. Please try again later.'); // If an error occurs, update the `error` state.
        console.error(err);
      } finally {
        setLoading(false); // 4. Set loading to false, regardless of success or failure.
      }
    };

    fetchActiveSurveys();
  }, []); // The empty dependency array `[]` means this effect runs only once, like componentDidMount.

  // --- Render Logic ---
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Loading surveys...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }
    if (surveys.length === 0) {
      return <p className="text-center text-gray-500">No active surveys at the moment. Check back soon!</p>;
    }
    // 5. If we have data, map over the `surveys` array and render a `SurveyCard` for each one.
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {surveys.map((survey) => (
          <SurveyCard key={survey._id} survey={survey} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section (remains the same) */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Make Your Voice Heard
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Participate in real-time surveys and see live results instantly.
          </p>
        </div>
      </div>

      {/* Active Surveys Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
          Active Surveys
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
