import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NewTransactionModalComponent } from "./new-transaction-modal/new-transaction-modal.component";

@NgModule({
  imports: [NgbModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [NewTransactionModalComponent],
  exports: [NgbModule],
})
export class CommonModalModule {}
