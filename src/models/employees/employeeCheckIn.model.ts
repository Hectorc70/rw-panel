import { IEmploye } from "./employee.model";

export interface IEmployeCheckIn {
  id: number;
  id_company?: number;
  employe?:IEmploye
}


export class EmployeCheckInModel implements IEmployeCheckIn {
  id: number = 0;
  id_company?: number;
  employe?: IEmploye;
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
