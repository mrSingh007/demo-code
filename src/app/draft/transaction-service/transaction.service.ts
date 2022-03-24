import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../../common/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly API_URL = environment.backendUrl;
  constructor(private http: HttpClient) {}

  addNewTransaction(data: Transaction): Observable<Transaction> {
    const url = `${this.API_URL}/bookingservice/transaction/${data.id}`;
    console.log('TODO Mocked Data', url);
    // return this.http.put<void>(url, data);
    return of(data);
  }

  getTransactionById(id: number): Observable<Transaction> {
    const url = `${this.API_URL}/bookingservice/transaction/${id}`;
    console.log('TODO Mocked Data');
    return of({ amount: 12, currency: 'EURO', type: '12', id });
    //return this.http.get<Transaction>(url);
  }
}
