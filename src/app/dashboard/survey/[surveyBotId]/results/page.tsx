// frontend/src/app/dashboard/survey/[surveyBotId]/results/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../../context/AuthContext';
import api from '../../../../../services/api';
import { SurveyBot, SurveyResult } from '../../../../../types';

export default function SurveyResultsPage() {
  const { user } = useAuth();
  const params = useParams();
  const [surveyBot, setSurveyBot] = useState<SurveyBot | null>(null);
  const [results, setResults] = useState<SurveyResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchSurveyBotAndResults();
    }
  }, [user]);

  const fetchSurveyBotAndResults = async () => {
    try {
      const [surveyBotResponse, resultsResponse] = await Promise.all([
        api.get(`/api/v1/surveybots/${params.surveyBotId}`),
        api.get(`/api/v1/surveybots/${params.surveyBotId}/results`)
      ]);
      setSurveyBot(surveyBotResponse.data);
      setResults(resultsResponse.data);
    } catch (error) {
      console.error('Error fetching survey bot and results:', error);
      setErrorMessage('Failed to load survey results');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading results...</div>;
  if (!surveyBot) return <div>Survey bot not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{surveyBot.name} Results</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {results.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          <div>
            <p className="mb-4">Total responses: {results.length}</p>
            {surveyBot.questions.map((question, qIndex) => (
              <div key={question.id} className="mb-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Question {qIndex + 1}: {question.question_text}
                  </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  {question.question_type === 'text' ? (
                    <ul className="divide-y divide-gray-200">
                      {results.map((result, rIndex) => (
                        <li key={rIndex} className="py-4 sm:px-6">
                          {result.answers.find(a => a.question_id === question.id)?.answer}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-5 sm:p-6">
                      {question.options.map((option, oIndex) => {
                        const count = results.filter(r => 
                          r.answers.find(a => a.question_id === question.id && a.answer === option)
                        ).length;
                        const percentage = (count / results.length) * 100;
                        return (
                          <div key={oIndex} className="mb-2">
                            <div className="flex justify-between mb-1">
                              <span>{option}</span>
                              <span>{count} ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
