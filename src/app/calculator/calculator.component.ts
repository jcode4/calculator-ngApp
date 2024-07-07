// calculator.component.ts
import { Component } from '@angular/core';
import { CalculatorService } from 'src/app/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  
  username: string = '';
  firstNumber: number = 0;
  secondNumber: number = 0;
  selectedOperation: string = '';
  allowedOperations: string[] = [];
  result: number = 0;
  errorMessage: string = '';

  constructor(private calculatorService: CalculatorService) {}

  setFirstNumber() {
    if (this.username && this.firstNumber !== undefined) {
      this.calculatorService.setFirstNumber(this.username, this.firstNumber)
        .subscribe(
          operations => this.allowedOperations = operations,
          error => this.errorMessage = error.error.message
        );
    }
  }

  setSecondNumber() {
    if (this.username && this.firstNumber !== undefined) {
      this.calculatorService.setSecondNumber(this.username, this.secondNumber)
        .subscribe(
          
          operations =>{
            console.log('Operations after setting second number:', operations);
            this.allowedOperations = operations;
          } ,
          error => {
            console.error('Error setting second number:', error);
            this.errorMessage = error.error.message;
          }
        );
    }
  }

  performCalculation() {
    if (this.username && this.selectedOperation) {
      this.calculatorService.performCalculation(this.username, this.selectedOperation)
        .subscribe(
          result => this.result = result,
          error => this.errorMessage = error.error.message
        );
    }
  }

  clearNumbers() {
    this.username = '';
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.selectedOperation = '';
    this.allowedOperations = [];
    this.result = 0;
    this.errorMessage = '';
  }
}
