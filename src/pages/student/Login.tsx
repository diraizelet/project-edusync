import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthCard from '../../components/auth/AuthCard';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import useForm from '../../hooks/useForm';
import { validateLoginForm } from '../../utils/validation';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login, error: authError, isLoading } = useAuth();
  
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLoginForm,
    onSubmit: async (values, setErrors) => {
      const success = await login(values.email, values.password, 'student');
      if (success) {
        navigate('/student/dashboard');
      }
    },
  });

  const footer = (
    <div className="text-sm text-center text-gray-600">
      Don't have an account?{' '}
      <Link to="/student/signup" className="text-blue-600 hover:text-blue-800 font-medium">
        Sign up as a student
      </Link>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-blue-50">
      <div className="w-full max-w-md">
        <AuthCard
          title="Student Login"
          subtitle="Welcome back! Sign in to access your account"
          footer={footer}
        >
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              autoComplete="email"
              required
            />

            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              autoComplete="current-password"
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isLoading || isSubmitting}
              disabled={isLoading || isSubmitting}
              className="mt-6"
            >
              Sign in
            </Button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default StudentLogin;