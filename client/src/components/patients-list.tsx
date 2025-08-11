"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/contexts/auth-context";
import { usePermissions } from "@/hooks/usePermissions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";

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
  const { isAdmin } = usePermissions();
  const router = useRouter();

  const fetchPatients = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:3001/api/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError(
        "Failed to fetch patients. Make sure the backend is running on http://localhost:3001"
      );
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
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(patients.filter((p) => p.id !== patientId));
    } catch (error) {
      console.error("Error deleting patient:", error);
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        setError("You do not have permission to delete patients");
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Patients ({patients.length})
            </h2>
            {isAdmin && (
              <Button
                onClick={() => router.push("/patient/new")}
                className="gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="sm:hidden">New Patient</span>
                <span className="hidden sm:inline">Create New Patient</span>
              </Button>
            )}
          </div>

          {patients.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 relative group"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => router.push(`/patient/${patient.id}`)}
                  >
                    {/* Patient name */}
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg sm:text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        ID: {patient.id}
                      </p>
                    </div>

                    {/* Patient info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm text-gray-600 truncate">
                          {patient.email}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">
                          {patient.phoneNumber}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 01-.293.293H16a2 2 0 01-2 2H8a2 2 0 01-2-2v-2.586a1 1 0 01.293-.707L12.707 9H15a1 1 0 001-1V7h-8z"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">
                          {new Date(patient.dob).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delete button for admin */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-md">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              <strong>
                                {patient.firstName} {patient.lastName}
                              </strong>
                              ? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                            <AlertDialogCancel className="w-full sm:w-auto">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(
                                  patient.id,
                                  `${patient.firstName} ${patient.lastName}`
                                )
                              }
                              disabled={deleting === patient.id}
                              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                            >
                              {deleting === patient.id
                                ? "Deleting..."
                                : "Delete Patient"}
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
