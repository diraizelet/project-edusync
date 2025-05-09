import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <GraduationCap className="h-8 w-8" />
              <span className="font-bold text-xl">EduSync</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-4">
            {!user ? (
              <>
                <div className="relative group">
                  <button className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    Students
                  </button>
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link 
                      to="/student/login" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      Student Login
                    </Link>
                    <Link 
                      to="/student/signup" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      Student Signup
                    </Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    Instructors
                  </button>
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link 
                      to="/instructor/login" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      Instructor Login
                    </Link>
                    <Link 
                      to="/instructor/signup" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      Instructor Signup
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to={user.role === 'student' ? '/student/dashboard' : '/instructor/dashboard'} 
                  className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!user ? (
              <>
                <div className="px-3 py-2 font-medium text-gray-800">Students</div>
                <Link
                  to="/student/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Student Login
                </Link>
                <Link
                  to="/student/signup"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Student Signup
                </Link>
                
                <div className="px-3 py-2 font-medium text-gray-800 mt-4">Instructors</div>
                <Link
                  to="/instructor/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Instructor Login
                </Link>
                <Link
                  to="/instructor/signup"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Instructor Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={user.role === 'student' ? '/student/dashboard' : '/instructor/dashboard'}
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;