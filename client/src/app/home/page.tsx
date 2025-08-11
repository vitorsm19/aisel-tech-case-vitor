'use client';

import MainLayout from '@/components/layout/main-layout';
import PatientsList from '@/components/patients-list';

export default function HomePage() {
  return (
    <MainLayout>
      <PatientsList />
    </MainLayout>
  );
}