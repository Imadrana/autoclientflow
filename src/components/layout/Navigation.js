'use client';

import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/authService';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          AutoClientFlow
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/contacts" className="hover:underline">
            Contacts
          </Link>
          
          {currentUser ? (
            <button 
              onClick={handleLogout}
              className="hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;