import React, { useState } from 'react';
import API from '../../api';

const CreatePrivateSurveyForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [deadline, setDeadline] = useState('');
    const [preApprovedVotersText, setPreApprovedVotersText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (options.filter(opt => opt.trim() !== '').length < 2) {
            setError('Please provide at least two voting options.');
            return;
        }

        try {
            const surveyData = {
                title,
                description,
                options: options.filter(opt => opt.trim() !== ''),
                deadline,
                preApprovedVotersText
            };
            await API.post('/portal/surveys', surveyData);
            setSuccess('Survey created successfully!');
            // Clear form
            setTitle('');
            setDescription('');
            setOptions(['', '']);
            setDeadline('');
            setPreApprovedVotersText('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create survey. Please try again.');
            console.error('Survey creation error:', err);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Private Survey</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
                {success && <p className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-md">{success}</p>}
                
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Survey Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Voting Options</label>
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mt-2">
                            <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            {options.length > 2 && (
                                <button type="button" onClick={() => removeOption(index)} className="ml-2 text-red-500 hover:text-red-700">&times;</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addOption} className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">+ Add another option</button>
                </div>

                <div>
                    <label htmlFor="preApprovedVotersText" className="block text-sm font-medium text-gray-700">Eligible Voters List</label>
                    <textarea id="preApprovedVotersText" value={preApprovedVotersText} onChange={(e) => setPreApprovedVotersText(e.target.value)} required rows="5" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Paste list here..."></textarea>
                    <p className="mt-1 text-xs text-gray-500">Format: One voter per line, with College ID and Email separated by a comma.</p>
                </div>
                
                <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                    <input type="datetime-local" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create Survey
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePrivateSurveyForm;

