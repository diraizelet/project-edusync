import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold text-lg">EduSync</span>
            </Link>
            <p className="mt-2 text-gray-300 text-sm">
              EduSync helps connect students and instructors for a seamless learning experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Students</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/student/login" className="text-gray-300 hover:text-white transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/student/signup" className="text-gray-300 hover:text-white transition-colors">
                  Student Signup
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Find Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Instructors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/instructor/login" className="text-gray-300 hover:text-white transition-colors">
                  Instructor Login
                </Link>
              </li>
              <li>
                <Link to="/instructor/signup" className="text-gray-300 hover:text-white transition-colors">
                  Instructor Signup
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Create Course
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Teaching Resources
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} EduSync. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;