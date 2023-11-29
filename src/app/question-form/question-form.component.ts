import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {QuestionDto} from "../dto/question.dto";
import * as FormConst from "../constants/form.const";
import {SnackbarService} from "../notifications/snackbar.service";


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  public questionForm!: FormGroup;
  public selectedType: string = 'text';
  public pinPattern: string = '[0-9]{3}';
  public questionNumber: number = 1;
  private questionHistory: QuestionDto[] = [];

  constructor(private fb: FormBuilder,
              private snackbarService: SnackbarService) {
  }

  public ngOnInit(): void {
    this.questionForm = this.fb.group({
      description: ['', Validators.required],
      type: [FormConst.TYPE_TEXT],
      answerText: [''],
      pinLength: [FormConst.MIN_PIN_LENGTH],
      pin: [''],
      textMaxLength: [FormConst.DEFAULT_TEXT_MAX_LENGTH],
      answerNumber: [''],
      maxNumber: [FormConst.DEFAULT_MAX_NUMBER],
      answerDate: ['']
    });

    this.setupFormChanges();
  }

  public validateMaxNumber() {
    const maxNumber = this.questionForm.get(FormConst.NAME_MAX_NUMBER)?.value;
    let answerNumber = this.questionForm.get(FormConst.NAME_ANSWER_NUMBER)?.value;

    if (answerNumber > maxNumber) {
      this.questionForm.get(FormConst.NAME_ANSWER_NUMBER)?.setValue(maxNumber);
    }
  }

  public onTypeChange(): void {
    this.selectedType = this.questionForm.get(FormConst.TYPE)?.value;
  }

  public onSubmit(): void {
    console.log('Final questions:', this.questionHistory);
    this.questionNumber = 1;
  }

  public onNextQuestion(): void {
    if (this.isFormValid()) {
      const formValue = this.questionForm.value;
      const newQuestion = new QuestionDto(formValue.question, formValue.type, this.getCurrentAnswer(formValue));
      this.questionHistory.push(newQuestion);

      this.questionForm.patchValue({
        description: '',
        answerText: '',
        answerNumber: '',
        answerDate: '',
        pin: ''
      });

      this.onTypeChange();
      this.questionNumber++;
    } else {
      this.snackbarService.openSnackbar('Fill the fields', 'Close', 3000);
    }
  }

  public validateMaxPinLength(): void {
    let currentPinLength = this.questionForm.get(FormConst.NAME_PIN_LENGTH)?.value;
    if (currentPinLength > FormConst.MAX_PIN_LENGTH) {
      this.questionForm.get(FormConst.NAME_PIN_LENGTH)?.setValue(FormConst.MAX_PIN_LENGTH);
    } else if (currentPinLength < FormConst.MIN_PIN_LENGTH) {
      this.questionForm.get(FormConst.NAME_PIN_LENGTH)?.setValue(FormConst.MIN_PIN_LENGTH);
    }
  }

  public filterPinInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  private setupFormChanges(): void {
    this.questionForm.get(FormConst.NAME_TEXT_MAX)?.valueChanges.subscribe(this.handleTextMaxLengthChange);
    this.questionForm.get(FormConst.NAME_MAX_NUMBER)?.valueChanges.subscribe(this.handleMaxNumberChange);
    this.questionForm.get(FormConst.NAME_PIN_LENGTH)?.valueChanges.subscribe(this.updatePinPattern);
  }

  private handleTextMaxLengthChange = (maxLength: number): void => {
    const adjustedMaxLength = maxLength < 1 ? 1 : maxLength;
    this.questionForm.get(FormConst.NAME_ANSWER_TEXT)?.setValidators(Validators.maxLength(adjustedMaxLength));
    this.questionForm.get(FormConst.NAME_ANSWER_TEXT)?.updateValueAndValidity();
    this.adjustTextLength(adjustedMaxLength);
  }

  private handleMaxNumberChange = (maxNumber: number): void => {
    this.questionForm.get(FormConst.NAME_ANSWER_NUMBER)?.setValidators(Validators.max(maxNumber || FormConst.DEFAULT_MAX_NUMBER));
    this.questionForm.get(FormConst.NAME_ANSWER_NUMBER)?.updateValueAndValidity();

    let currentNumber = this.questionForm.get(FormConst.NAME_ANSWER_NUMBER)?.value;
    if (currentNumber !== null && currentNumber !== '' && currentNumber > maxNumber) {
      this.questionForm.get(FormConst.NAME_ANSWER_NUMBER)?.setValue(maxNumber);
    }
  }

  private adjustTextLength(maxLength: number): void {
    let currentText = this.questionForm.get(FormConst.NAME_ANSWER_TEXT)?.value;
    if (currentText && currentText.length > maxLength) {
      this.questionForm.get(FormConst.NAME_ANSWER_TEXT)?.setValue(currentText.substring(0, maxLength));
    }
  }

  private updatePinPattern = (): void => {
    const length = Math.min(this.questionForm.get(FormConst.NAME_PIN_LENGTH)?.value || FormConst.MIN_PIN_LENGTH, FormConst.MAX_PIN_LENGTH);
    this.pinPattern = `[0-9]{${length}}`;
    this.questionForm.get(FormConst.TYPE_PIN)?.setValidators([Validators.pattern(this.pinPattern)]);
    this.questionForm.get(FormConst.TYPE_PIN)?.updateValueAndValidity();
    this.adjustPinValue(length);
  }

  private adjustPinValue(length: number): void {
    let currentPin = this.questionForm.get(FormConst.TYPE_PIN)?.value;
    if (currentPin && currentPin.length > length) {
      this.questionForm.get(FormConst.TYPE_PIN)?.setValue(currentPin.substring(0, length));
    }
  }

  private getCurrentAnswer(formValue: any): string | number | Date {
    switch (formValue.type) {
      case FormConst.TYPE_TEXT:
        return formValue.answerText;
      case FormConst.TYPE_NUMBER:
        return formValue.answerNumber;
      case FormConst.TYPE_DATE:
        return formValue.answerDate;
      case FormConst.TYPE_PIN:
        return formValue.pin;
      default:
        return '';
    }
  }

  private isFormValid(): boolean {
    const formValue = this.questionForm.value;
    console.log(this.questionForm.value);
    if (!formValue.description) {

      return false;
    }

    switch (formValue.type) {
      case FormConst.TYPE_TEXT:
        return !!formValue.answerText;
      case FormConst.TYPE_NUMBER:
        return formValue.answerNumber !== null && formValue.answerNumber !== '';
      case FormConst.TYPE_DATE:
        return !!formValue.answerDate;
      case FormConst.TYPE_PIN:
        return formValue.pin && formValue.pin.length === formValue.pinLength;
      default:
        return true;
    }
  }
}
