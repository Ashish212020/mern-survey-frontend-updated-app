// FILE: client/src/components/ExpiredSurveyCard.jsx

const ExpiredSurveyCard = ({ survey }) => {
  const imageUrl = 'https://placehold.co/600x400/a78bfa/ffffff?text=Poll+Closed';
  
  // Calculate the total votes to determine percentages
  const totalVotes = survey.options.reduce((sum, option) => sum + option.votes, 0);

  // Find the winning option
  const winner = survey.options.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={survey.title} />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Closed
          </span>
          <span className="text-sm text-gray-500">
            Ended on: {new Date(survey.deadline).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{survey.title}</h3>

        {/* Results Section */}
        <div className="space-y-3">
          {survey.options.map(option => {
            const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(0) : 0;
            const isWinner = option._id === winner._id && totalVotes > 0;
            return (
              <div key={option._id}>
                <div className="flex justify-between mb-1">
                  <span className={`text-base font-medium ${isWinner ? 'text-indigo-600' : 'text-gray-700'}`}>
                    {option.optionText} {isWinner && '🏆'}
                  </span>
                  <span className="text-sm font-medium text-gray-500">{option.votes} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${isWinner ? 'bg-indigo-600' : 'bg-gray-400'} h-2.5 rounded-full`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpiredSurveyCard;
