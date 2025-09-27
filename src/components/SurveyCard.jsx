// FILE: client/src/components/SurveyCard.jsx

import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';

const SurveyCard = ({ survey }) => {
  const imageUrl = 'https://placehold.co/600x400/e0e7ff/4f46e5?text=VoteHub';
  
  // Calculate the total number of votes from the length of the 'voters' array.
  const totalVotes = survey.voters ? survey.voters.length : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img 
        className="w-full h-48 object-cover" 
        src={imageUrl} 
        alt={survey.title} 
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Active
          </span>
          <span className="text-sm text-gray-500">
            <Countdown date={survey.deadline} />
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{survey.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{survey.description}</p>
        
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm text-gray-500">
          {/* --- THIS IS THE NEW PART --- */}
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            {totalVotes} {totalVotes === 1 ? 'person voted' : 'people voted'}
          </span>
          <Link 
            to={`/survey/${survey._id}`} 
            className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Vote Now &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
