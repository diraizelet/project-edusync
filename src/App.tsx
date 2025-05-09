import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import StudentLogin from './pages/student/Login';
import StudentSignup from './pages/student/Signup';
import InstructorLogin from './pages/instructor/Login';
import InstructorSignup from './pages/instructor/Signup';
import StudentDashboard from './pages/student/Dashboard';
import InstructorDashboard from './pages/instructor/Dashboard';
import Quiz from './pages/student/Quiz';
import NotFound from './pages/NotFound';

// Layout
import MainLayout from './components/layouts/MainLayout';

const App = () => {
  const { user } = useAuth();
  
  // Protected route component
  const ProtectedRoute = ({ 
    children, 
    requiredRole 
  }: { 
    children: JSX.Element, 
    requiredRole?: 'student' | 'instructor' 
  }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="student/login" element={<StudentLogin />} />
        <Route path="student/signup" element={<StudentSignup />} />
        <Route path="instructor/login" element={<InstructorLogin />} />
        <Route path="instructor/signup" element={<InstructorSignup />} />
        
        {/* Protected routes */}
        <Route 
          path="student/dashboard" 
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="student/quiz/:id" 
          element={
            <ProtectedRoute requiredRole="student">
              <Quiz />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="instructor/dashboard" 
          element={
            <ProtectedRoute requiredRole="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;