import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import Countdown from 'react-countdown';

const PrivateSurveyCard = ({ survey }) => {
    // Renderer for the countdown timer
    const countdownRenderer = ({ days, hours, minutes }) => {
        return <span>{days}d {hours}h {minutes}m left</span>;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-2">
                     <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600">{survey.title}</h3>
                     <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">Private</span>
                </div>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">{survey.description}</p>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{survey.voters.length} Votes</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <Countdown date={survey.deadline} renderer={countdownRenderer} />
                    </div>
                </div>
                 <Link to={`/portal/survey/${survey._id}`} className="block w-full text-center mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
                    Vote Now &rarr;
                </Link>
            </div>
        </div>
    );
};

export default PrivateSurveyCard;
