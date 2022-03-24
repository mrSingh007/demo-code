import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReducerStateSlice } from "src/app/common/models/reducer.model";
import { TransactionsState } from "../transaction.reducer";

export const getTransactionState = createFeatureSelector<TransactionsState>(
  ReducerStateSlice.transaction
);

export const getTransactions = createSelector(
  getTransactionState,
  (state) => state.entities
);

export const getError = createSelector(
  getTransactionState,
  (state) => state.error
);
