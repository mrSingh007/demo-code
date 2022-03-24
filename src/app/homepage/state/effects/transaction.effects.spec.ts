import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { Transaction } from 'src/app/common/models/transaction.model';
import { TransactionService } from 'src/app/draft/transaction-service/transaction.service';
import * as fromActions from '../actions/transaction.actions';
import { TransactionEffects } from './transaction.effects';
const testTransaction: Transaction = {
  id: 10,
  amount: 10,
  currency: 'USD',
  type: 'ipsum',
};
describe('Transaction Effects', () => {
  let actions$: Observable<Action>;
  let effects: TransactionEffects;
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransactionEffects,
        provideMockStore({}),
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject<TransactionEffects>(TransactionEffects);
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('createTransaction$', () => {
    it('should call success', () => {
      spyOn(service, 'addNewTransaction').and.returnValue(of(testTransaction));
      const trigger = fromActions.CreateTransaction({ data: testTransaction });
      const outcome = fromActions.CreateTransactionSuccess({
        response: testTransaction,
      });
      actions$ = hot('-a', { a: trigger });
      const expected = cold('-b', { b: outcome });
      expect(effects.createTransaction$).toBeObservable(expected);
    });

    it('should call failed', () => {
      spyOn(service, 'addNewTransaction').and.returnValue(
        throwError(() => new Error())
      );
      const trigger = fromActions.CreateTransaction({ data: testTransaction });
      const outcome = fromActions.CreateTransactionFailed();
      actions$ = hot('-a', { a: trigger });
      const expected = cold('-b', { b: outcome });
      expect(effects.createTransaction$).toBeObservable(expected);
    });
  });

  describe('getTransaction$', () => {
    it('should call success', () => {
      const id = 456;
      spyOn(service, 'getTransactionById').and.returnValue(
        of({ ...testTransaction, id })
      );
      const trigger = fromActions.GetTransaction({ id });
      const outcome = fromActions.GetTransactionSuccess({
        response: { ...testTransaction, id },
      });

      actions$ = hot('-a', { a: trigger });
      const expected = cold('-b', { b: outcome });

      expect(effects.getTransaction$).toBeObservable(expected);
    });

    it('should call failed', () => {
      const id = 456;

      spyOn(service, 'getTransactionById').and.returnValue(
        throwError('Invalid')
      );

      const trigger = fromActions.GetTransaction({ id });
      const outcome = fromActions.GetTransactionFailed();

      actions$ = hot('-a', { a: trigger });
      const expected = cold('-b', { b: outcome });

      expect(effects.getTransaction$).toBeObservable(expected);
    });
  });
});
