import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { TransactionService } from "src/app/draft/transaction-service/transaction.service";
import * as fromActions from "../actions/transaction.actions";

@Injectable()
export class TransactionEffects {
  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CreateTransaction),
      mergeMap(({ data }) =>
        this.service.addNewTransaction(data).pipe(
          map((data) =>
            fromActions.CreateTransactionSuccess({ response: data })
          ),
          catchError(() => of(fromActions.CreateTransactionFailed()))
        )
      )
    )
  );

  getTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GetTransaction),
      mergeMap(({ id }) =>
        this.service.getTransactionById(id).pipe(
          map((res) => fromActions.GetTransactionSuccess({ response: res })),
          catchError(() => of(fromActions.GetTransactionFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: TransactionService) {}
}
