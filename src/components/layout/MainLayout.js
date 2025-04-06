'use client';

import Navigation from './Navigation';
import { useAuth } from '../../contexts/AuthContext';

const MainLayout = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;