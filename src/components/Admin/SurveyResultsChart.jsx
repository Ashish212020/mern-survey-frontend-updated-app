// FILE: client/src/components/Admin/SurveyResultsChart.jsx

import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

// Define some colors for our pie chart slices
const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe'];

const SurveyResultsChart = ({ data }) => {
  // 1. Calculate the total number of votes for this survey.
  const totalVotes = data.reduce((sum, option) => sum + option.votes, 0);

  // 2. Prepare the data for the charts, calculating the percentage for each option.
  const chartData = data.map(opt => ({
    name: opt.optionText,
    votes: opt.votes,
    // Calculate percentage, handling the case where totalVotes is 0 to avoid dividing by zero.
    percentage: totalVotes > 0 ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0,
  }));

  // If there are no votes yet, we can show a placeholder message instead of empty charts.
  if (totalVotes === 0) {
    return (
      <div className="w-full h-80 bg-gray-50 p-4 rounded-lg mt-4 flex items-center justify-center">
        <p className="text-gray-500">No votes have been cast for this survey yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bar Chart (Existing Chart) */}
      <div className="h-80 bg-gray-50 p-4 rounded-lg">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value) => `${value} votes`} />
            <Legend />
            <Bar dataKey="votes" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart (New Chart) */}
      <div className="h-80 bg-gray-50 p-4 rounded-lg">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              // This function renders the label on each slice of the pie
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="votes"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => `${props.payload.percentage}% (${value} votes)`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SurveyResultsChart;
