import {QuestionDto} from "./question.dto";

export interface PuzzleDto {
  questions: QuestionDto[];
  message: String;
}
