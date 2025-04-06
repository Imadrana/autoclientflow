'use client';

import { useEffect, useState } from 'react';
import { getContacts } from '../services/contactService';
import Card from '../components/ui/Card';
import Link from 'next/link';
import ContactCard from '../components/features/ContactCard';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  const [recentContacts, setRecentContacts] = useState([]);
  const [contactCount, setContactCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await getContacts();
        setRecentContacts(contacts.slice(0, 5));
        setContactCount(contacts.length);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="text-center my-12">Loading...</div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-xl font-semibold mb-2">Contact Summary</h2>
              <p className="text-4xl font-bold text-blue-600">{contactCount}</p>
              <p className="text-gray-600">Total Contacts</p>
              <div className="mt-4">
                <Link href="/contacts" className="text-blue-600 hover:underline">
                  View all contacts
                </Link>
              </div>
            </Card>
            
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Contacts</h2>
                <Link href="/contacts/new" className="text-blue-600 hover:underline">
                  Add New
                </Link>
              </div>
              
              {recentContacts.length > 0 ? (
                <div className="space-y-3">
                  {recentContacts.map(contact => (
                    <ContactCard key={contact.id} contact={contact} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No contacts added yet.</p>
              )}
            </Card>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}