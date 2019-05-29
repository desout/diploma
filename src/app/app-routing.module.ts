import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutCompanyComponent} from './components/static-pages/about-company/about-company.component';
import {CategoryListComponent} from './components/menu/category-list/category-list.component';
import {LoginComponent} from './components/account-pages/login/login.component';
import {IngredientInfoComponent} from './components/info-pages/ingredient-info/ingredient-info.component';
import {DishesInfoComponent} from './components/info-pages/dishes-info/dishes-info.component';
import {ContactsComponent} from './components/static-pages/contacts/contacts.component';
import {CategoriesInfoComponent} from './components/info-pages/categories-info/categories-info.component';
import {EmployeesInfoComponent} from './components/info-pages/employees-info/employees-info.component';
import {ProviderInfoComponent} from './components/info-pages/provider-info/provider-info.component';
import {StatisticComponent} from './components/statistics/statistic/statistic.component';
import {OrderInfoComponent} from './components/info-pages/order-info/order-info.component';
import {DishesStatisticsComponent} from './components/statistics/dishes-statistics/dishes-statistics.component';
import {ClientsInfoComponent} from './components/info-pages/clients-info/clients-info.component';
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
