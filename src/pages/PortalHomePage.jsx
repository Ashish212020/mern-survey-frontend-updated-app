import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield } from 'lucide-react';

const PortalHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-600 sm:text-5xl md:text-6xl">
          Private Voting Portal
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500">
          A secure and dedicated environment for official voting and surveys.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* For Students Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">For Students</h2>
          <p className="mt-2 text-gray-600 mb-6">
            Participate in surveys exclusive to your institution. Log in or register with your college ID.
          </p>
          <div className="flex space-x-4">
            <Link to="/portal/login" className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
              Student Login
            </Link>
            <Link to="/portal/student/register" className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Register
            </Link>
          </div>
        </div>

        {/* For College Admins Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <div className="bg-teal-100 p-4 rounded-full mb-4">
            <Shield className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">For College Admins</h2>
          <p className="mt-2 text-gray-600 mb-6">
            Create, manage, and monitor secure surveys for your students. Get started by creating your admin account.
          </p>
          <div className="flex space-x-4">
            <Link to="/portal/login" className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200">
              Admin Login
            </Link>
            <Link to="/portal/admin/register" className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
              Register
            </Link>
          </div>
        </div>
      </div>
       <div className="mt-12">
        <Link to="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          &larr; Back to Public Site
        </Link>
      </div>
    </div>
  );
};

export default PortalHomePage;
