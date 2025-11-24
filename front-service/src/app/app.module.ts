import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from "./components/product/product.component";
import { HttpClientModule } from "@angular/common/http";
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterFoodPipe } from './pipes/filter-food.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { FocusDirective } from './directives/focus.directive';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from "./services/auth.service";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { FoodComponent } from './components/food/food.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DayListComponent } from './components/day-list/day-list.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealFoodListComponent } from './components/meal-food-list/meal-food-list.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    GlobalErrorComponent,
    FilterFoodPipe,
    ModalComponent,
    CreateProductComponent,
    FocusDirective,
    ProductPageComponent,
    AboutPageComponent,
    NavigationComponent,
    LoginComponent,
    MainPageComponent,
    FoodPageComponent,
    FoodComponent,
    DayListComponent,
    MealListComponent,
    MealFoodListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
