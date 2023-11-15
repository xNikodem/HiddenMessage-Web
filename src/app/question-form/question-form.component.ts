import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionDto} from "../Dto/question-dto.model";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;
  selectedType: string = 'text';
  questionHistory: QuestionDto[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      type: ['text'],
      answerText: ['', Validators.maxLength(this.questionForm.value.textMaxLength || 10)],
      textMaxLength: [10], // Domyślna maksymalna długość tekstu
      answerNumber: [''],
      maxNumber: [999], // Domyślna maksymalna wartość liczby
      answerDate: ['']
    });

    this.setupFormChanges();
  }

  setupFormChanges() {
    this.questionForm.get('textMaxLength')?.valueChanges.subscribe(maxLength => {
      if (maxLength != null) {
        this.questionForm.get('answerText')?.setValidators(Validators.maxLength(maxLength));
      } else {
        this.questionForm.get('answerText')?.clearValidators();
      }
      this.questionForm.get('answerText')?.updateValueAndValidity();
    });

    this.questionForm.get('maxNumber')?.valueChanges.subscribe((maxValue) => {
      this.questionForm.get('answerNumber')?.setValidators([Validators.max(maxValue)]);
      this.questionForm.get('answerNumber')?.updateValueAndValidity();
    });
  }

  onTypeChange() {
    this.selectedType = this.questionForm.get('type')?.value;
  }

  onSubmit() {
    console.log('Final questions:', this.questionHistory);
  }

  onNextQuestion() {
    const formValue = this.questionForm.value;
    let answer: string | number | Date;

    switch (formValue.type) {
      case 'text':
        answer = formValue.answerText;
        break;
      case 'number':
        answer = formValue.answerNumber;
        break;
      case 'date':
        answer = formValue.answerDate;
        break;
      default:
        answer = '';
    }

    const newQuestion = new QuestionDto(formValue.question, formValue.type, answer);
    this.questionHistory.push(newQuestion);

    this.questionForm.reset({type: 'text'});
    this.onTypeChange();
  }
}
