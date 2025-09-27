// FILE: client/src/pages/CreateCollegeAdminPage.jsx

import React, { useState } from 'react';
import API from '../api';

// This is a special, unlinked page for creating the first admin.
const CreateCollegeAdminPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await API.post('/portal/auth/register', {
        name,
        email,
        password,
        collegeId,
        role: 'college-admin',
        secretKey,
      });
      setMessage('College Admin account created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin account.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create College Admin</h2>
        <p className="text-center text-sm text-gray-500 mb-6">(For authorized use only)</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600">{error}</div>}
          {message && <div className="text-green-600">{message}</div>}
          <input type="text" placeholder="Admin Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
          <input type="email" placeholder="Admin College Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
          <input type="text" placeholder="College ID (e.g., ADMIN-001)" value={collegeId} onChange={e => setCollegeId(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
          <input type="password" placeholder="Secret Key" value={secretKey} onChange={e => setSecretKey(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCollegeAdminPage;
