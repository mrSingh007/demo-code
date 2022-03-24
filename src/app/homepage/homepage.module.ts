import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CommonModalModule } from "../common/modals/common-modal.module";
import { ReducerStateSlice } from "../common/models/reducer.model";
import { HomepageComponent } from "./homepage.component";
import { TransactionEffects } from "./state/effects/transaction.effects";
import { transactionReducer } from "./state/transaction.reducer";

@NgModule({
  imports: [
    CommonModalModule,
    CommonModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature(ReducerStateSlice.transaction, transactionReducer),
    EffectsModule.forFeature([TransactionEffects]),
    RouterModule.forChild([
      {
        path: "",
        component: HomepageComponent,
      },
    ]),
  ],
  declarations: [HomepageComponent],
  providers: [],
})
export class HomepageModule {}
