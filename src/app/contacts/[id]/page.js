'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getContact, deleteContact } from '../../../services/contactService';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';

export default function ContactDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContact(id);
        setContact(data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setDeleting(true);
      try {
        await deleteContact(id);
        router.push('/contacts');
      } catch (error) {
        console.error('Error deleting contact:', error);
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center my-12">Loading...</div>
      </MainLayout>
    );
  }

  if (!contact) {
    return (
      <MainLayout>
        <div className="text-center my-12">
          <p className="text-lg text-gray-600">Contact not found</p>
          <Link href="/contacts">
            <Button className="mt-4">Back to Contacts</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{contact.name}</h1>
          <div className="space-x-2">
            <Link href={`/contacts/${id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm text-gray-500">Company</h2>
              <p className="text-lg">{contact.company || 'N/A'}</p>
            </div>
            
            <div>
              <h2 className="text-sm text-gray-500">Email</h2>
              <p className="text-lg">{contact.email || 'N/A'}</p>
            </div>
            
            <div>
              <h2 className="text-sm text-gray-500">Phone</h2>
              <p className="text-lg">{contact.phone || 'N/A'}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-2">Notes</h2>
          <p className="whitespace-pre-line">{contact.notes || 'No notes added.'}</p>
        </Card>
      </div>
    </MainLayout>
  );
}