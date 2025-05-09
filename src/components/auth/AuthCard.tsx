import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full mx-auto transform transition-all duration-300 hover:shadow-xl">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-center text-gray-600 mb-6">{subtitle}</p>
        )}
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default AuthCard;