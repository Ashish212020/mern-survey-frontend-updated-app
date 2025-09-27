import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, userType } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to public homepage after logout
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            VoteHub
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* This logic now correctly handles showing different links for public users vs guests */}
                        {user && userType === 'public' ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-700 hover:text-indigo-600 font-medium">
                                        Dashboard
                                    </Link>
                                )}
                                <span className="text-gray-700">Welcome, {user.name}!</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/portal" className="text-gray-700 hover:text-indigo-600 font-medium">
                                    Private Portal
                                </Link>
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

