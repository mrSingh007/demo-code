import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "homepage",
    loadChildren: () =>
      import("./homepage/homepage.module").then((m) => m.HomepageModule),
  },
  {
    path: "**",
    redirectTo: "homepage",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
