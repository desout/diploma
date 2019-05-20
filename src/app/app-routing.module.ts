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
import {StatisticComponent} from './components/statistic/statistic.component';
import {OrderInfoComponent} from './components/order-info/order-info.component';
import {DishesStatisticsComponent} from './components/dishes-statistics/dishes-statistics.component';
import {ClientsInfoComponent} from './components/clients-info/clients-info.component';
import {AuthGuard} from './guards/auth.guard';
import {RoleGuard} from './guards/role.guard';

const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path: 'about', component: AboutCompanyComponent},
  {path: 'menu', component: CategoryListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contacts', component: ContactsComponent},
  {
    path: 'merch',
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 0},
    children: [
      {path: 'ingredients', component: IngredientInfoComponent},
      {path: 'dishes', component: DishesInfoComponent},
      {path: 'categories', component: CategoriesInfoComponent},
      {path: 'clients', component: ClientsInfoComponent}
    ]
  },
  {
    path: 'management',
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 2},
    children: [
      {path: 'employees', component: EmployeesInfoComponent},
      {path: 'statistic', component: StatisticComponent},
      {path: 'dishes-statistic', component: DishesStatisticsComponent}
    ]
  },
  {
    path: 'accountant',
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 1},
    children: [
      {path: 'providers', component: ProviderInfoComponent},
      {path: 'orders', component: OrderInfoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
