export interface Choice {
  text: string;
  explanation: string;
}

export interface Question {
  id: number;
  body: string;
  choices: readonly [Choice, Choice, Choice, Choice];
  correctChoiceIndex: 0 | 1 | 2 | 3;
} 