import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const PortalAdminRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeId, setCollegeId] = useState(''); // e.g., a unique ID for the college
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/portal/auth/register', {
        name,
        email,
        password,
        collegeId,
        role: 'college-admin',
      });
      // Log the new admin in immediately after successful registration
      login(data.token, 'private');
      navigate('/portal/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin account.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a College Admin Account
          </h2>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
            </div>
            <div>
              <input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Official Email Address" />
            </div>
             <div>
              <input name="collegeId" type="text" required value={collegeId} onChange={(e) => setCollegeId(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Unique College/Org ID (e.g., 'UCLA-ADMIN')" />
            </div>
            <div>
              <input name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Admin Account
            </button>
          </div>
        </form>
         <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/portal/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PortalAdminRegisterPage;
