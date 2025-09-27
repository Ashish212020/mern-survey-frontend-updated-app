// FILE: client/src/components/ExpiredSurveys.jsx

import { useState, useEffect } from 'react';
import API from '../api';
import ExpiredSurveyCard from './ExpiredSurveyCard';
import Pagination from './Pagination';

const ExpiredSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchExpiredSurveys = async (page) => {
      setLoading(true);
      try {
        const { data } = await API.get(`/surveys/expired?page=${page}&limit=3`);
        setSurveys(data.surveys);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch expired surveys", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpiredSurveys(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading past results...</p>;
  if (surveys.length === 0) return null; // Don't show the section if there are no expired surveys

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Completed Surveys & Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surveys.map((survey) => (
            <ExpiredSurveyCard key={survey._id} survey={survey} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ExpiredSurveys;
