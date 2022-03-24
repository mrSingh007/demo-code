import { createAction, props } from "@ngrx/store";
import { Transaction } from "src/app/common/models/transaction.model";

export const CreateTransaction = createAction(
  "[Transaction] Create",
  props<{ data: Transaction }>()
);

export const CreateTransactionFailed = createAction(
  "[Transaction] Create Failed"
);

export const CreateTransactionSuccess = createAction(
  "[Transaction] Create Success",
  props<{ response: Transaction }>()
);

export const GetTransaction = createAction(
  "[Transaction] Get",
  props<{ id: number }>()
);

export const GetTransactionSuccess = createAction(
  "[Transaction] Get Success",
  props<{ response: Transaction }>()
);

export const GetTransactionFailed = createAction("[Transaction] Get Failed");
export const ResetTransactionError = createAction("[Transaction] Reset Error");
