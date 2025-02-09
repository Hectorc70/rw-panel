import { ICompany } from "../companie.model";
import { IEmploye } from "./employee.model";

export interface ICheckInHistorial {
  id: number;
  employee?:IEmploye;
  companie?:ICompany;
  date_time_mobile?: string;
  created_date?: string;
}


export class CheckInHistorialModel implements ICheckInHistorial {
  id: number = 0;
  date_time_mobile?: string;
  created_date?: string;
  employee?: IEmploye;
  companie?: ICompany;
  constructor(data: IEmploye) {
    if (data) {
      Object.assign(this, data);
    }
  }

  // toJson(): IEmploye {
  //   const formData:IEmploye = {};
  //   Object.entries(this).forEach(([key, value]) => {
  //     if (value !== undefined &&
  //       key != 'created' && key != 'modified') {
  //       formData[key]= String(value);
  //     }
  //   });
  //   return formData;
  // }
}
