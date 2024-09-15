// frontend/src/app/dashboard/create/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

export default function CreateChatbotPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  if (!user) {
    router.push('/login');
  }

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
      router.push(`/dashboard/${response.data.id}`);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Error creating chatbot');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Create Chatbot</h1>
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block text-sm font-medium mb-1">Instructions:</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tone:</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Documents:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {files.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Selected Files:</h3>
            <ul className="list-disc pl-5">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
