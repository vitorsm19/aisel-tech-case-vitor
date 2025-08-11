'use client';

import Header from '@/components/header';
import PatientsList from '@/components/patients-list';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PatientsList />
      </main>
    </div>
  );
}