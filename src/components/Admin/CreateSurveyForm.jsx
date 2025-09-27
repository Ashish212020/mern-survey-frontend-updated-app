// FILE: client/src/components/Admin/CreateSurveyForm.jsx

import { useState } from 'react';
import API from '../../api';

const surveyCategories = ['Technology', 'Lifestyle', 'Entertainment', 'General', 'Politics'];

const CreateSurveyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('General');
  const [resultsVisible, setResultsVisible] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const filledOptions = options.filter(opt => opt.trim() !== '');
    if (filledOptions.length < 2) {
      setError('Please provide at least two options.');
      return;
    }

    const surveyData = {
      title,
      description,
      options: filledOptions,
      deadline,
      category,
      resultsVisible,
    };

    try {
      await API.post('/surveys', surveyData);
      
      setSuccess('Survey created successfully!');
      setTitle('');
      setDescription('');
      setOptions(['', '']);
      setDeadline('');
      setCategory('General');
      setResultsVisible(false);
    } catch (err) {
      setError('Failed to create survey. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Survey</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title / Question</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            {surveyCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Options</label>
          {options.map((option, index) => (
            <input key={index} type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} placeholder={`Option ${index + 1}`} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
          ))}
          <button type="button" onClick={addOption} className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">+ Add Option</button>
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
          <input type="datetime-local" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div className="flex items-center">
          <input id="resultsVisible" name="resultsVisible" type="checkbox" checked={resultsVisible} onChange={(e) => setResultsVisible(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
          <label htmlFor="resultsVisible" className="ml-2 block text-sm text-gray-900">Allow users to see results after voting</label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Create Survey</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurveyForm;
