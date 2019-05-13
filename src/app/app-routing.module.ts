import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutCompanyComponent} from './components/about-company/about-company.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {LoginComponent} from './components/login/login.component';
import {IngredientInfoComponent} from './components/ingredient-info/ingredient-info.component';
import {DishesInfoComponent} from './components/dishes-info/dishes-info.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {CategoriesInfoComponent} from './components/categories-info/categories-info.component';
import {EmployeesInfoComponent} from './components/employees-info/employees-info.component';
import {ProviderInfoComponent} from './components/provider-info/provider-info.component';

const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path: 'about', component: AboutCompanyComponent},
  {path: 'menu', component: CategoryListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contacts', component: ContactsComponent},
  {
    path: 'merch',
    children: [
      {path: 'ingredients', component: IngredientInfoComponent},
      {path: 'dishes', component: DishesInfoComponent},
      {path: 'categories', component: CategoriesInfoComponent}]
  },
  {
    path: 'management',
    children: [
      {path: 'employees', component: EmployeesInfoComponent},
      {path: 'providers', component: ProviderInfoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
