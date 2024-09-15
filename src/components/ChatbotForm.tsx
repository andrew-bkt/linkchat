// frontend/src/components/ChatbotForm.tsx

import { useState, useRef } from 'react';
import { Chatbot } from '../types';
import api from '../services/api';

interface ChatbotFormProps {
  chatbot: Chatbot;
  onSave: () => void;
}

export default function ChatbotForm({ chatbot, onSave }: ChatbotFormProps) {
  const [name, setName] = useState(chatbot.name);
  const [instructions, setInstructions] = useState(chatbot.instructions || '');
  const [tone, setTone] = useState(chatbot.tone || '');
  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>(chatbot.documents || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('instructions', instructions || '');
      formData.append('tone', tone || '');
      files.forEach((file) => formData.append('files', file));

      await api.put(`/api/v1/chatbots/${chatbot.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSave();
    } catch (error) {
      console.error('Error updating chatbot:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeExistingFile = async (fileUrl: string) => {
    try {
      await api.delete(`/api/v1/chatbots/${chatbot.id}/files`, { data: { file_url: fileUrl } });
      setExistingFiles(existingFiles.filter(f => f !== fileUrl));
    } catch (error) {
      console.error('Error removing file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Chatbot Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          rows={4}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tone">
          Tone
        </label>
        <input
          id="tone"
          type="text"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Existing Files
        </label>
        {existingFiles.length > 0 ? (
          <ul className="list-disc pl-5">
            {existingFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{file.split('/').pop()}</span>
                <button
                  type="button"
                  onClick={() => removeExistingFile(file)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No existing files</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Add New Files
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80 transition duration-300"
        >
          Select Files
        </button>
        {files.length > 0 && (
          <ul className="mt-2 list-disc pl-5">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition duration-300">
        Save
      </button>
    </form>
  );
}
