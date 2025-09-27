import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

// A set of colors to use for the pie chart slices
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const PrivateSurveyResultsChart = ({ survey }) => {
    // First, calculate the total number of votes cast
    const totalVotes = survey.options.reduce((acc, option) => acc + option.votes, 0);

    // Prepare the data in the format that recharts expects
    const data = survey.options.map(opt => ({
        name: opt.optionText,
        votes: opt.votes,
        percentage: totalVotes > 0 ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0,
    }));

    // If no one has voted yet, display a simple message instead of empty charts
    if (totalVotes === 0) {
        return <p className="text-center text-gray-500 mt-4">No votes have been cast yet.</p>;
    }

    return (
        <div className="w-full h-auto bg-gray-50 p-4 rounded-lg shadow-inner mt-4">
            <h4 className="text-lg font-semibold mb-4 text-center text-gray-700">Live Results</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Bar Chart Section */}
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={80} />
                            <Tooltip formatter={(value) => `${value} votes`} />
                            <Legend />
                            <Bar dataKey="votes" fill="#8884d8" name="Total Votes" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Pie Chart Section */}
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name}: ${percentage}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="votes"
                                nameKey="name"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} votes`, name]} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PrivateSurveyResultsChart;

