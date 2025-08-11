'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

export default function PatientDetailPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [error, setError] = useState('');

  const { token, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (isAuthenticated && token && id) {
      fetchPatient();
    }
  }, [isAuthenticated, token, id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(`http://localhost:3001/api/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const patientData = response.data;
      setPatient(patientData);
      setFirstName(patientData.firstName);
      setLastName(patientData.lastName);
      setEmail(patientData.email);
      setPhoneNumber(patientData.phoneNumber);
      setDob(patientData.dob);
    } catch (error: any) {
      console.error('Error fetching patient:', error);
      if (error.response?.status === 404) {
        setError('Patient not found');
      } else {
        setError('Failed to fetch patient details');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await axios.put(
        `http://localhost:3001/api/patients/${id}`,
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          dob: dob.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedPatient = response.data;
      setPatient(updatedPatient);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating patient:', error);
      if (error.response?.status === 403) {
        setError('You do not have permission to edit patients');
      } else {
        setError('Failed to update patient. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError('');

    try {
      await axios.delete(`http://localhost:3001/api/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.push('/home');
    } catch (error: any) {
      console.error('Error deleting patient:', error);
      if (error.response?.status === 403) {
        setError('You do not have permission to delete patients');
      } else {
        setError('Failed to delete patient. Please try again.');
      }
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    if (patient) {
      setFirstName(patient.firstName);
      setLastName(patient.lastName);
      setEmail(patient.email);
      setPhoneNumber(patient.phoneNumber);
      setDob(patient.dob);
    }
    setIsEditing(false);
    setErrors({});
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-gray-600">Please log in to view patient details.</p>
              <Button
                onClick={() => router.push('/login')}
                className="mt-4"
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading patient details...</p>
      </div>
    );
  }

  if (error && !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p className="text-gray-600">{error}</p>
              <Button
                onClick={() => router.push('/home')}
                className="mt-4"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push('/home')}
            className="mb-4"
          >
            ← Back to Patients
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {isEditing ? 'Edit Patient' : 'Patient Details'}
              </CardTitle>
              {isAdmin && !isEditing && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete
                          the patient record for {patient?.firstName} {patient?.lastName}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={deleting}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {deleting ? 'Deleting...' : 'Delete Patient'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{patient?.firstName}</p>
                  )}
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{patient?.lastName}</p>
                  )}
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{patient?.email}</p>
                )}
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={errors.phoneNumber ? 'border-red-500' : ''}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{patient?.phoneNumber}</p>
                )}
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                {isEditing ? (
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={errors.dob ? 'border-red-500' : ''}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{patient?.dob}</p>
                )}
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Patient ID</Label>
                <p className="p-2 bg-gray-50 rounded">{patient?.id}</p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {isEditing && isAdmin && (
                <div className="flex gap-4">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}