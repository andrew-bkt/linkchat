'use client';

import React, { useState } from 'react';
import {
  PlusIcon,
  XCircleIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { SurveyBot, Question } from '../types';

interface SurveyBotFormProps {
  initialData?: SurveyBot;
  onSubmit: (data: Partial<SurveyBot>) => Promise<void>;
  isLoading: boolean;
}

export default function SurveyBotForm({
  initialData,
  onSubmit,
  isLoading,
}: SurveyBotFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [instructions, setInstructions] = useState(
    initialData?.instructions || ''
  );
  const [questions, setQuestions] = useState<Question[]>(
    initialData?.questions || [
      {
        id: '',
        question_text: '',
        question_type: 'text',
        options: [''],
        order_number: 1,
        guidance: '',
        answer_criteria: '',
      },
    ]
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<boolean[]>(
    questions.map(() => false)
  );

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: '',
        question_text: '',
        question_type: 'text',
        options: [''],
        order_number: questions.length + 1,
        guidance: '',
        answer_criteria: '',
      },
    ]);
    setExpandedQuestions([...expandedQuestions, false]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);

    const newExpandedQuestions = [...expandedQuestions];
    newExpandedQuestions.splice(index, 1);
    setExpandedQuestions(newExpandedQuestions);
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

  const toggleQuestionExpansion = (index: number) => {
    const newExpandedQuestions = [...expandedQuestions];
    newExpandedQuestions[index] = !newExpandedQuestions[index];
    setExpandedQuestions(newExpandedQuestions);
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
          options:
            q.question_type === 'multiple_choice' ? q.options : undefined,
        })),
      });
    } catch (error: any) {
      console.error('Error submitting survey bot:', error);
      setErrorMessage(
        error.response?.data?.detail ||
          error.message ||
          'Error submitting survey bot'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Create Survey Bot
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Survey Bot Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter survey bot name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Provide any instructions for the survey bot"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Questions</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-500 focus:outline-none"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Question
          </button>
        </div>

        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="mb-6 border border-gray-200 rounded-lg"
          >
            {expandedQuestions[questionIndex] ? (
              <div className="bg-gray-50 px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Question {questionIndex + 1}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => toggleQuestionExpansion(questionIndex)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <ChevronUpIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`question_text_${questionIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Question Text
                    </label>
                    <input
                      id={`question_text_${questionIndex}`}
                      type="text"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter question text"
                      value={question.question_text}
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          'question_text',
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`question_type_${questionIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Question Type
                    </label>
                    <select
                      id={`question_type_${questionIndex}`}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={question.question_type}
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          'question_type',
                          e.target.value
                        )
                      }
                    >
                      <option value="text">Text</option>
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                  {question.question_type === 'multiple_choice' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Options
                      </label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center mt-2">
                          <input
                            type="text"
                            className="flex-grow shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeOption(questionIndex, optionIndex)
                            }
                            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addOption(questionIndex)}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-500 focus:outline-none"
                      >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Option
                      </button>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor={`guidance_${questionIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Guidance
                    </label>
                    <textarea
                      id={`guidance_${questionIndex}`}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide guidance for this question"
                      value={question.guidance}
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          'guidance',
                          e.target.value
                        )
                      }
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor={`answer_criteria_${questionIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Answer Criteria
                    </label>
                    <textarea
                      id={`answer_criteria_${questionIndex}`}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Specify answer criteria"
                      value={question.answer_criteria}
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          'answer_criteria',
                          e.target.value
                        )
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {question.question_text || 'Untitled Question'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Type: {question.question_type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => toggleQuestionExpansion(questionIndex)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleQuestionExpansion(questionIndex)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <ChevronDownIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-500 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}