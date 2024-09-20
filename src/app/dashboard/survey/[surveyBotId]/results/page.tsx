'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../../context/AuthContext';
import api from '../../../../../services/api';
import { SurveyBot, SurveyResult, SurveyAnswer } from '../../../../../types';

export default function SurveyResultsPage() {
  const { user } = useAuth();
  const params = useParams();
  const [surveyBot, setSurveyBot] = useState<SurveyBot | null>(null);
  const [results, setResults] = useState<SurveyResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

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
      if (surveyBotResponse.data.questions.length > 0) {
        setSelectedQuestion(surveyBotResponse.data.questions[0].id);
      }
    } catch (error) {
      console.error('Error fetching survey bot and results:', error);
      setErrorMessage('Failed to load survey results');
    } finally {
      setIsLoading(false);
    }
  };

  const getQuestionAnswers = (questionId: string): SurveyAnswer[] => {
    return results.flatMap(result => 
      result.answers.filter(answer => answer.question_id === questionId)
    );
  };

  const getAnswerMetrics = (questionId: string) => {
    const answers = getQuestionAnswers(questionId);
    const totalAnswers = answers.length;
    const answerCounts: {[key: string]: number} = {};
    
    answers.forEach(answer => {
      answerCounts[answer.raw_answer] = (answerCounts[answer.raw_answer] || 0) + 1;
    });

    return Object.entries(answerCounts).map(([answer, count]) => ({
      answer,
      count,
      percentage: (count / totalAnswers) * 100
    }));
  };

  if (isLoading) return <div className="text-center py-10">Loading results...</div>;
  if (!surveyBot) return <div className="text-center py-10">Survey bot not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{surveyBot.name} Results</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {results.length === 0 ? (
          <p className="text-center py-10">No results yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Survey Overview</h2>
              <p>Total responses: {results.length}</p>
              <p>Questions: {surveyBot.questions.length}</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Questions:</h3>
                {surveyBot.questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => setSelectedQuestion(question.id)}
                    className={`block w-full text-left py-2 px-3 rounded ${
                      selectedQuestion === question.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    {index + 1}. {question.question_text}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="col-span-2 bg-white shadow rounded-lg p-6">
              {selectedQuestion && (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    {surveyBot.questions.find(q => q.id === selectedQuestion)?.question_text}
                  </h2>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Answer Metrics:</h3>
                    {getAnswerMetrics(selectedQuestion).map((metric, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span>{metric.answer}</span>
                          <span>{metric.count} ({metric.percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${metric.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Individual Responses:</h3>
                    <div className="space-y-4">
                      {getQuestionAnswers(selectedQuestion).map((answer, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <p><strong>Raw Answer:</strong> {answer.raw_answer}</p>
                          <p><strong>AI Interpretation:</strong> {answer.ai_interpretation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
