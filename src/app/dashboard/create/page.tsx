// frontend/src/app/dashboard/create/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { DocumentPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CreateChatbotPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('instructions', instructions);
    formData.append('tone', tone);
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await api.post('/api/v1/chatbots', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.id) {
        router.push('/dashboard');
      } else {
        throw new Error('Chatbot ID not received');
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.detail || error.message || 'Error creating chatbot'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create New Chatbot</h2>
          <p className="mt-2 text-sm text-gray-600">Fill in the details below to get started.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Chatbot Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Chatbot Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="instructions" className="sr-only">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={4}
                className="appearance-none relative block w-full px-3 py-2 border border-t-0 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="tone" className="sr-only">
                Tone
              </label>
              <input
                id="tone"
                name="tone"
                type="text"
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-t-0 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                Upload Documents
              </label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <DocumentPlusIcon className="h-5 w-5 mr-2" />
                  Upload Files
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>
            </div>
            {files.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
                <ul className="mt-2 space-y-1">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-md"
                    >
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Chatbot...
                </span>
              ) : (
                'Create Chatbot'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}