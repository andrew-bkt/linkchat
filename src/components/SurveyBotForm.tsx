// frontend/src/components/SurveyBotForm.tsx

'use client';


import React, { useState } from 'react';
import { PlusIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { SurveyBot, Question } from '../types';

interface SurveyBotFormProps {
  initialData?: SurveyBot;
  onSubmit: (data: Partial<SurveyBot>) => Promise<void>;
  isLoading: boolean;
}

export default function SurveyBotForm({ initialData, onSubmit, isLoading }: SurveyBotFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [questions, setQuestions] = useState<Question[]>(initialData?.questions || [
    { id: '', question_text: '', question_type: 'text', options: [''], order_number: 1, guidance: '', answer_criteria: '' }
  ]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: '', question_text: '', question_type: 'text', options: [''], order_number: questions.length + 1, guidance: '', answer_criteria: '' }]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await onSubmit({
        name,
        instructions,
        questions: questions.map((q, index) => ({
          ...q,
          order_number: index + 1,
          options: q.question_type === 'multiple_choice' ? q.options : undefined,
        })),
      });
    } catch (error: any) {
      console.error('Error submitting survey bot:', error);
      setErrorMessage(error.response?.data?.detail || error.message || 'Error submitting survey bot');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      <div className="relative">
        <input
          id="name"
          name="name"
          type="text"
          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
          placeholder="Survey bot name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
          Survey Bot Name
        </label>
      </div>
      <div className="relative">
        <textarea
          id="instructions"
          name="instructions"
          className="peer placeholder-transparent h-20 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>
        <label htmlFor="instructions" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
          Instructions
        </label>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Questions</h3>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mt-4 border-t border-gray-200 pt-4">
            <div className="relative">
              <input
                type="text"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                placeholder="Question text"
                value={question.question_text}
                onChange={(e) => handleQuestionChange(questionIndex, 'question_text', e.target.value)}
                required
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Question Text
              </label>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Question Type</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={question.question_type}
                onChange={(e) => handleQuestionChange(questionIndex, 'question_type', e.target.value)}
              >
                <option value="text">Text</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            {question.question_type === 'multiple_choice' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Options</label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex mt-2">
                    <input
                      type="text"
                      className="flex-grow mr-2 p-2 border border-gray-300 rounded-md"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(questionIndex, optionIndex)}
                      className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(questionIndex)}
                  className="mt-2 p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="relative mt-4">
              <textarea
                className="peer placeholder-transparent h-20 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                placeholder="Guidance"
                value={question.guidance}
                onChange={(e) => handleQuestionChange(questionIndex, 'guidance', e.target.value)}
              ></textarea>
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Guidance
              </label>
            </div>
            <div className="relative mt-4">
              <textarea
                className="peer placeholder-transparent h-20 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                placeholder="Answer Criteria"
                value={question.answer_criteria}
                onChange={(e) => handleQuestionChange(questionIndex, 'answer_criteria', e.target.value)}
              ></textarea>
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Answer Criteria
              </label>
            </div>
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="mt-4 p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="mt-4 p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
        >
          Add Question
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
      <div className="relative">
        <button
          type="submit"
          className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
