import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthCard from '../../components/auth/AuthCard';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import useForm from '../../hooks/useForm';
import { validateSignupForm } from '../../utils/validation';

const StudentSignup = () => {
  const navigate = useNavigate();
  const { signup, error: authError, isLoading } = useAuth();
  
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateSignupForm,
    onSubmit: async (values, setErrors) => {
      const success = await signup(values.name, values.email, values.password, 'student');
      if (success) {
        navigate('/student/dashboard');
      }
    },
  });

  const footer = (
    <div className="text-sm text-center text-gray-600">
      Already have an account?{' '}
      <Link to="/student/login" className="text-blue-600 hover:text-blue-800 font-medium">
        Sign in
      </Link>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-blue-50">
      <div className="w-full max-w-md">
        <AuthCard
          title="Student Signup"
          subtitle="Create your student account to get started"
          footer={footer}
        >
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              autoComplete="name"
              required
            />
            
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
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
              helperText="Must be at least 8 characters with one number"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              autoComplete="new-password"
              required
            />
            
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              autoComplete="new-password"
              required
            />

            <div className="flex items-center mt-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isLoading || isSubmitting}
              disabled={isLoading || isSubmitting}
              className="mt-6"
            >
              Create Account
            </Button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default StudentSignup;