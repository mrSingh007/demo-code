import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { CommonModalModule } from "../common/modals/common-modal.module";
import { Transaction } from "../common/models/transaction.model";
import { HomepageComponent } from "./homepage.component";
import * as fromActions from "./state/actions/transaction.actions";
import * as fromSelectors from "./state/selectors/transaction.selectors";
import * as fromReducer from "./state/transaction.reducer";
describe("HomepageComponent", () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let store: MockStore<fromReducer.TransactionsState>;
  let selector: any;

  const initialState = {
    entities: [],
    error: false,
    loading: false,
  } as fromReducer.TransactionsState;

  const testTransaction: Transaction = {
    id: 10,
    amount: 0,
    currency: "EURO",
    type: "lorem",
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalModule, CommonModule, FormsModule],
      declarations: [HomepageComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    selector = store.overrideSelector(
      fromSelectors.getTransactionState,
      initialState
    );

    fixture.detectChanges();
    spyOn(store, "dispatch").and.callThrough();
  });
  
  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call createTransaction function", () => {
    let spy = spyOn(component, "createTransaction").and.stub();
    const el = fixture.nativeElement.querySelector("#createTransactionBtn");
    expect(el).toBeTruthy();
    el.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call createTransaction modal", () => {
    var modalPromise = new Promise<Transaction>((resolve, _reject) =>
      resolve(testTransaction)
    );
    let spy = spyOn((component as any).modalService, "open").and.returnValue({
      result: modalPromise,
    });
    component.createTransaction();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call getTransaction function", () => {
    let spy = spyOn(component, "getTransaction").and.stub();
    component.idToLoad = 1;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("#getTransactionBtn");
    expect(el).toBeTruthy();
    el.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should trigger getTransaction dispatch action", () => {
    component.idToLoad = 112;
    fixture.detectChanges();
    component.getTransaction();
    expect(store.dispatch).toHaveBeenCalledWith(
      fromActions.GetTransaction({ id: 112 })
    );
  });

  it("should get transactions", (done) => {
    selector.setResult({
      ...initialState,
      entities: [testTransaction],
    });

    store.refreshState();

    component.transactions$.subscribe((res) => {
      expect(res).toEqual([testTransaction]);
      done();
    });
  });
});
