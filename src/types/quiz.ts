export interface Choice {
  text: string;
  explanation: string;
}

export interface Question {
  id: number;
  body: string;
  imageUrl?: string;
  choices: Choice[];
  correctChoiceIndex: number;
}

export interface Chapter {
  id: string;
  title: string;
  questions: Question[];
} 