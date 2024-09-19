// frontend/src/types/index.ts

export interface User {
  id: string;
  email: string;
  token: string;
}

export interface Chatbot {
  id: string;
  name: string;
  instructions?: string;
  tone?: string;
  token: string;
  documents?: string[];
}

export interface Question {
  id: string;
  question_text: string;
  question_type: 'text' | 'multiple_choice' | 'rating';
  options?: string[];
  order_number: number;
  guidance?: string;
  answer_criteria?: string;
}

export interface SurveyBot {
  id: string;
  user_id: string;
  name: string;
  instructions?: string;
  token: string;
  questions: Question[];
  created_at: string;
  updated_at: string;
}

export interface SurveyResponse {
  id: string;
  survey_bot_id: string;
  respondent_id?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SurveyAnswer {
  question_id: string;
  answer: string;
}

export interface SurveyResult {
  response: SurveyResponse;
  answers: SurveyAnswer[];
}
