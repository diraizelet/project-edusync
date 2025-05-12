import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BookOpen,
  Award,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
} from 'lucide-react';
import Button from '../../components/ui/Button';

interface Assessment {
  id: string;
  title: string;
  duration?: string;
  questions?: number;
  status: 'available' | 'completed' | 'failed';
  score?: number;
  date?: string;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [averageScore, setAverageScore] = useState<number>(0);

  const stats = {
    coursesCompleted: 12,
    assessmentsCompleted: 48,
    averageScore,
  };

  interface Course {
    id: string;
    title: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
  }

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get<Assessment[]>('https://localhost:7130/api/Assessments');
        const assessmentsWithAvailableStatus = response.data.map(assessment => ({
          ...assessment,
          status: 'available' as 'available', // Force setting all statuses to "available"
        }));
        setAssessments(assessmentsWithAvailableStatus);
      } catch (error) {
        console.error('Failed to fetch assessments:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('https://localhost:7130/api/Courses');
        const enrichedCourses = response.data.map(course => ({
          ...course,
          progress: Math.round((course.completedLessons / course.totalLessons) * 100),
        }));
        setCourses(enrichedCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    const fetchAverageScore = async () => {
      try {
        if (user?.id) {
          const response = await axios.get<number>(`https://localhost:7130/api/Results/average/${user.id}`);
          setAverageScore(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch average score:', error);
      }
    };

    fetchAssessments();
    fetchCourses();
    fetchAverageScore();
  }, [user?.id]);

  const handleStartAssessment = (id: string) => {
    navigate(`/student/quiz/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600 mt-1">Track your progress and continue learning</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium mb-1">Courses Completed</p>
              <h3 className="text-3xl font-bold text-blue-700">{stats.coursesCompleted}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium mb-1">Assessments Completed</p>
              <h3 className="text-3xl font-bold text-purple-700">{stats.assessmentsCompleted}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-600 font-medium mb-1">Average Score</p>
              <h3 className="text-3xl font-bold text-teal-700">{stats.averageScore}%</h3>
            </div>
            <div className="bg-teal-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <span className="text-sm text-gray-500">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                    />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {course.progress}% Complete
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Assessments</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {assessments.map(assessment => (
              <div key={assessment.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {assessment.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : assessment.status === 'failed' ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                      {assessment.status === 'available' ? (
                        <p className="text-sm text-gray-500">
                          {assessment.duration} • {assessment.questions} questions
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">{assessment.date}</p>
                      )}
                    </div>
                  </div>
                  {assessment.status === 'available' && (
                    <Button
                      size="sm"
                      onClick={() => handleStartAssessment(assessment.id)}
                      className="flex items-center gap-1"
                    >
                      <Play className="h-4 w-4" />
                      Start Now
                    </Button>
                  )}
                  {assessment.status !== 'available' && assessment.score !== undefined && (
                    <span
                      className={`font-medium ${assessment.score >= 70 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {assessment.score}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
