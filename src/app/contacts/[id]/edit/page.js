'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getContact, updateContact } from '../../../../services/contactService';
import ContactForm from '../../../../components/features/ContactForm';
import MainLayout from '../../../../components/layout/MainLayout';

export default function EditContactPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateContact(id, formData);
      router.push(`/contacts/${id}`);
    } catch (error) {
      console.error('Error updating contact:', error);
      setIsSubmitting(false);
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
        <div className="text-center my-12">Contact not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Contact</h1>
        <ContactForm 
          initialData={contact} 
          onSubmit={handleSubmit} 
          buttonText={isSubmitting ? 'Saving...' : 'Update Contact'} 
        />
      </div>
    </MainLayout>
  );
}