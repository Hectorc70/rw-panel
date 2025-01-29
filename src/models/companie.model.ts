export interface ICompany {
  id_c: number; // AutoField equivalent
  rfc?: string | null; // RFC (nullable and optional)
  name_company: string; // Nombre de Empresa
  email?: string; // Correo Electrónico
  street?: string; // Calle (optional)
  number_ext?: string; // Numero Exterior
  number_int?: string; // Numero Interior (optional)
  suburb?: string; // Colonia
  postal_code?: string; // Codigo Postal (optional)
  path_logo: string; // URL del logo
  uuid: string; // UUID
  fileLogo?: File;
}



export class CompanyModel implements ICompany {
  id_c: number = 0;
  rfc?: string | null;
  name_company: string = '';
  email: string = '';
  street?: string;
  number_ext: string = '';
  number_int?: string;
  suburb: string = '';
  postal_code?: string;
  path_logo: string = '';
  uuid: string = '';
  fileLogo?: File;


  constructor(data: ICompany) {
    if (data) {
      Object.assign(this, data);
    }
  }

  toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this).forEach(([key, value]) => {
      if (value !== undefined && key != 'uuid' && 
        key != 'path_logo'&& key != 'fileLogo') {
        formData.append(key, String(value));
      }
      if (key === 'fileLogo' && value != undefined) {
        formData.append(`fileLogo`, this.fileLogo ?? '');
      }
    });
    return formData;
  }
}
