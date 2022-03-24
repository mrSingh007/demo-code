import { Transaction } from "src/app/common/models/transaction.model";
import { TransactionsState } from "../transaction.reducer";
import * as fromSelectors from "./transaction.selectors";
const testTransaction: Transaction = {
  id: 40,
  amount: 0,
  currency: "EURO",
  type: "lorem",
};
const initialState: TransactionsState = {
  entities: [testTransaction],
  error: false,
  loading: false,
};
describe("Transaction Selectors", () => {
  it("should select the state", () => {
    const state = fromSelectors.getTransactionState.projector(initialState);
    expect(state.entities.length).toEqual(1);
    expect(state.entities[0].id).toEqual(40);
  });
  it("should select the entities", () => {
    const entities = fromSelectors.getTransactions.projector(initialState);
    expect(entities.length).toEqual(1);
    expect(entities).toEqual([testTransaction]);
  });
  it("should select the error", () => {
    const error = fromSelectors.getError.projector({
      ...initialState,
      error: true,
    });
    expect(error).toEqual(true);
  });
});
