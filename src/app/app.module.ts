import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/account-pages/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {AboutCompanyComponent} from './components/static-pages/about-company/about-company.component';
import {CategoryListComponent} from './components/menu/category-list/category-list.component';
import {DishCardComponent} from './components/menu/dish-card/dish-card.component';
import {CategoryTabComponent} from './components/menu/category-tab/category-tab.component';
import {CategoryItemsComponent} from './components/menu/category-items/category-items.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {CategoryService} from './services/category.service';
import {DishesService} from './services/dishes.service';
import {ImageService} from './services/image.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CategoryLabelComponent} from './components/menu/category-label/category-label.component';
import {LoginComponent} from './components/account-pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IngredientInfoComponent} from './components/info-pages/ingredient-info/ingredient-info.component';
import {DishesInfoComponent} from './components/info-pages/dishes-info/dishes-info.component';
import {EditDishComponent} from './components/edit-pages/edit-dish/edit-dish.component';
import {EditIngredientComponent} from './components/edit-pages/edit-ingredient/edit-ingredient.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {ContactsComponent} from './components/static-pages/contacts/contacts.component';
import {CategoriesInfoComponent} from './components/info-pages/categories-info/categories-info.component';
import {EditCategoryComponent} from './components/edit-pages/edit-category/edit-category.component';
import {EmployeesInfoComponent} from './components/info-pages/employees-info/employees-info.component';
import {EditEmployeeComponent} from './components/edit-pages/edit-employee/edit-employee.component';
import {EditDepartmentComponent} from './components/edit-pages/edit-department/edit-department.component';
import {ProviderInfoComponent} from './components/info-pages/provider-info/provider-info.component';
import {EditProviderComponent} from './components/edit-pages/edit-provider/edit-provider.component';
import {EditHistoryItemComponent} from './components/edit-pages/edit-history-item/edit-history-item.component';
import {StatisticComponent} from './components/statistics/statistic/statistic.component';
import {ChartCommonModule, LineChartModule, NgxChartsModule} from '@swimlane/ngx-charts';
import {OrderInfoComponent} from './components/info-pages/order-info/order-info.component';
import {DishesStatisticsComponent} from './components/statistics/dishes-statistics/dishes-statistics.component';
import {ClientsInfoComponent} from './components/info-pages/clients-info/clients-info.component';
import {EditClientComponent} from './components/edit-pages/edit-client/edit-client.component';
import {UpdatePasswordComponent} from './components/account-pages/update-password/update-password.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutCompanyComponent,
    CategoryListComponent,
    DishCardComponent,
    CategoryTabComponent,
    CategoryItemsComponent,
    CategoryLabelComponent,
    LoginComponent,
    IngredientInfoComponent,
    DishesInfoComponent,
    EditDishComponent,
    EditIngredientComponent,
    ContactsComponent,
    CategoriesInfoComponent,
    EditCategoryComponent,
    EmployeesInfoComponent,
    EditEmployeeComponent,
    EditDepartmentComponent,
    ProviderInfoComponent,
    EditProviderComponent,
    EditHistoryItemComponent,
    StatisticComponent,
    OrderInfoComponent,
    DishesStatisticsComponent,
    ClientsInfoComponent,
    EditClientComponent,
    UpdatePasswordComponent
  ],
  entryComponents: [
    EditDishComponent,
    EditIngredientComponent,
    EditCategoryComponent,
    EditEmployeeComponent,
    EditDepartmentComponent,
    EditProviderComponent,
    EditHistoryItemComponent,
    EditClientComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    LineChartModule,
    ChartCommonModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    CategoryService,
    DishesService,
    ImageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
