'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addContact } from '../../../services/contactService';
import ContactForm from '../../../components/features/ContactForm';
import MainLayout from '../../../components/layout/MainLayout';

export default function NewContactPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await addContact(formData);
      router.push('/contacts');
    } catch (error) {
      console.error('Error adding contact:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Contact</h1>
        <ContactForm 
          onSubmit={handleSubmit} 
          buttonText={isSubmitting ? 'Saving...' : 'Add Contact'} 
        />
      </div>
    </MainLayout>
  );
}