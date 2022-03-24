import { Action, createReducer, on } from '@ngrx/store';
import { Transaction } from 'src/app/common/models/transaction.model';
import * as fromActions from './actions/transaction.actions';

export interface TransactionsState {
  entities: Array<Transaction>;
  loading: boolean;
  error: boolean;
}

export const initalState: TransactionsState = {
  entities: [],
  loading: false,
  error: false,
};

const _transactionReducer = createReducer(
  initalState,
  on(fromActions.CreateTransaction, fromActions.GetTransaction, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    fromActions.CreateTransactionSuccess,
    fromActions.GetTransactionSuccess,
    (state, { response }) => ({
      ...state,
      entities: [...state.entities, response],
      loading: false,
    })
  ),
  on(
    fromActions.CreateTransactionFailed,
    fromActions.GetTransactionFailed,
    (state) => ({
      ...state,
      loading: false,
      error: true,
    })
  ),
  on(fromActions.ResetTransactionError, (state) => ({
    ...state,
    error: false,
  }))
);

export function transactionReducer(
  state: TransactionsState | undefined,
  action: Action
) {
  return _transactionReducer(state, action);
}
