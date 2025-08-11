'use client';

import Header from '@/components/header';
import PatientsList from '@/components/patients-list';

export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <Header />
        <PatientsList />
      </main>
    </div>
  );
}