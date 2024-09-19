// frontend/src/components/SurveyBotForm.tsx

"use client";

import { useState } from 'react';
import { SurveyBot, SurveyQuestion } from '../types';

type SurveyBotFormProps = {
  onSubmit: (data: Partial<SurveyBot>) => void;
  initialData?: SurveyBot;
  isLoading: boolean;
};

const defaultQuestion = (): SurveyQuestion => ({
  question_text: '',
  question_type: 'text',
  options: [],
  order_number: 0,
  guidance: '',
  answer_criteria: ''
});

const SurveyBotForm: React.FC<SurveyBotFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [instructions, setInstructions] = useState(initialData?.instructions || '');
  const [questions, setQuestions] = useState<SurveyQuestion[]>(initialData?.questions || [defaultQuestion()]);

  const handleAddQuestion = () => {
    setQuestions([...questions, defaultQuestion()]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, field: keyof SurveyQuestion, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, instructions, questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
          Instructions
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="mt-2 p-4 border border-gray-300 rounded-md">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Question Text</label>
              <input
                type="text"
                value={question.question_text}
                onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Question Type</label>
              <select
                value={question.question_type}
                onChange={(e) => handleQuestionChange(index, 'question_type', e.target.value)}
                required
                className="mt-1p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="text">Text</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            {question.question_type === 'multiple_choice' && (
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Options</label>
                <input
                  type="text"
                  value={question.options.join(',')}
                  onChange={(e) => handleQuestionChange(index, 'options', e.target.value.split(','))}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <small className="text-gray-600">Comma separated options for multiple choice questions</small>
              </div>
            )}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Order Number</label>
              <input
                type="number"
                value={question.order_number}
                onChange={(e) => handleQuestionChange(index, 'order_number', +e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Guidance</label>
              <textarea
                value={question.guidance}
                onChange={(e) => handleQuestionChange(index, 'guidance', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Answer Criteria</label>
              <textarea
                value={question.answer_criteria}
                onChange={(e) => handleQuestionChange(index, 'answer_criteria', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button type="button" onClick={() => handleRemoveQuestion(index)} className="text-red-600">
              Remove Question
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion} className="mt-4 text-blue-600">
          Add Question
        </button>
      </div>
      <button type="submit" disabled={isLoading} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
        {isLoading ? 'Saving...' : 'Save Survey Bot'}
      </button>
    </form>
  );
};

export default SurveyBotForm;

