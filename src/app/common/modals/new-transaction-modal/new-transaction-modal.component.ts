import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-new-transaction-modal',
  templateUrl: './new-transaction-modal.component.html',
})
export class NewTransactionModalComponent {
  transactionForm!: FormGroup;

  constructor(private modalService: NgbActiveModal, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      id: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[0-9]*')]),
      ],
      amount: ['', Validators.required],
      currency: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      ],
      type: ['', Validators.required],
      parentId: [''],
    });
  }

  close() {
    this.modalService.close();
  }

  /**
   * should close the model and send data thorugh modalService
   */
  save() {
    this.transactionForm.markAllAsTouched();
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        id: this.transactionForm.value.id,
        amount: this.transactionForm.value.amount,
        currency: this.transactionForm.value.currency.toUpperCase(),
        type: this.transactionForm.value.type,
        parent_id: this.transactionForm.value.parentId,
      };
      this.modalService.close(transaction);
    }
  }

  isInvalid(feld: string) {
    const formCtrl = this.transactionForm.controls[feld];
    return formCtrl.touched === true && formCtrl.invalid === true;
  }
}
