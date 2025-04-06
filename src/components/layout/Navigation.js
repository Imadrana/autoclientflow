import Link from 'next/link';

const Navigation = () => {
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;