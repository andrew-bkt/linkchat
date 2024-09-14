// src/types/index.ts

export interface User {
    id: string;
    email: string;
    token: string;
  }
  
  export interface Chatbot {
    id: string;
    name: string;
    token: string;
    // Add other chatbot properties as needed
  }