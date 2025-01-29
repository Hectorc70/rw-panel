/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi, lsToken } from "@/common/constants";
import { handleError } from "@/common/utils/errors.util";
import { IEmploye } from "@/models/employees/employee.model";
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

const getDetail = async (id: string) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}employees/detail/${id}`,
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



const EmployeesService = {
  getAll,
  getDetail,
  create,
  edit,
}

export default EmployeesService
