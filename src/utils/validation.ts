interface FormValues {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

// Common validation rules
export const validateRequired = (value: any, fieldName: string = 'This field'): string => {
  if (!value) return `${fieldName} is required`;
  if (typeof value === 'string' && !value.trim()) return `${fieldName} is required`;
  return '';
};

export const validateEmail = (value: string): string => {
  if (!value) return '';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Please enter a valid email address';
  
  return '';
};

export const validatePassword = (value: string): string => {
  if (!value) return '';
  
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  // Require at least one number
  if (!/\d/.test(value)) {
    return 'Password must contain at least one number';
  }
  
  return '';
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return '';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

// Validation functions for specific forms
export const validateLoginForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateRequired(values.email, 'Email');
  if (emailError) errors.email = emailError;
  else {
    const emailFormatError = validateEmail(values.email);
    if (emailFormatError) errors.email = emailFormatError;
  }
  
  const passwordError = validateRequired(values.password, 'Password');
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateSignupForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  
  const nameError = validateRequired(values.name, 'Name');
  if (nameError) errors.name = nameError;
  
  const emailError = validateRequired(values.email, 'Email');
  if (emailError) errors.email = emailError;
  else {
    const emailFormatError = validateEmail(values.email);
    if (emailFormatError) errors.email = emailFormatError;
  }
  
  const passwordError = validateRequired(values.password, 'Password');
  if (passwordError) errors.password = passwordError;
  else {
    const passwordStrengthError = validatePassword(values.password);
    if (passwordStrengthError) errors.password = passwordStrengthError;
  }
  
  const confirmPasswordError = validateRequired(values.confirmPassword, 'Confirm password');
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  else {
    const passwordMatchError = validatePasswordMatch(values.password, values.confirmPassword);
    if (passwordMatchError) errors.confirmPassword = passwordMatchError;
  }
  
  return errors;
};