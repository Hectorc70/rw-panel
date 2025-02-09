/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi, lsToken } from "@/common/constants";
import { handleError } from "@/common/utils/errors.util";
import { ICompany } from "@/models/companie.model";
import { ICheckInHistorial } from "@/models/employees/CheckInHistorial.model";
import { IEmploye } from "@/models/employees/employee.model";
import { IEmployeCheckIn } from "@/models/employees/employeeCheckIn.model";
import axios from "axios";


const getAll = async (page: number) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await axios.get(`${baseApi}employees/all?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }

    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const getDetail = async (id: string): Promise<IEmploye> => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}employees/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data as IEmploye
  } catch (e: any) {
    throw handleError(e)
  }
}

const create = async (data: IEmploye) => {
  try {
    const token = localStorage.getItem(lsToken)
    // const data = new CompanyModel(model).toFormData()
    const response = await axios.post(`${baseApi}employees/create/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const edit = async (data: IEmploye,) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.put(`${baseApi}employees/edit/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const getEmployesInCompany = async (idCompany: string): Promise<Map<number, IEmployeCheckIn>> => {
  //empleados activos  en una empresa
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}employees/checkin/by-company/${idCompany}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }

    )
    const data = response.data.data
    const items: Map<number, IEmployeCheckIn> = new Map();
    for (let index = 0; index < data.length; index++) {
      const employe = data[index].id_employee as IEmploye;
      const employeCheckin: IEmployeCheckIn = {
        id: data[index].id,
        id_company: data[index].id_company,
        employe: employe
      }
      items.set(employeCheckin.id, employeCheckin)
    }
    return items
  } catch (e: any) {
    throw handleError(e)
  }
}

const getEmployesAvaliable = async (): Promise<Map<number, IEmploye>> => {
  //empleados disponibles para asignar empresa
  try {
    const token = localStorage.getItem(lsToken)

    const response = await axios.get(`${baseApi}employees/checkin/without-assigning`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }

    )
    const data = response.data.data
    const items: Map<number, IEmploye> = new Map();
    for (let index = 0; index < data.length; index++) {
      const element = data[index] as IEmploye;
      items.set(element.id, element)
    }
    return items
  } catch (e: any) {
    throw handleError(e)
  }
}

const addEmployeInCompanieCheckin = async (id_employee: number, id_company: string): Promise<Map<number, IEmploye>> => {
  //Asigna empleado a empresa para checkin
  try {
    const token = localStorage.getItem(lsToken)

    const response = await axios.post(`${baseApi}employees/checkin/register-in-company/`,
      {
        id_employee, id_company
      },
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }

    )
    const data = response.data.data
    const items: Map<number, IEmploye> = new Map();
    for (let index = 0; index < data.length; index++) {
      const element = data[index] as IEmploye;
      items.set(element.id, element)
    }
    return items
  } catch (e: any) {
    throw handleError(e)
  }
}

const deleteEmployeInCompanieCheckin = async (id: number): Promise<Map<number, IEmploye>> => {
  //elimina empleado a empresa para checkin
  try {
    const token = localStorage.getItem(lsToken)

    const response = await axios.delete(`${baseApi}employees/checkin/delete-in-company/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }

    )
    const data = response.data.data
    const items: Map<number, IEmploye> = new Map();
    for (let index = 0; index < data.length; index++) {
      const element = data[index] as IEmploye;
      items.set(element.id, element)
    }
    return items
  } catch (e: any) {
    throw handleError(e)
  }
}

const getHistorialCheckIn = async ({ idEmployee = 0 }): Promise<ICheckInHistorial[]> => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}employees/checkin/historial/${idEmployee}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    const data = response.data.data;
    const items: ICheckInHistorial[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const employee = element.id_employee as IEmploye;
      const companie = element.companie as ICompany;
      items.push({ id: element.id, companie:companie, employee:employee, created_date: element.created_date, date_time_mobile: element.date_time_mobile })
    }
    return items

  } catch (e: any) {
    throw handleError(e)
  }
}
const EmployeesService = {
  getAll,
  getDetail,
  create,
  edit,
  getEmployesAvaliable,
  getEmployesInCompany,
  addEmployeInCompanieCheckin,
  deleteEmployeInCompanieCheckin,
  getHistorialCheckIn
}

export default EmployeesService
