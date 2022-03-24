import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewTransactionModalComponent } from '../common/modals/new-transaction-modal/new-transaction-modal.component';
import { Transaction } from '../common/models/transaction.model';
import * as fromActions from './state/actions/transaction.actions';
import * as fromSelectors from './state/selectors/transaction.selectors';
import { TransactionsState } from './state/transaction.reducer';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  transactions$: Observable<Transaction[]>;
  idToLoad: number | null = null;

  constructor(
    private modalService: NgbModal,
    private store: Store<TransactionsState>
  ) {
    this.transactions$ = this.store.pipe(select(fromSelectors.getTransactions));
  }

  createTransaction() {
    const modal = this.modalService.open(NewTransactionModalComponent);
    modal.result
      .then((transaction: Transaction) => {
        this.store.dispatch(
          fromActions.CreateTransaction({ data: transaction })
        );
      })
      .catch(() => {});
  }

  getTransaction() {
    if (!this.idToLoad) return;
    this.store.dispatch(fromActions.GetTransaction({ id: this.idToLoad }));
    this.idToLoad = null;
  }

  private resetError() {
    this.store.dispatch(fromActions.ResetTransactionError());
  }
}
