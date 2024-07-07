// calculator.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'; // Import RxJS operators here

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private baseUrl = 'https://localhost:7191/api';

  constructor(private http: HttpClient) { }

  setFirstNumber(location: string, number: number) {
    console.log(`Sending first number ${number} to ${location}`);
    return this.http.post<string[]>(`${this.baseUrl}/calculator/setFirstNumber/${location}`, number)
      .pipe(
        tap(response => console.log('Response from setFirstNumber:', response)),tap(response => console.log('Response from setFirstNumber:', response)),
        catchError(error => {
          console.error('Error in setFirstNumber:', error);
          throw error;
        })
      );
  }
  

  setSecondNumber(location: string, number: number) {
    return this.http.post<string[]>(`${this.baseUrl}/calculator/setSecondNumber/${location}`, number)
      .pipe(
        tap(response => console.log('Response from setSecondNumber:', response)),tap(response => console.log('Response from setSecondNumber:', response)),
        catchError(error => {
          console.error('Error in setSecondNumber:', error);
          throw error;
        })
      );
  }

  performCalculation(location: string, operation: string) {
    const body = JSON.stringify(operation); // Convert operation to JSON string
    return this.http.post<number>(`${this.baseUrl}/calculator/calculation/${location}`, body, {
      headers: { 'Content-Type': 'application/json' } // Ensure correct content type
    })
      .pipe(
        tap(result => console.log('Calculation result:', result)), tap(result => console.log('Response from performCalculation:', result)),
        catchError(error => {
          console.error('Error in performCalculation:', error);
          throw error;
        })
      );
  }
}
