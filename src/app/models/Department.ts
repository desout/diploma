import {Employee} from './Employee';

export interface Department {
  idDepartment: number;
  place: string;
  contacts: string;
  description?: string;
  employees?: Employee[]
}
