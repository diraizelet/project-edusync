import { useNavigate } from 'react-router-dom';
import { GraduationCap, Bookmark, BookOpen, Users } from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Transform your teaching and learning experience
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Connect, collaborate, and achieve more with EduSync's comprehensive platform for students and instructors.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/student/signup')}
                >
                  Join as Student
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/instructor/signup')}
                >
                  Join as Instructor
                </Button>
              </div>
            </div>
            <div className="flex justify-center relative">
              <img 
                src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Students learning together" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">10,000+ users</p>
                    <p className="text-sm text-gray-500">Join our community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose EduSync?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers powerful tools for both students and instructors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
              <div className="bg-blue-100 inline-block p-3 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with interactive content, real-time feedback, and collaborative tools.
              </p>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-lg transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
              <div className="bg-purple-100 inline-block p-3 rounded-full mb-4">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals and academic experts with real-world experience.
              </p>
            </div>
            
            <div className="bg-teal-50 p-8 rounded-lg transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
              <div className="bg-teal-100 inline-block p-3 rounded-full mb-4">
                <Bookmark className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Learning</h3>
              <p className="text-gray-600">
                Adaptive learning paths that adjust to your pace, style, and goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Student & Instructor Split */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">For Students</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-blue-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span>Access hundreds of courses across various disciplines</span>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span>Learn at your own pace with flexible scheduling</span>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span>Connect with peers for study groups and collaboration</span>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span>Track your progress with detailed analytics</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button onClick={() => navigate('/student/signup')}>
                  Sign Up as Student
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">For Instructors</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-purple-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span>Create and manage courses with powerful tools</span>
                </li>
                <li className="flex gap-3">
                  <div className="bg-purple-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span>Engage students with interactive content and assessments</span>
                </li>
                <li className="flex gap-3">
                  <div className="bg-purple-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span>Get insights on student performance and engagement</span>
                </li>
                <li className="flex gap-3">
                  <div className="bg-purple-100 h-6 w-6 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span>Grow your audience and monetize your expertise</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/instructor/signup')}
                >
                  Sign Up as Instructor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your education journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students and instructors who are already using EduSync to achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => navigate('/student/signup')}
            >
              Join as Student
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => navigate('/instructor/signup')}
            >
              Join as Instructor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;