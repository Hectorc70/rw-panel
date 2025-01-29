export interface IEmploye {
  id: number;
  names?: string;
  last_name?: string;
  second_last_name?: string;
  username: string;
  password: string;
  id_rol: number;
  created_date?: string;
  is_active: boolean;

}


export class EmployeModel implements IEmploye {
  id: number = 0;
  names?: string = '';
  last_name?: string = '';
  second_last_name?: string = '';
  username: string = '';
  password: string = '';
  id_rol: number = 2;
  is_active: boolean = true;
  created_date?: string;



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
