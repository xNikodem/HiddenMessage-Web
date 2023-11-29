export class QuestionDto {
  question: string;
  type: string;
  answer: string | number | Date;

  constructor(question: string, type: string, answer: string | number | Date) {
    this.question = question;
    this.type = type;
    this.answer = answer;
  }
}
