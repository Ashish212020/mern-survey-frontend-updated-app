// FILE: client/src/pages/HomePage.jsx

import { useState, useEffect } from 'react';
import API from '../api';
import SurveyCard from '../components/SurveyCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import ExpiredSurveys from '../components/ExpiredSurveys';
import io from 'socket.io-client';

const SOCKET_URL = 'https://survey-app-updated-backend.onrender.com' || 'http://localhost:5001';
const socket = io(SOCKET_URL);
const surveyCategories = ['All', 'Technology', 'Lifestyle', 'Entertainment', 'General', 'Politics'];

const HomePage = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchActiveSurveys = async (page, category) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/surveys/active?page=${page}&limit=6&category=${category}`);
      setSurveys(data.surveys);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load surveys. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveSurveys(currentPage, selectedCategory);

    // Set up real-time listeners
    const handleSurveyUpdate = () => {
      // Refetch the current page to see any new or removed surveys
      fetchActiveSurveys(currentPage, selectedCategory);
    };

    socket.on('newSurvey', handleSurveyUpdate);
    socket.on('surveyDeleted', handleSurveyUpdate);
    socket.on('surveyClosed', handleSurveyUpdate); // This will trigger a refetch

    socket.on('voteUpdate', (updatedSurvey) => {
      setSurveys((prevSurveys) => 
        prevSurveys.map((survey) => 
          survey._id === updatedSurvey._id ? updatedSurvey : survey
        )
      );
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('newSurvey', handleSurveyUpdate);
      socket.off('surveyDeleted', handleSurveyUpdate);
      socket.off('surveyClosed', handleSurveyUpdate);
      socket.off('voteUpdate');
    };
  }, [currentPage, selectedCategory]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Loading surveys...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }
    if (surveys.length === 0) {
      return <p className="text-center text-gray-500">No active surveys found for this category.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {surveys.map((survey) => (
          <SurveyCard key={survey._id} survey={survey} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left">
          Active Surveys
        </h2>
        
        <CategoryFilter 
          categories={surveyCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {renderContent()}
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Expired Surveys Section */}
      <ExpiredSurveys />
    </div>
  );
};

export default HomePage;
