export interface IArea {
  id_area: number;
  uuid: string;
  name_area: string;
  company: number;
  path_img_header: string;
  created: string;
  modified: string;
}


export class AreaModel implements IArea {
  id_area: number = 0;
  uuid: string = '';
  name_area: string = '';
  company: number = 0;
  path_img_header: string = '';
  created: string = '';
  modified: string = '';

  constructor(data: IArea) {
    if (data) {
      Object.assign(this, data);
    }
  }

  toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this).forEach(([key, value]) => {
      if (value !== undefined && key != 'uuid' &&
        key != 'created' && key != 'modified') {
        formData.append(key, String(value));
      }
    });
    return formData;
  }
}
