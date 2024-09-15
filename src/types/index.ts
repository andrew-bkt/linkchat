// src/types/index.ts

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