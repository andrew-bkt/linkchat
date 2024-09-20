'use client';

import Link from 'next/link';
import { SurveyBot } from '../types';
import { ClipboardDocumentListIcon, TrashIcon, PencilIcon, ChartBarIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface SurveyBotCardProps {
  surveyBot: SurveyBot;
  deleteSurveyBot: (id: string) => void;
}

export default function SurveyBotCard({ surveyBot, deleteSurveyBot }: SurveyBotCardProps) {
  const copySurveyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/survey-chat/${surveyBot.token}`);
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
            <ClipboardDocumentListIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{surveyBot.name}</h2>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <Link href={`/survey-chat/${surveyBot.token}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Take survey
          </Link>
          <button
            onClick={copySurveyLink}
            className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Copy survey link"
          >
            <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="mt-3 flex space-x-3">
          <Link href={`/dashboard/survey/${surveyBot.id}`}>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <PencilIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Edit
            </button>
          </Link>
          <Link href={`/dashboard/survey/${surveyBot.id}/results`}>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <ChartBarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Results
            </button>
          </Link>
          <button
            onClick={() => deleteSurveyBot(surveyBot.id)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
