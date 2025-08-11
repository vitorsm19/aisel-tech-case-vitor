'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { token, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const fetchPatients = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('http://localhost:3001/api/patients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to fetch patients. Make sure the backend is running on http://localhost:3001');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (patientId: number, patientName: string) => {
    setDeleting(patientId);
    setError(null);

    try {
      await axios.delete(`http://localhost:3001/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPatients(patients.filter(p => p.id !== patientId));
    } catch (error: any) {
      console.error('Error deleting patient:', error);
      if (error.response?.status === 403) {
        setError('You do not have permission to delete patients');
      } else {
        setError(`Failed to delete ${patientName}. Please try again.`);
      }
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchPatients();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-600">
          Please log in to view patients
        </h2>
        <p className="text-gray-500 mb-8">
          You need to be authenticated to access the patient management system
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          {user?.role === 'admin' && (
            <Button
              onClick={() => router.push('/patient/new')}
              className="mr-4"
            >
              Create New Patient
            </Button>
          )}
          <Button
            variant="outline"
            onClick={fetchPatients}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh Patients'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <p className="text-lg">Loading patients...</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Patients ({patients.length})
          </h2>
          
          {patients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <div 
                  key={patient.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => router.push(`/patient/${patient.id}`)}
                  >
                    <h3 className="font-semibold text-lg">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-gray-600 text-sm">ID: {patient.id}</p>
                    <p className="text-gray-600 text-sm">{patient.email}</p>
                    <p className="text-gray-600 text-sm">{patient.phoneNumber}</p>
                    <p className="text-gray-600 text-sm">DOB: {patient.dob}</p>
                  </div>
                  
                  {user?.role === 'admin' && (
                    <div className="absolute top-2 right-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete
                              the patient record for {patient.firstName} {patient.lastName}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(patient.id, `${patient.firstName} ${patient.lastName}`)}
                              disabled={deleting === patient.id}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {deleting === patient.id ? 'Deleting...' : 'Delete Patient'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No patients found</p>
          )}
        </div>
      )}
    </>
  );
}