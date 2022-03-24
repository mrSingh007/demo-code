import { Transaction } from "../../common/models/transaction.model";
import * as fromActions from "./actions/transaction.actions";
import * as fromReducer from "./transaction.reducer";

describe("transactionReducer", () => {
  const testTransaction: Transaction = {
    id: 0,
    amount: 0,
    currency: "EURO",
    type: "lorem",
    parent_id: 40,
  };

  describe("unknown action", () => {
    it("should return default state", () => {
      const { initalState } = fromReducer;
      const action = {
        type: "Unknown",
      };
      const state = fromReducer.transactionReducer(initalState, action);
      expect(state).toBe(initalState);
    });
  });

  describe("createTransaction action", () => {
    it("should set loading", () => {
      const { initalState } = fromReducer;
      const action = fromActions.CreateTransaction({ data: testTransaction });
      const state = fromReducer.transactionReducer(initalState, action);
      expect(state).toEqual({
        ...initalState,
        loading: true,
      });
    });

    it("should append transaction", () => {
      const { initalState } = fromReducer;
      const expectedState: fromReducer.TransactionsState = {
        ...initalState,
        entities: [...initalState.entities, testTransaction],
      };
      const action = fromActions.CreateTransactionSuccess({
        response: testTransaction,
      });
      const state = fromReducer.transactionReducer(initalState, action);
      expect(state).toEqual(expectedState);
    });
    it("should set error", () => {
      const { initalState } = fromReducer;
      const action = fromActions.CreateTransactionFailed();
      const state = fromReducer.transactionReducer(initalState, action);
      expect(state).toEqual({
        ...initalState,
        error: true,
      });
    });
  });

  describe("GetTransaction action", () => {
    it("should set loading", () => {
      const { initalState } = fromReducer;
      const action = fromActions.GetTransaction({ id: 44 });
      const state = fromReducer.transactionReducer(initalState, action);
      expect(state).toEqual({
        ...initalState,
        loading: true,
      });
    });

    it("should append transaction", () => {
      const { initalState } = fromReducer;
      const expectedState: fromReducer.TransactionsState = {
        ...initalState,
        entities: [...initalState.entities, testTransaction],
      };
      const action = fromActions.GetTransactionSuccess({
        response: testTransaction,
      });
      const state = fromReducer.transactionReducer(initalState, action);
      expect(state).toEqual(expectedState);
    });
    it("should set error", () => {
      const { initalState } = fromReducer;
      const action = fromActions.GetTransactionFailed();
      const state = fromReducer.transactionReducer(initalState, action);
      expect(state).toEqual({
        ...initalState,
        error: true,
      });
    });
  });

  describe("ResetTransactionError action", () => {
    it("should reset error", () => {
      //first set error
      const { initalState } = fromReducer;
      const stateBefore = fromReducer.transactionReducer(
        initalState,
        fromActions.GetTransactionFailed()
      );
      expect(stateBefore).toEqual({
        ...initalState,
        error: true,
      });
      //now reset
      const stateAfter = fromReducer.transactionReducer(
        stateBefore,
        fromActions.ResetTransactionError()
      );
      expect(stateAfter).toEqual(initalState);
    });
  });
});
