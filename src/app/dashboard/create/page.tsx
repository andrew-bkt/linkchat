// src/app/dashboard/create/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

export default function CreateChatbotPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  if (!user) {
    router.push('/login');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) return;

    const formData = new FormData();
    formData.append('name', name);
    Array.from(files).forEach((file) => formData.append('files', file));

    console.log('Files to upload:', files);
    console.log('FormData:', formData);

    try {
      const response = await api.post('/api/v1/chatbots', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push(`/dashboard/${response.data.id}`);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Error creating chatbot');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Chatbot</h1>
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Chatbot Name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Documents:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80"
        >
          Create Chatbot
        </button>
      </form>
    </div>
  );
}