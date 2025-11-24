import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {LoginComponent} from "./components/login/login.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {FoodPageComponent} from "./pages/food-page/food-page.component";
import {DayListComponent} from "./components/day-list/day-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'food', component: FoodPageComponent },
  { path: 'meal', component: DayListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
