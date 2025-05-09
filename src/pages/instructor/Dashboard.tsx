import React, { useEffect, useState } from 'react';
import { GraduationCap, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import AddCourseForm from './components/AddCourseForm';
import CreateAssessmentForm from './components/CreateAssessmentForm';

type Course = {
  id: string;
  title: string;
  description: string;
};

type Assessment = {
  id: string;
  name: string;
  courseTitle: string;
};

const InstructorDashboard: React.FC = () => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('https://localhost:7130/api/courses');
      const data = await res.json();
      console.log("pulled data");
      
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const fetchAssessments = async () => {
    try {
      const res = await fetch('https://localhost:7130/api/assessments');
      const data = await res.json();
      setAssessments(data);
    } catch (err) {
      console.error('Failed to fetch assessments:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchAssessments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-700" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Instructor Dashboard</h1>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setShowCourseForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Course
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowAssessmentForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Assessment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Courses Panel */}
          <div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">My Courses</h2>
                <div className="space-y-4">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <div key={course.id} className="p-4 border rounded-md">
                        <h3 className="text-md font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No courses yet. Click "New Course" to create one.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showCourseForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <AddCourseForm
                    onClose={() => {
                      setShowCourseForm(false);
                      fetchCourses(); // refresh
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Assessments Panel */}
          <div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">My Assessments</h2>
                <div className="space-y-4">
                  {assessments.length > 0 ? (
                    assessments.map((a) => (
                      <div key={a.id} className="p-4 border rounded-md">
                        <h3 className="text-md font-semibold">{a.name}</h3>
                        <p className="text-sm text-gray-600">Course: {a.courseTitle}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No assessments yet. Click "New Assessment" to create one.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showAssessmentForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <CreateAssessmentForm
                    onClose={() => {
                      setShowAssessmentForm(false);
                      fetchAssessments(); // refresh
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
