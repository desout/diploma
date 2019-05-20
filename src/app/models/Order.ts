import {Dish} from './Dish';

export interface Order {
  idOrder: number;
  date: string;
  fullCost: number;
  Clients_idClient: number
  Departments_idDepartment: number;
  status: string;
  dishes?: Dish[];
  departmentName?: string
  dishList: string;
  discountCost: number;
  clientName: string;
}
