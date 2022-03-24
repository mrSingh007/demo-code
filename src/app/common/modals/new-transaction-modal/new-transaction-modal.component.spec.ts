import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Transaction } from "../../models/transaction.model";
import { NewTransactionModalComponent } from "./new-transaction-modal.component";

const testTransaction: Transaction = {
  id: 100,
  amount: 10,
  currency: "EURO",
  type: "lorem",
  parent_id: null,
};

class MockNgbActiveModal {
  close() {}
}
describe("NewTransactionModalComponent", () => {
  let component: NewTransactionModalComponent;
  let fixture: ComponentFixture<NewTransactionModalComponent>;
  let service: NgbActiveModal;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule, CommonModule, FormsModule, ReactiveFormsModule],
      declarations: [NewTransactionModalComponent],
      providers: [
        {
          provide: NgbActiveModal,
          useClass: MockNgbActiveModal,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransactionModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should close modal on save", () => {
    const spy = spyOn(service, "close").and.callThrough();
    component.transactionForm.setValue({
      id: testTransaction.id,
      amount: testTransaction.amount,
      currency: testTransaction.currency,
      type: testTransaction.type,
      parentId: null,
    });

    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("button[type='submit']");
    expect(el).toBeTruthy();
    el.click();

    expect(spy).toHaveBeenCalledWith(testTransaction);
  });
});
